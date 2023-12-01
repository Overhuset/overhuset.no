import { OVERHUSET_SHEET_ID, OVERHUSET_SHEET_TAB_GID } from '$env/static/private';
import { dev } from '$app/environment';
import { getEventsFromSheet } from '$lib/getEventsFromSheet';
import { vercel_url } from '$lib/server/lucia';

export async function load() {
	const events = await getEventsFromSheet(OVERHUSET_SHEET_ID, OVERHUSET_SHEET_TAB_GID);
	return {
		...events,
		vercel_url
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
