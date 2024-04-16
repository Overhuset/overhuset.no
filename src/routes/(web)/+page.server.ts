import {createPool} from "@vercel/postgres";
import {mapFromDbToCompanyObject} from "$lib/utils/objectMapper";

const fetchAllCompanies = async () => {
	const db = createPool();
	const result = await db.query('SELECT * FROM company WHERE partner = true AND active = true ORDER BY name ASC');
	return result.rows.map(c => mapFromDbToCompanyObject(c));
}

export async function load({ locals }) {
 	const companyList = fetchAllCompanies();
	return { companyList};
}