// src/routes/blog/[...slug].ts
import type { PageServerLoad } from './$types';
// import intranettItems from '$lib/config/intranettItems';
// import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	// const postIsPublished = blog_meta.find(({ slug }) => slug === params.slug);
	//
	// if (!postIsPublished) {
	// 	throw error(404, {
	// 		message:
	// 			'<p>Blog post not found</p> <a href="/blog" class="anchor text-warning-600-300-token">Click here to go back</a>'
	// 	});
	// }
	const post = await fetch(`/intranett-articles/articles/index.md`);
	const content = await post.text();

	console.log(content);

	return {
		content
	};
};
