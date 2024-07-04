// src/routes/blog/[...slug].ts
import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { fetchAuthUser } from '$lib/data-access/authUser';
import { createPool } from '@vercel/postgres';
import { fetchCompany } from '$lib/data-access/company';
import { fetchActiveConstellationsByCompany } from '$lib/data-access/constellation';

export const load: PageServerLoad = async ({ fetch,locals }) => {
	const db = createPool();
	const session = await locals.auth.validate();
	const post = await fetch(`/intranett-articles/articles/index.md`);
	const user  = session?.user;
	const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;
	const company = await fetchCompany(db, authUser?.companyId);
 	const content = await post.text();
	const constellationList = await fetchActiveConstellationsByCompany(db, company?.id);
  	console.log("partner: ", company?.partner);

	if (!company?.partner) {
		console.log("redirect");
		//throw redirect(302, '/intranett');
	}

	return {
		company,
		constellationList,
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
