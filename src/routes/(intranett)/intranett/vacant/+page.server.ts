import type { PageServerLoad } from './$types';
import {createPool} from "@vercel/postgres";


const fetchAuthUser = async (id: string) => {
    const db = createPool();
    const result = await db.query(`SELECT * FROM auth_user WHERE id = '${id}'`);
    const parsed = result.rows.map(au => ({
        id: au.id,
        email:au.email,
        username: au.username
    }));
    return parsed[0];
}

const fetchAllVacant = async () => {
    const db = createPool();
    const result = await db.query('SELECT * FROM vacant_consultant');
    return result.rows.map(v => ({
        id: v.id,
        firstName: v.first_name,
        lastName: v.last_name,
        email: v.email,
        vacantFrom: v.vacant_from,
        comment: v.comment,
        createdBy: v.created_by
    }));
}

const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    const user  = session?.user;
    const userId = user?.userId;
    const authUser = userId ? await fetchAuthUser(userId) : undefined;
    const vacantList = await fetchAllVacant();
    return { vacantList, user, authUser};
};

export { load };
