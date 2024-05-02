import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {createPool} from "@vercel/postgres";
import type {Constellation} from "$lib/types";
import {
	mapFromDbToCompanyObject,
	mapFromDbToConstellationObject,
	mapFromDbToEventObject
} from "$lib/utils/objectMapper";


const overhusetId = "3dac0ec1-150a-4d4f-9d12-4d37e2aae2fd";

const fetchConstellation = async (urlRef:string) => {
	const db = createPool();
	const result = await db.query(`SELECT * FROM constellation WHERE active = true AND LOWER(url_ref) = LOWER('${urlRef}')`);
	return result.rows.length > 0 ? mapFromDbToConstellationObject(result.rows[0]) : undefined;
}

const fetchCompany = async (nameShort:string) => {
	const db = createPool();
	const result = await db.query(`SELECT * FROM company WHERE active = true AND LOWER(name_short) = LOWER('${nameShort}')`);
	return result.rows.length > 0 ? mapFromDbToCompanyObject(result.rows[0]) : undefined;
}

const fetchCompanies = async (constellation?: Constellation) => {
	if (constellation) {
		const companyIds = (constellation.companies || "").split(";").concat(overhusetId);;
		const companyIdsParam = companyIds.map(companyId => `'${companyId}'`);
		const db = createPool();
		const sql = `SELECT * FROM company WHERE id IN (${companyIdsParam}) ORDER BY NAME ASC`;
		const result = await db.query(sql);
		return result.rows.map(c => mapFromDbToCompanyObject(c));
	}
	return [];
}

const fetchEvents = async (constellation?: Constellation) => {
	if (constellation) {
 		const companyIds = (constellation.companies || "").split(";").concat(overhusetId);
		const companyIdsParam = companyIds.map(companyId => `'${companyId}'`);
		const db = createPool();
		const sql = `SELECT * FROM event WHERE company_id IN (${companyIdsParam}) AND published = true ORDER BY time DESC`;
		const result = await db.query(sql);
		return result.rows.map(e => mapFromDbToEventObject(e));
	}
	return [];
}

export const load: PageServerLoad = async ({ fetch, params }) => {
	if (params.slug) {
		const constellation = await fetchConstellation(params.slug);
		const company = await fetchCompany(params.slug);
		const companiesList = await fetchCompanies(constellation);
		const companiesListWithoutOverhuset = companiesList.filter(company => company.id !== overhusetId);
		const eventList = await fetchEvents(constellation);

		if (constellation || company) {
			return {
				constellation,
				company,
				companiesList,
				companiesListWithoutOverhuset,
				eventList,
			}
		}
	}

	throw error(404, {
		message: 'Vi fant ikke denne siden.'
	});

};
