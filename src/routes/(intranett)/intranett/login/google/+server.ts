// routes/login/google/+server.ts
import { dev } from '$app/environment';
import { googleAuth } from '$lib/server/lucia.js';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const [url, state] = await googleAuth.getAuthorizationUrl();
	// store state
	cookies.set('google_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60
	});
	console.log(url);
	console.log(state);
	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
};
