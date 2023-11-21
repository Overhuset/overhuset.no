import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth?.validate();
	const isLoggedIn = typeof session === 'object';
	return {
		isLoggedIn
	};
};

export const prerender = false;
