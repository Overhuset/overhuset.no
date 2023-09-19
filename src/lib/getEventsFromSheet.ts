// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Papa from 'papaparse';

import type { Event } from '$lib/types';
import { isEventInThePast, sortEvent, transformDates } from '$lib/transformEvents';

export async function getEventsFromSheet(sheet: string) {
	const response = await fetch(
		`https://docs.google.com/spreadsheets/d/e/${sheet}/pub?gid=257492918&single=true&output=csv`
	);
	const csv = await response.text();
	const json = Papa.parse(csv, {
		header: true
	});

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

	return {
		pastEvents: [],
		futureEvents: []
	};
}
