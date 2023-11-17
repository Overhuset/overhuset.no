import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getLinkItemBySlug } from '$lib/config/intranettNavigation';
const { MODE } = import.meta.env;

const isProd = MODE === 'production';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const item = getLinkItemBySlug(params.slug, isProd);

	console.log(item, params.slug);

	if (!item || (isProd && item.status !== 'published')) {
		throw error(404, {
			message: 'Denne siden er ikke publisert.'
		});
	}

	const post = await fetch(`/intranett-articles/articles/${item.markdown}`);

	if (post.status === 404) {
		throw error(404, {
			message: 'Vi fant ikke denne artikkelen.'
		});
	}
	const content = await post.text();

	return {
		content
	};
};
