import type { AuthUser } from "$lib/types";
import {createPool} from "@vercel/postgres";
import {mapFromDbToCompanyObject} from "$lib/utils/objectMapper";

const fetchAuthUser = async (id: string) => {
	const db = createPool();
	const result = await db.query(`SELECT email, admin FROM auth_user WHERE id = '${id}'`);
	const user: AuthUser[] = result.rows.map(u => ({email: u.email, admin: !!u.admin}));
	return user[0];
}

const fetchAllCompanies = async () => {
	const db = createPool();
	const result = await db.query('SELECT * FROM company ORDER BY name ASC');
	return result.rows.map(c => mapFromDbToCompanyObject(c));
}

export async function load({ locals }) {
	const session = await locals.auth.validate();
	const user  = session?.user;
	const authUser = user?.userId ? await fetchAuthUser(user.userId) : undefined;
	const companyList = fetchAllCompanies();
	return { companyList, authUser};
}