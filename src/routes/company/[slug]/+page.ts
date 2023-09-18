import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { companiesAsObject } from '$lib/components/companies';

export const load: PageLoad = ({ params }) => {
	if (params.slug in companiesAsObject) {
		return {
			company: params.slug
		};
	}

	throw error(404, 'Not found');
};
