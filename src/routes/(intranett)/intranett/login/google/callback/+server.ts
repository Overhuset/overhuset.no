// routes/login/google/callback/+server.ts
import { auth, googleAuth } from '$lib/server/lucia.js';
import {error, type RequestHandler} from '@sveltejs/kit';
import type {GoogleUser} from "@lucia-auth/oauth/dist/providers";
import {createPool} from "@vercel/postgres";
import {
	mapFromDbToEmailDomainObject,
} from "$lib/utils/objectMapper";
import type {User} from "lucia";
import { fetchUserInvitesByEmail } from '$lib/data-access/authUser';

const fetchEmailDomains = async (domain: string) => {
	const db = createPool();
	const result = await db.query(`SELECT * FROM email_domain where domain = '${domain}'`);
	return result.rows.map(c => mapFromDbToEmailDomainObject(c));
}

const fetchUserInvitesByMail = async (email?: string) => {
	const db = createPool();
	return await fetchUserInvitesByEmail(db, email);
}

const verifyEmailAndGetCompany = async (googleUser: GoogleUser) => {
	const emailsignature = googleUser.email?.match("(?<=@)[^.]+(?=\\.).*")[0];
	if (!emailsignature) {
		throw error(400, {message: `Mangler epost. <a style="color: white" href="/intranett">Gå tilbake</a>`});
	}

	const emailDomains = await fetchEmailDomains(emailsignature)
	if(emailDomains.length > 0){
		return emailDomains[0]
	}

	const userInvites = await fetchUserInvitesByMail(googleUser.email)
	if(userInvites.length > 0){
		return userInvites[0]
	}

	throw error(403, {message: `Domenet og/eller epost [${googleUser.email}] er ikke godkjent. <a style="color: white" href="/intranett">Gå tilbake</a>`});
};

const validateAuthCallback = async (code: string) => {
	try {
		return await googleAuth.validateCallback(code);
	} catch (e) {
		throw error(400, {message: `Kunne ikke logge deg inn [${e.message}]. <a style="color: white" href="/intranett">Gå tilbake</a>`});
	}
}

const createSessionAndRedirect = async (user: User, locals: App.Locals) => {
	const session = await auth.createSession({
		userId: user.userId,
		attributes: {}
	});

	locals.auth.setSession(session);
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/intranett'
		}
	});
}

export const GET: RequestHandler = async ({ url, cookies, locals }) => {
	const storedState = cookies.get('google_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	if (!storedState || !state || storedState !== state || !code) {
		throw error(400, {message: `Feil tilstand. <a style="color: white" href="/intranett">Gå tilbake</a>`});
	}

	const { getExistingUser, googleUser, createUser } = await validateAuthCallback(code);

	const existingUser = await getExistingUser();
	if (existingUser) return await createSessionAndRedirect(existingUser, locals);

	const company = await verifyEmailAndGetCompany(googleUser)

	try {
		const user = await createUser({
			attributes: {
				username: googleUser.name,
				email: googleUser.email,
				companyId: company.companyId,
			}
		});
		return await createSessionAndRedirect(user, locals)
	} catch (e) {
		throw error(500, {message: `Kunne ikke opprette bruker [${e.message}. <a style="color: white" href="/intranett">Gå tilbake</a>`});
	}
};
