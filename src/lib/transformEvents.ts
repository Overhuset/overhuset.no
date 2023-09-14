import type { Event } from '$lib/types';
import { DateTime } from 'luxon';
export const transformDate = ({ date, time, ...restOfEvent }: Event): Event => {
	const locale = 'nb';
	const timeZoneName = Intl.DateTimeFormat(locale, {
		timeZoneName: 'short',
		timeZone: 'Europe/Oslo'
	})
		.formatToParts()
		.find(({ type }) => type === 'timeZoneName')?.value;
	console.log(timeZoneName);
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
