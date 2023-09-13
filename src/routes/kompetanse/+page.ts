// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Papa from 'papaparse';

export async function load({ params }) {
	const events = await getEventsFromSheet();
	return {
		data: [
			{
				date: '2022-19-10',
				company: 'Overhuset'
			}
		],
		events
	};
}
async function getEventsFromSheet() {
	const sheet_id =
		'2PACX-1vRHWRCeRufO1C5jOtbqorHJtqFVB2UGGnm6_AXgcVk2LV2Br_loJmnxyS5SLw19VgvqKXnON6BigYX0';
	const response = await fetch(
		`https://docs.google.com/spreadsheets/d/e/${sheet_id}/pub?gid=257492918&single=true&output=csv`
	);
	const csv = await response.text();
	const json = Papa.parse(csv, {
		header: true
	});
	return json.data;
}
