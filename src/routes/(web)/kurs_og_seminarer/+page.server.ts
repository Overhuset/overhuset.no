import {createPool} from "@vercel/postgres";
import {mapFromDbToEventObject} from "$lib/utils/objectMapper";
import type {Company, Event} from "$lib/types";
import { fetchActiveCompanies } from '$lib/data-access/company';

const fetchAllEvents = async () => {
	const db = createPool();
	const result = await db.query('SELECT * FROM event WHERE published = true ORDER by time DESC');
	return result.rows.map(e => mapFromDbToEventObject(e));
}


export async function load() {
	const db = createPool();
	const eventList: Event[] = await fetchAllEvents();
	const companies: Company[]  = await fetchActiveCompanies(db);
	// filter, only partners and Overhuset
	const filteredList = eventList.filter(
		e => companies.find(c => c.id === e.companyId && (c.partner || c.nameShort === "Overhuset")));
	return { eventList:filteredList, companiesList: companies };
}