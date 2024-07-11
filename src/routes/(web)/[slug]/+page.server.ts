import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {createPool} from "@vercel/postgres";
import { fetchCompaniesByConstellation, fetchCompanyByName } from '$lib/data-access/company';
import { fetchConstellationByUrlRef } from '$lib/data-access/constellation';
import { fetchEventsByConstellation } from '$lib/data-access/event';
import { overhusetId } from '$lib/utils/uuidUtils';


export const load: PageServerLoad = async ({ fetch, params }) => {
	if (params.slug) {
		const db = createPool();
		const constellation = await fetchConstellationByUrlRef(db, params.slug);
		const company = await fetchCompanyByName(db, params.slug);
		const companiesList = await fetchCompaniesByConstellation(db, constellation);
		const companiesListWithoutOverhuset = companiesList.filter(company => company.id !== overhusetId);
		const eventList = await fetchEventsByConstellation(db, constellation);

		if (constellation || company) {
			return {
				constellation,
				company,
				companiesList,
				companiesListWithoutOverhuset,
				eventList,
			}
		}
	}

	throw error(404, {
		message: 'Vi fant ikke denne siden.'
	});

};
