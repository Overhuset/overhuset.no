import type { Event } from '$lib/types';
import { DateTime } from 'luxon';
export const transformDate = ({ date, time, ...restOfEvent }: Event): Event => {
	let formattedDate = DateTime.fromISO(`${date}T${time}`)
		.setLocale('nb-NO')
		.toFormat('ccc LLL dd, yyyy - HH:mm');

	formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

	return {
		date: formattedDate,
		time,
		...restOfEvent
	};
};

export const transformDates = (events: Event[]) => events.map(transformDate);

export const isEventInThePast = (date: string, time: string) => {
	const eventDate = DateTime.fromISO(`${date}T${time}`);
	const now = DateTime.now();

	return now > eventDate;
};

export const sortEvent = (event1: Event, event2: Event, desc = false) => {
	const event1Date = DateTime.fromISO(`${event1.date}T${event1.time}`);
	const event2Date = DateTime.fromISO(`${event2.date}T${event1.time}`);

	if (event1Date < event2Date) {
		return desc ? 1 : -1;
	} else if (event1Date > event2Date) {
		return desc ? -1 : 1;
	}
	return 0;
};
