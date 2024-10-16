import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getLinkItemBySlug } from '$lib/config/intranett/routes';
import { accessCheck } from '$lib/utils/accessController';
import { createPool } from '@vercel/postgres';
import { fetchAuthUser } from '$lib/data-access/user';

export const load: PageServerLoad = async ({ fetch, params, locals }) => {
	const db = createPool();
	const session = await locals.auth.validate();
	const user = session?.user;
	const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;

	// Håndter slug som array eller string
	const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;

	// Sjekk tilgang
	await accessCheck(db, authUser, `/intranett/${slug}`);

	// Hent markdown-fil basert på slug
	const item = getLinkItemBySlug(slug);

	// Håndter tilfelle der elementet ikke finnes
	if (!item) {
		throw error(404, { message: 'Vi fant ikke element for slug: ' + slug });
	}

	console.log('Fetching markdown from:', `/intranett-articles/articles/${item.markdown}`);

	// Hent markdown-innholdet
	const post = await fetch(`/intranett-articles/articles/${item.markdown}`);

	if (post.status === 404) {
		throw error(404, { message: 'Vi fant ikke denne siden.' });
	}

	const content = await post.text();
	return { content };
};
