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
export const accessCheck = async (db: VercelPool, authUser: AuthUser | undefined, path?: string) => {
	  if (!authUser) {
			throw error(403, { message: 'Du har ikke tilgang til denne siden.' });
	  }

		if (path) {
			const company = authUser ? await fetchCompany(db, authUser?.companyId) : undefined;
			const adminLinkItems = getAdminLinkItems(authUser, company);
			const headerLinkItems = getHeaderLinkItems(authUser, company);
			const foundPath = (adminLinkItems.concat(headerLinkItems)).find(linkItem => linkItem.href === path);

			if (!foundPath) {
				throw error(404, { message: 'Denne siden finnes ikke.' });
			}
		}

}