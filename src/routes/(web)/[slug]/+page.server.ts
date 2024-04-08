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
		const db = createPool();
		const companyIds = (constellation.companies || "").split(";");
		const companyIdsParam = companyIds.map(companyId => `'${companyId}'`);
		const sql = `SELECT * FROM company WHERE id IN (${companyIdsParam})`;
		const result = await db.query(sql);
		return result.rows.map(c => mapFromDbToCompanyObject(c));
	}
	return [];
}

const fetchEvents = async () => {
	const db = createPool();
	const result = await db.query('SELECT * FROM event ORDER by created_at DESC');
	return result.rows.map(e => mapFromDbToEventObject(e));
}

export const load: PageServerLoad = async ({ fetch, params }) => {

	if (params.slug) {
		const constellation = await fetchConstellation(params.slug);
		const companiesList = await fetchCompanies(constellation);
		const eventList = await fetchEvents();
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
