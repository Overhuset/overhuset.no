// routes/login/microsoft/callback/+server.ts
import { auth, azureADAuth } from '$lib/server/lucia.js';
import {error, type RequestHandler} from '@sveltejs/kit';
import type {AzureADUser} from "@lucia-auth/oauth/dist/providers";
import {createPool} from "@vercel/postgres";
import {
	mapFromDbToEmailDomainObject,
} from "$lib/utils/objectMapper";
import type {User} from "lucia";
import { fetchUserInvitesByEmail } from '$lib/data-access/user';

const fetchEmailDomains = async (domain: string) => {
	const db = createPool();
	const result = await db.query(`SELECT * FROM email_domain where domain = '${domain}'`);
	return result.rows.map(c => mapFromDbToEmailDomainObject(c));
}

const fetchUserInvitesByMail = async (email?: string) => {
	const db = createPool();
	return await fetchUserInvitesByEmail(db, email);
}

const verifyEmailAndGetCompany = async (azureADUser: AzureADUser) => {
	const emailsignature = azureADUser.email?.match("(?<=@)[^.]+(?=\\.).*")[0];
	if (!emailsignature) {
		throw error(400, {message: `Mangler epost. <a style="color: white" href="/intranett">Gå tilbake</a>`});
	}

	const emailDomains = await fetchEmailDomains(emailsignature)
	if(emailDomains.length > 0){
		return emailDomains[0]
	}

	const userInvites = await fetchUserInvitesByMail(azureADUser.email)
	if(userInvites.length > 0){
		return userInvites[0]
	}

	throw error(403, {message: `Domenet og/eller epost [${azureADUser.email}] er ikke godkjent. <a style="color: white" href="/intranett">Gå tilbake</a>`});
};

const validateAuthCallback = async (code: string, storedCodeVerifier: string) => {
	try {
		return await azureADAuth.validateCallback(code, storedCodeVerifier);
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
	const storedState = cookies.get('microsoft_oauth_state');
	const storedCodeVerifier = cookies.get('microsoft_oauth_codeVerifier');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	if (!storedState || !state || storedState !== state || !code) {
		throw error(400, {message: `Feil tilstand. <a style="color: white" href="/intranett">Gå tilbake</a>`});
	}

	const {getExistingUser, azureADUser, azureADTokens, createUser } = await validateAuthCallback(code, storedCodeVerifier);

	const existingUser = await getExistingUser();

	if (existingUser) return await createSessionAndRedirect(existingUser, locals);

	const company = await verifyEmailAndGetCompany(azureADUser)

	try {
		const user = await createUser({
			attributes: {
				username: azureADUser.name,
				email: azureADUser.email,
				companyId: company.companyId,
			}
		});
		return await createSessionAndRedirect(user, locals)
	} catch (e) {
		throw error(500, {message: `Kunne ikke opprette bruker [${e.message}. <a style="color: white" href="/intranett">Gå tilbake</a>`});
	}
};

