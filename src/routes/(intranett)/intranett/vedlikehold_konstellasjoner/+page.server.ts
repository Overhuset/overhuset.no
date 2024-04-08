import type { AuthUser } from "$lib/types";
import {createPool} from "@vercel/postgres";

const fetchAuthUser = async (id: string) => {
	const db = createPool();
	const result = await db.query(`SELECT email, admin FROM auth_user WHERE id = '${id}'`);
	const user: AuthUser[] = result.rows.map(u => ({email: u.email, admin: !!u.admin}));
	return user[0];
}

const fetchAllConstellations = async () => {
	const db = createPool();
	const result = await db.query('SELECT * FROM constellation ORDER BY name ASC');
	return result.rows.map(c => ({
		id: c.id,
		name: c.name,
		description: c.description,
		companies: c.companies,
		active: c.active,
		createdBy: c.created_by,
		createdAt: c.created_at,
		logoRef: c.logo_ref,
		urlRef: c.url_ref,
	}));
}

export async function load({ locals }) {
	const session = await locals.auth.validate();
	const user  = session?.user;
	const authUser = user?.userId ? await fetchAuthUser(user.userId) : undefined;
	const constellationList = await fetchAllConstellations();
	return { constellationList, authUser};
}