import { transformDate } from '$lib/transformEvents';
import type { Event } from '$lib/types';
import { describe, expect, it } from 'bun:test';

const dummyEvent: Event = {
	title: 'Dummy',
	description: 'Event',
	location: 'Oslo',
	date: '2023-10-11',
	time: '17:30',
	registrationLink: '',
	presentationLink: '',
	company: 'NoPro',
	type: 'Internt'
};

describe('Transforms date in event correctly', () => {
	it('should return corect with a given date', () => {
		const date = '2023-10-11';
		const time = '17:45';
		const expected = 'Ons. okt 11, 2023 - 17:45';

		expect(
			transformDate({
				...dummyEvent,
				date,
				time
			})
		).toEqual({ ...dummyEvent, date: expected, time });
	});
});
