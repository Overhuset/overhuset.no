import { error } from '@sveltejs/kit';
import { getAdminLinkItems, getHeaderLinkItems } from '$lib/config/intranett/routes';
import type { VercelPool } from '@vercel/postgres';
import type { AuthUser } from '$lib/types';
import { fetchCompany } from '$lib/data-access/company';


/**
 * Will check if path is allowed to access by given authUser.
 * Does NOT consider paths in slugItems (routes.ts), but could probably be extended to do this.
 * @param db
 * @param authUser
 * @param path
 */
export const accessCheck = async (db: VercelPool, authUser: AuthUser | undefined, path: string) => {
		const company = authUser ? await fetchCompany(db, authUser?.companyId) : undefined;
		const isPartner = company?.partner || false;
		const isAdmin = authUser?.admin || false;
		const adminLinkItems = getAdminLinkItems(isAdmin, isPartner);
		const headerLinkItems = getHeaderLinkItems(isAdmin, isPartner);
		const foundPath = (adminLinkItems.concat(headerLinkItems)).find(linkItem => linkItem.href === path);

		if (!foundPath) {
			throw error(404, { message: 'Vi fant ikke denne siden.' });
		}
}