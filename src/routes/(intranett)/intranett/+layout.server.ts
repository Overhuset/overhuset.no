import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	const isLoggedIn = !!session?.sessionId;
	return {
		isLoggedIn
	};
};

export const prerender = false;
