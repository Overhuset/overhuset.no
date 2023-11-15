import { POSTEN_SHEET_ID, POSTEN_SHEET_TAB_GID } from '$env/static/private';
import { dev } from '$app/environment';
import { getEventsFromSheet } from '$lib/getEventsFromSheet';

export async function load() {
	const events = await getEventsFromSheet(POSTEN_SHEET_ID, POSTEN_SHEET_TAB_GID);
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
