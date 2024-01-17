// routes/login/microsoft/+server.ts
import { dev } from '$app/environment';
import { azureADAuth } from '$lib/server/lucia.js';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const [url, codeVerifier, state] = await azureADAuth.getAuthorizationUrl();
	// store state
	cookies.set('microsoft_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60
	});
	cookies.set('microsoft_oauth_codeVerifier', codeVerifier, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60
	});
	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
};
