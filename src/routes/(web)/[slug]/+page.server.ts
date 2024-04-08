import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {createPool} from "@vercel/postgres";
import type {Constellation} from "$lib/types";
import {
	mapFromDbToCompanyObject,
	mapFromDbToConstellationObject,
	mapFromDbToEventObject
} from "$lib/utils/objectMapper";


const fetchConstellation = async (urlRef:string) => {
	const db = createPool();
	const result = await db.query(`SELECT * FROM constellation WHERE active = true AND url_ref = '${urlRef}'`);
	return result.rows.length > 0 ? mapFromDbToConstellationObject(result.rows[0]) : undefined;
}

const fetchCompanies = async (constellation?: Constellation) => {
	if (constellation) {
		const companyIds = (constellation.companies || "").split(";");
		const companyIdsParam = companyIds.map(companyId => `'${companyId}'`);
		const db = createPool();
		const sql = `SELECT * FROM company WHERE id IN (${companyIdsParam})`;
		const result = await db.query(sql);
		return result.rows.map(c => mapFromDbToCompanyObject(c));
	}
	return [];
}

const fetchEvents = async (constellation?: Constellation) => {
	if (constellation) {
		const companyIds = (constellation.companies || "").split(";");
		const companyIdsParam = companyIds.map(companyId => `'${companyId}'`);
		const db = createPool();
		const sql = `SELECT * FROM event WHERE company_id IN (${companyIdsParam}) ORDER by created_at DESC`;
		console.log("sql: ", sql );
		const result = await db.query(sql);
		return result.rows.map(e => mapFromDbToEventObject(e));
	}
	return [];
}

export const load: PageServerLoad = async ({ fetch, params }) => {

	if (params.slug) {
		const constellation = await fetchConstellation(params.slug);
		const companiesList = await fetchCompanies(constellation);
		const eventList = await fetchEvents(constellation);
		if (constellation) {
			return {
				constellation,
				companiesList,
				eventList,
			}
		}
	}

	throw error(404, {
		message: 'Vi fant ikke denne siden.'
	});

};
