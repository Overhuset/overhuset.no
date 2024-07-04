import type { LayoutServerLoad } from './$types';
import { createPool } from '@vercel/postgres';
import { fetchAuthUser } from '$lib/data-access/user';
import { fetchCompany } from '$lib/data-access/company';


export const load: LayoutServerLoad = async ({ locals }) => {
	const db = createPool();
	const session = await locals.auth.validate();
	const authUser = await fetchAuthUser(db, session?.user?.userId);
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
