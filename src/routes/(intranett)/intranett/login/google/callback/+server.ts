// routes/login/google/callback/+server.ts
import { overhusetDomains } from '$lib/config/constellations.js';
import { auth, googleAuth } from '$lib/server/lucia.js';
import { OAuthRequestError } from '@lucia-auth/oauth';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies, locals }) => {
	const storedState = cookies.get('google_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		return new Response('Kunne ikke logge inn, feil tilstand', {
			status: 403
		});
	}
	try {
		const { getExistingUser, googleUser, createUser } = await googleAuth.validateCallback(code);

		const emailsignature = googleUser.email?.match("(?<=@)[^.]+(?=\\.).*")[0];
		if (!emailsignature) {
			return new Response('Kunne ikke logge inn, epost mangler', {
				status: 403
			});
		}

		if (!overhusetDomains.includes(emailsignature)) {
			return new Response(`Kunne ikke logge inn, domenet [${emailsignature}] er ikke godkjent`, {
				status: 403
			});
		}

		const getUser = async () => {
			const existingUser = await getExistingUser();

			if (existingUser) return existingUser;
			const user = await createUser({
				attributes: {
					username: googleUser.name,
					email: googleUser.email
				}
			});
			return user;
		};

		const user = await getUser();
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
	} catch (e) {
		return new Response(`Kunne ikke logge deg inn [${e.message}]`, {
			status: 500
		});
	}
};
