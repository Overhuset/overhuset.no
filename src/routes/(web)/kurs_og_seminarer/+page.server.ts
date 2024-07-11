import {createPool} from "@vercel/postgres";
import type {Company, Event} from "$lib/types";
import { fetchActiveCompanies } from '$lib/data-access/company';
import { fetchAllPublishedEvents } from '$lib/data-access/event';

export async function load() {
	const db = createPool();
	const eventList: Event[] = await fetchAllPublishedEvents(db);
	const companies: Company[]  = await fetchActiveCompanies(db);

	// filter, only partners and Overhuset
	const filteredList = eventList.filter(
		e => companies.find(c => c.id === e.companyId && (c.partner || c.nameShort === "Overhuset")));
	return { eventList:filteredList, companiesList: companies };
}