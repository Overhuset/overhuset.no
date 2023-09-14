import type { Event } from '$lib/types';
export const transformDate = ({ date, ...restOfEvent }: Event): Event => {
	const newDate = date;

	return {
		date: newDate,
		...restOfEvent
	};
};
