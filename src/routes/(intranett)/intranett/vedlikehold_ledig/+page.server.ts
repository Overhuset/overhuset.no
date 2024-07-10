import type { PageServerLoad } from './$types';
import { createPool } from '@vercel/postgres';
import { error } from "@sveltejs/kit";
import { put } from "@vercel/blob";
import { fetchAuthUser } from '$lib/data-access/user';
import { fetchAllVacants } from '$lib/data-access/vacant';
import { accessCheck } from '$lib/utils/accessController';
import { fetchCompany } from '$lib/data-access/company';


const load: PageServerLoad = async ({ locals }) => {
	const db = createPool();
	const session = await locals.auth.validate();
	const user  = session?.user;
	const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;
	const vacantList = await fetchAllVacants(db);
	const email = authUser?.email;

	await accessCheck(db,  authUser, '/intranett/vedlikehold_ledig');

	return { vacantList, user, email};
};

const actions = {
	// @ts-ignore
	upload: async ({ request }) => {
		const form = await request.formData();
		const file = form.get("cv") as File;

		if (!file) {
			throw error(400, { message: "No file to upload." });
		}

		const { url } = await put(file.name, file, { access: "public" });
		return { uploaded: url };
	},
};


export { load, actions };

export const prerender = false;