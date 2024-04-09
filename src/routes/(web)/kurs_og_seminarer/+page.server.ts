import {createPool} from "@vercel/postgres";
import {mapFromDbToCompanyObject, mapFromDbToEventObject} from "$lib/utils/objectMapper";
import type {Company, Event} from "$lib/types";

const fetchAllEvents = async () => {
	const db = createPool();
	const result = await db.query('SELECT * FROM event WHERE published = true ORDER by time DESC');
	return result.rows.map(e => mapFromDbToEventObject(e));
}

const fetchActiveCompanies = async () => {
	const db = createPool();
	const result = await db.query('SELECT * FROM company WHERE active = true');
	return result.rows.map(c => mapFromDbToCompanyObject(c));
}


export async function load() {
	const eventList: Event[] = await fetchAllEvents();
	const companies: Company[]  = await fetchActiveCompanies();
	// filter, only partners and Overhuset
	const filteredList = eventList.filter(
		e => companies.find(c => c.id === e.companyId && (c.partner || c.nameShort === "Overhuset")));
	return { eventList:filteredList, companies };
}