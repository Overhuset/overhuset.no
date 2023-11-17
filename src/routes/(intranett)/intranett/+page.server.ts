// src/routes/blog/[...slug].ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const post = await fetch(`/intranett-articles/articles/index.md`);
	const content = await post.text();

	return {
		content
	};
};
