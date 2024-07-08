import type { LayoutServerLoad } from './$types';
import { createPool } from '@vercel/postgres';
import { fetchAuthUser } from '$lib/data-access/user';
import { fetchCompany } from '$lib/data-access/company';
import { dev } from '$app/environment';
import { getAdminLinkItems, getHeaderLinkItems, getSlugTreeItems } from './config/routes';


export const load: LayoutServerLoad = async ({ locals }) => {
	const db = createPool();
	const session = await locals.auth.validate();
	const authUser = await fetchAuthUser(db, session?.user?.userId);
	const company = await fetchCompany(db, authUser?.companyId);
  const isPartner = company?.partner || false;
	const isAdmin = authUser?.admin || false;
	const isProd = !dev;

	const slugTreeItems =  getSlugTreeItems(isProd, isAdmin, isPartner);
	const headerLinkItems = getHeaderLinkItems(isAdmin, isPartner);
	const adminLinkItems = getAdminLinkItems(isAdmin, isPartner);

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
