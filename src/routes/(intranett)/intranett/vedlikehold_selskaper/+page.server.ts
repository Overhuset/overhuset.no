import {createPool} from "@vercel/postgres";
import { fetchAuthUser } from '$lib/data-access/user';
import { fetchAllCompanies } from '$lib/data-access/company';


export async function load({ locals }) {
	const db = createPool();
	const session = await locals.auth.validate();
	const user  = session?.user;
	const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;
	const companyList = fetchAllCompanies(db);
	return { companyList, authUser};
}