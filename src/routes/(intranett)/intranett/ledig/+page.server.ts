import type { PageServerLoad } from './$types';
import {createPool} from "@vercel/postgres";
import { error } from "@sveltejs/kit";
import { put } from "@vercel/blob";
import {fetchAllVacants} from "../../../api/vacant/+server";

const fetchEmail = async (id: string) => {
    const db = createPool();
    const result = await db.query(`SELECT email FROM auth_user WHERE id = '${id}'`);
    const email = result.rows.map(au => au.email);
    return email[0];
}

const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    const user  = session?.user;
    const email = user?.userId ? await fetchEmail(user?.userId) : undefined;
    const vacantList = await fetchAllVacants();
    return { vacantList, user, email};
};

const actions = {
    // @ts-ignore
    upload: async ({ request }) => {
        const form = await request.formData();
        const file = form.get("cv") as File;

        if (!file) {
            throw error(400, { message: "No file to upload." });
        }

        const { url } = await put(file.name, file, { access: "public" });
        return { uploaded: url };
    },
};


export { load, actions };

export const prerender = false;