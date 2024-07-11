import { createPool } from '@vercel/postgres';
import { fetchAllCompanies, fetchCompany } from '$lib/data-access/company';
import { fetchAuthUser } from '$lib/data-access/user';
import { fetchAllEvents, fetchAllEventsOnCompany } from '$lib/data-access/event';
import { accessCheck } from '$lib/utils/accessController';


export async function load({ locals }) {
	const db = createPool();
	const session = await locals.auth.validate();
	const user  = session?.user;
 	const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;
	const company = await fetchCompany(db, authUser?.companyId);
	const eventList = authUser?.admin ? await fetchAllEvents(db) : await fetchAllEventsOnCompany(db, authUser?.companyId);
	const companyList = await fetchAllCompanies(db);

	await accessCheck(db,  authUser, '/intranett/vedlikehold_kurs_og_seminarer');

	return { eventList, companyList, authUser, company};
}