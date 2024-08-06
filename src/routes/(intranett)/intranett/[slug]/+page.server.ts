import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getLinkItemBySlug }  from '$lib/config/intranett/routes';


export const load: PageServerLoad = async ({ fetch, params }) => {
	const item = getLinkItemBySlug(params.slug);
	const post = await fetch(`/intranett-articles/articles/${item?.markdown}`);

	if (post.status === 404) {
		throw error(404, {
			message: 'Vi fant ikke denne siden.'
		});
	}

	const content = await post.text();
	return { content };
};
