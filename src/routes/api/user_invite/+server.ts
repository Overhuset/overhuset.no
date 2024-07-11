import {createPool} from "@vercel/postgres";
import type { UserInvite } from '$lib/types';
import { getNowForDB } from '$lib/utils/dateUtils';
import { v4 as uuidv4 } from 'uuid';


export async function POST({ request }) {
    const userInvite: UserInvite = await request.json();
    const now = getNowForDB();
    const sql =
      `INSERT INTO user_invite (
       id, 
       email,
       company_id,
       created_by,
       created_at
    ) VALUES (
       '${uuidv4()}',
       '${userInvite.email || ""}',
       '${userInvite.companyId || ""}',
       '${userInvite.createdBy || ""}',
       '${now}'
    )`;

    const db = createPool();
    await db.query(sql);

    return new Response(JSON.stringify({ message: "User-invite created" }), { status: 200 });
}

export async function DELETE({ request }) {
    const id = await request.json();
    const uuidLength = 36;

    if (id && id.length === uuidLength) {
        const sql = `DELETE FROM user_invite WHERE id = '${id}'`;
        const db = createPool();
        await db.query(sql);
        return new Response(JSON.stringify({ message: "User-invite deleted" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Delete User-invite failed" }), { status: 400 });
}