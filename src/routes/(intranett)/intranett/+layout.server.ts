import type { LayoutServerLoad } from './$types';
import { createPool } from '@vercel/postgres';
import { fetchAuthUser } from '$lib/data-access/user';
import { fetchCompany } from '$lib/data-access/company';
import { getAdminLinkItems, getHeaderLinkItems, getSlugTreeItems } from '$lib/config/intranett/routes';


export const load: LayoutServerLoad = async ({ locals }) => {
	const db = createPool();
	const session = await locals.auth.validate();
	const authUser = await fetchAuthUser(db, session?.user?.userId);
	const company = await fetchCompany(db, authUser?.companyId);
	const slugTreeItems =  getSlugTreeItems(authUser, company);
	const headerLinkItems = getHeaderLinkItems(authUser, company);
	const adminLinkItems = getAdminLinkItems(authUser, company);

	return {
		loggedIn: !!session?.sessionId,
		admin: authUser?.admin,
		partner: company?.partner,
		companyName: company?.name,
		userName: authUser?.username,
		slugTreeItems: slugTreeItems,
		headerLinkItems: headerLinkItems,
		adminLinkItems: adminLinkItems
	};

};

export const prerender = false;
