import { transformDate } from '$lib/transformEvents';
import type { Event } from '$lib/types';
import { describe, expect, it } from 'bun:test';

const dummyEvent: Event = {
	title: 'Dummy',
	description: 'Event',
	location: 'Oslo',
	date: '2023-10-11T17:30:00',
	registrationLink: '',
	presentationLink: '',
	company: 'NoPro'
};

describe('Transforms date in event correctly', () => {
	it('should return corect with a given date', () => {
		const input = '2023-10-11T17:30:00';
		const expected = 'Tir, okt 11 2023 - 17:30';

		expect(
			transformDate({
				...dummyEvent,
				date: input
			})
		).toEqual({ ...dummyEvent, date: expected });
	});
});
