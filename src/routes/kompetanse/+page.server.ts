// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Papa from 'papaparse';

import { SHEET_ID } from '$env/static/private';
import { dev } from '$app/environment';

export async function load({ params }) {
	const events = await getEventsFromSheet();
	return {
		events
	};
}

async function getEventsFromSheet() {
	const response = await fetch(
		`https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?gid=257492918&single=true&output=csv`
	);
	const csv = await response.text();
	const events = Papa.parse(csv, {
		header: true
	});

	console.log({ dev });
	return events.data;
}

export const config = dev
	? {}
	: {
			isr: {
				expiration: 60
			}
	  };
export const prerender = !dev;
