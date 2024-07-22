// src/routes/blog/[...slug].ts
import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { fetchAuthUser } from '$lib/data-access/user';
import { createPool } from '@vercel/postgres';
import { fetchAllCompaniesExceptOverhuset, fetchCompany } from '$lib/data-access/company';
import { fetchActiveConstellationsByCompany } from '$lib/data-access/constellation';
import { accessCheck } from '$lib/utils/accessController';

export const load: PageServerLoad = async ({ fetch,locals }) => {
	const db = createPool();
	const session = await locals.auth.validate();
	const post = await fetch(`/intranett-articles/articles/index.md`);
	const user  = session?.user;
	const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;
	const company = await fetchCompany(db, authUser?.companyId);
 	const content = await post.text();
	const constellations = await fetchActiveConstellationsByCompany(db, company?.id);
	const companies =  await fetchAllCompaniesExceptOverhuset(db);

	await accessCheck(db,  authUser);

	return {
		company,
		companies,
		constellations,
		content
	};
};



export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);

		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
		throw redirect(302, '/');
	}
};
