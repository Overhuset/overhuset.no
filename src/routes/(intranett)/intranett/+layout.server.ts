import type { LayoutServerLoad } from './$types';
import { createPool, VercelPool } from '@vercel/postgres';
import { mapFromDbToAuthUserObject, mapFromDbToCompanyObject } from '$lib/utils/objectMapper';

const fetchUser = async (db: VercelPool, userId?: string)=> {
	if (userId) {
		const result = await db.query(`SELECT * FROM auth_user WHERE id = '${userId}'`);
		return result.rows.length > 0 ? mapFromDbToAuthUserObject(result.rows[0]) : undefined;
	}
	return undefined;
}

const fetchCompany = async (db: VercelPool, companyId?: string) => {
	if (companyId) {
		const result = await db.query(`SELECT * FROM company WHERE id = '${companyId}'`);
		return result.rows.length > 0 ?  mapFromDbToCompanyObject(result.rows[0]) : undefined;
	}
	return undefined;
}

export const load: LayoutServerLoad = async ({ locals }) => {
	const db = createPool();
	const session = await locals.auth.validate();
	const authUser = await fetchUser(db, session?.user?.userId);
	const company = await fetchCompany(db, authUser?.companyId);

	return {
		loggedIn: !!session?.sessionId,
		admin: authUser?.admin,
		partner: company?.partner,
		companyName: company?.name,
		userName: authUser?.username,
	};

};

export const prerender = false;
