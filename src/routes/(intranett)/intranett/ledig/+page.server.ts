import type { PageServerLoad } from './$types';
import { createPool} from '@vercel/postgres';
import { fetchAuthUser } from '$lib/data-access/authUser';
import { fetchAllVacants } from '$lib/data-access/vacant';


const load: PageServerLoad = async ({ locals }) => {
    const db = createPool();
    const session = await locals.auth.validate();
    const user  = session?.user;
    const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;
    const email = authUser?.email;
    const vacantList = await fetchAllVacants(db);
    return { vacantList, user, email};
};

export { load };

export const prerender = false;