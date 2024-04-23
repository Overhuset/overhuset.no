import type { PageServerLoad } from './$types';
import {createPool} from "@vercel/postgres";

const fetchEmail = async (id: string) => {
    const db = createPool();
    const result = await db.query(`SELECT email FROM auth_user WHERE id = '${id}'`);
    const email = result.rows.map(au => au.email);
    return email[0];
}


const fetchAllVacants = async () => {
    const db = createPool();
    const result = await db.query('SELECT * FROM vacant_consultant ORDER by vacant_from ASC');
    return result.rows.map(v => ({
        id: v.id,
        name: v.name,
        email: v.email,
        vacantFrom: v.vacant_from,
        comment: v.comment,
        createdBy: v.created_by,
        createdAt: v.created_by,
        cv: v.cv
    }));
}


const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    const user  = session?.user;
    const email = user?.userId ? await fetchEmail(user?.userId) : undefined;
    const vacantList = await fetchAllVacants();
    return { vacantList, user, email};
};

export { load };

export const prerender = false;