import { SHEET_ID } from '$env/static/private';
import { dev } from '$app/environment';
import { getEventsFromSheet } from '$lib/getEventsFromSheet';

export async function load() {
	const events = await getEventsFromSheet(SHEET_ID, 'posten');
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
