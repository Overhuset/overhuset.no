import { createPool } from '@vercel/postgres';
import { fetchAllCompanies } from '$lib/data-access/company';
import { fetchAuthUser } from '$lib/data-access/authUser';
import { fetchAllEvents } from '$lib/data-access/event';


export async function load({ locals }) {
	const db = createPool();
	const session = await locals.auth.validate();
	const user  = session?.user;
 	const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;
 	const eventList = await fetchAllEvents(db);
	const companyList = fetchAllCompanies(db);
	return { eventList, companyList, authUser};
}