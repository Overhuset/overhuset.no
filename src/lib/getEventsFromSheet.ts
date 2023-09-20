// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Papa from 'papaparse';

import type { Event } from '$lib/types';
import { isEventInThePast, sortEvent, transformDates } from '$lib/transformEvents';

export async function getEventsFromSheet(sheetId: string, sheetGid: string) {
	const response = await fetch(
		`https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?single=true&output=csv&gid=${sheetGid}`
	);
	const csv = await response.text();
	const json = Papa.parse(csv, {
		header: true
	});

	try {
		if (json?.data) {
			const events = json?.data as Event[];
			const pastEvents = events
				.filter((event: Event) => isEventInThePast(event.date, event.time))
				.sort((a, b) => sortEvent(a, b, true));
			const futureEvents = events
				.filter((event: Event) => !isEventInThePast(event.date, event.time))
				.sort(sortEvent);

			const pastEventsWithTransformedDates = transformDates(pastEvents);
			const futureEventsWithTransformedDates = transformDates(futureEvents);

			return {
				pastEvents: pastEventsWithTransformedDates,
				futureEvents: futureEventsWithTransformedDates
			};
		}
	} catch (e) {
		console.error(e);
	}

	return {
		pastEvents: [],
		futureEvents: []
	};
}
