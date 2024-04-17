import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {createPool} from "@vercel/postgres";
import {mapFromDbToCompanyObject} from "$lib/utils/objectMapper";



const fetchCompany = async (nameShort:string) => {
	const db = createPool();
	const result = await db.query(`SELECT * FROM company WHERE active = true AND LOWER(name_short) = LOWER('${nameShort}')`);
	return result.rows.length > 0 ? mapFromDbToCompanyObject(result.rows[0]) : undefined;
}
export const load: PageServerLoad = async ({ fetch, params }) => {

	if (params.slug) {
		const company = await fetchCompany(params.slug);

		if (company) {
			return {
				company,
			}
		}
	}

	throw error(404, {
		message: 'Vi fant ikke denne siden.'
	});

};
