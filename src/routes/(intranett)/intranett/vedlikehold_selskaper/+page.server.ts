import {createPool} from "@vercel/postgres";
import { fetchAuthUser } from '$lib/data-access/user';
import { fetchAllCompanies } from '$lib/data-access/company';
import { accessCheck } from '$lib/utils/accessController';


export async function load({ locals }) {
	const db = createPool();
	const session = await locals.auth.validate();
	const user  = session?.user;
	const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;
	const companyList = await fetchAllCompanies(db);

	await accessCheck(db,  authUser, '/intranett/vedlikehold_selskaper');

	return { companyList, authUser};
}