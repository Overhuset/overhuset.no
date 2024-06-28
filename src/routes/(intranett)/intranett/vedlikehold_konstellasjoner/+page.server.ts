import { createPool } from '@vercel/postgres';
 import type {PageServerLoad} from "../../../../../.svelte-kit/types/src/routes/(intranett)/intranett/ledig/$types";
import { fetchAuthUser } from '$lib/data-access/authUser';
import { fetchAllCompaniesExceptOverhuset } from '$lib/data-access/company';
import { fetchAllConstellations } from '$lib/data-access/constellation';


const load: PageServerLoad = async ({ locals }) => {
	const db = createPool();
	const session = await locals.auth.validate();
	const user  = session?.user;
	const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;
	const constellationList = await fetchAllConstellations(db);
	const companyList = fetchAllCompaniesExceptOverhuset(db);
	return { constellationList, companyList, authUser };
}

export { load };

export const prerender = false;