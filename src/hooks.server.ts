import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (
		event.url.pathname.startsWith('/intranett') &&
		!event.url.pathname.startsWith('/intranett/login')
	) {
		event.locals.auth = auth.handleRequest(event);
		const session = await event.locals.auth.validate();
		if (session) return await resolve(event);
		return new Response('Redirect', { status: 303, headers: { Location: '/intranett/login' } });
	}
	return await resolve(event);
};
