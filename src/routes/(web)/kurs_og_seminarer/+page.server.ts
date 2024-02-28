import { OVERHUSET_SHEET_ID, OVERHUSET_SHEET_TAB_GID } from '$env/static/private';
import { dev } from '$app/environment';
import { getEventsFromSheet } from '$lib/getEventsFromSheet';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	// Sjekker om URL-en ender med '/'
	if (url.pathname.endsWith('/')) {
		const newLocation = url.pathname.slice(0, -1); // Fjerner skråstrek fra slutten
		return new Response(undefined, {
			status: 301, // Permanent redirect, bruk 302 for en midlertidig redirect hvis det er ønskelig
			headers: {
				'Location': newLocation,
				// Sørg for å inkludere alle nødvendige CORS-headers hvis dette er relevant
			}
		});
	}
};
export async function load() {
	const events = await getEventsFromSheet(OVERHUSET_SHEET_ID, OVERHUSET_SHEET_TAB_GID);
	return {
		...events
	};
}

export const config = dev
	? {}
	: {
			isr: {
				expiration: 60
			}
	  };
//export const prerender = !dev;
