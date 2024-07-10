import {createPool} from "@vercel/postgres";
import type { AuthUser } from '$lib/types.js';
import { getIsValidAuthUserId } from '$lib/utils/uuidUtils';


export async function PUT({ request }) {
    const authUser: AuthUser = await request.json();
    const isValidUuid = getIsValidAuthUserId(authUser?.id);

    if (isValidUuid) {
        const sql =
          `UPDATE auth_user SET 
            admin='${!!authUser.admin}',
            active='${!!authUser.active}'
          WHERE id='${authUser.id}'`;

        const db = createPool();
        await db.query(sql);
        return new Response(JSON.stringify({ message: "user updated" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "user update failed" }), { status: 400 });
}
