import { createPool } from '@vercel/postgres';
import { fetchAllCompanies } from '$lib/data-access/company';
import { fetchAuthUser } from '$lib/data-access/user';
import { fetchAllEvents, fetchAllEventsOnCompany } from '$lib/data-access/event';


export async function load({ locals }) {
	const db = createPool();
	const session = await locals.auth.validate();
	const user  = session?.user;
 	const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;
	const eventList = authUser?.admin ? await fetchAllEvents(db) : await fetchAllEventsOnCompany(db, authUser?.companyId);
	const companyList = await fetchAllCompanies(db);
	return { eventList, companyList, authUser};
}