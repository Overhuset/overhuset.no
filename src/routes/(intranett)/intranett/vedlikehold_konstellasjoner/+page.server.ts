import type { AuthUser } from "$lib/types";
import {createPool} from "@vercel/postgres";
import {mapFromDbToCompanyObject, mapFromDbToConstellationObject} from "$lib/utils/objectMapper";
import type {PageServerLoad} from "../../../../../.svelte-kit/types/src/routes/(intranett)/intranett/ledig/$types";

const fetchAuthUser = async (id: string) => {
	const db = createPool();
	const result = await db.query(`SELECT email, admin FROM auth_user WHERE id = '${id}'`);
	const user: AuthUser[] = result.rows.map(u => ({email: u.email, admin: !!u.admin}));
	return user[0];
}

const fetchAllConstellations = async () => {
	const db = createPool();
	const result = await db.query('SELECT * FROM constellation ORDER BY name ASC');
	return result.rows.map(c => mapFromDbToConstellationObject(c));
}

const fetchAllCompanies = async () => {
	const db = createPool();
	const result = await db.query("SELECT * FROM company WHERE name_short != 'Overhuset' ORDER BY created_at ASC");
	return result.rows.map(c => mapFromDbToCompanyObject(c));
}


const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	const user  = session?.user;
	const authUser = user?.userId ? await fetchAuthUser(user.userId) : undefined;
	const constellationList = await fetchAllConstellations();
	const companyList = fetchAllCompanies();
	return { constellationList, companyList, authUser };
}

export { load };

export const prerender = false;