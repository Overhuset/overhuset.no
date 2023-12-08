import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { companies } from '$lib/components/companies';

export const load: PageLoad = ({ params }) => {
	if (params.slug in companies) {
		return {
			company: params.slug
		};
	}

	throw error(404, 'Page not found');
};
