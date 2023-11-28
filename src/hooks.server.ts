import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	console.log('event', event);
	if (
		event.url.pathname.startsWith('/intranett') &&
		!event.url.pathname.startsWith('/intranett/login')
	) {
		event.locals.auth = auth.handleRequest(event);
		const session = await event.locals.auth.validate();
		console.log(session);
		if (session) return await resolve(event);
		return new Response('Redirect', { status: 303, headers: { Location: '/intranett/login' } });
	}
	return await resolve(event);
};
