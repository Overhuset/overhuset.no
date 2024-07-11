import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {createPool} from "@vercel/postgres";
import { fetchCompanyByName } from '$lib/data-access/company';

export const load: PageServerLoad = async ({ fetch, params }) => {

	if (params.slug) {
		const db = createPool();
		const company = await fetchCompanyByName(db, params.slug);

		if (company) {
			return { company }
		}
	}

	throw error(404, {
		message: 'Vi fant ikke denne siden.'
	});
};
