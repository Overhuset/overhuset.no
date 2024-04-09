import type { AuthUser } from "$lib/types";
import {createPool} from "@vercel/postgres";
import {mapFromDbToCompanyObject, mapFromDbToEventObject} from "$lib/utils/objectMapper";

const fetchAuthUser = async (id: string) => {
	const db = createPool();
	const result = await db.query(`SELECT email, admin FROM auth_user WHERE id = '${id}'`);
	const user: AuthUser[] = result.rows.map(u => ({email: u.email, admin: !!u.admin}));
	return user[0];
}

const fetchAllEvents = async () => {
	const db = createPool();
	const result = await db.query('SELECT * FROM event ORDER by created_at DESC');
	return result.rows.map(e => mapFromDbToEventObject(e));
}

const fetchAllCompanies = async () => {
	const db = createPool();
	const result = await db.query('SELECT * FROM company ORDER BY created_at ASC');
	return result.rows.map(c => mapFromDbToCompanyObject(c));
}

export async function load({ locals }) {
	const session = await locals.auth.validate();
	const user  = session?.user;
	const authUser = user?.userId ? await fetchAuthUser(user.userId) : undefined;
	const eventList = await fetchAllEvents();
	const companyList = fetchAllCompanies();
	return { eventList, companyList, authUser};
}