import {createPool} from "@vercel/postgres";
import { fetchAllActivePartnerCompanies } from '$lib/data-access/company';


export async function load({ locals }) {
	const db = createPool();
 	const companyList = await fetchAllActivePartnerCompanies(db);
	return { companyList};
}