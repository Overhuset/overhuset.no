import {createPool} from "@vercel/postgres";
import type { AuthUser } from '$lib/types.js';
import {getIsValidUuid} from "$lib/utils/uuidUtils";
import {getNowForDB} from "$lib/utils/dateUtils";
import {v4 as uuidv4} from "uuid";

export async function POST({ request }) {
    const authUser: AuthUser = await request.json();
    const now = getNowForDB();
    const sql = `INSERT INTO auth_user (
                   id,
                   name, 
                   email,
                   image,
                   username,
                   admin,
                   createdAt
                ) VALUES (
                                 '${uuidv4()}',
                                 '${authUser.name || ""}',
                                 '${authUser.email || ""}',
                                 '${authUser.image || ""}',
                                 '${authUser.username || ""}',
                                 '${authUser.admin || false}',
                                 '${now}')`;
    const db = createPool();
    await db.query(sql);
    return new Response(JSON.stringify({ message: "User created" }), { status: 200 });
}

export async function PUT({ request }) {
    const authUser: AuthUser = await request.json();
    const isValidUuid = getIsValidUuid(authUser?.id);

    if (isValidUuid) {
        const sql =  `UPDATE auth_user SET 
                 name='${authUser.name}', 
                 email='${authUser.email}',
                 image='${authUser.image}',
                 username='${authUser.username}',
                 admin='${authUser.admin}',
                 companyId='${authUser.companyId || false}'
            WHERE id='${authUser.id}'`;
        const db = createPool();
        await db.query(sql);
        return new Response(JSON.stringify({ message: "user updated" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "user update failed" }), { status: 400 });
}

export async function DELETE({ request }) {
    const id = await request.json();
    const uuidLength = 36;
    if (id && id.length === uuidLength) {
        const sql = `DELETE FROM auth_user WHERE id = '${id}'`;
        const db = createPool();
        await db.query(sql);
        return new Response(JSON.stringify({ message: "User deleted" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Delete user failed" }), { status: 400 });
}


/**
 create table company
 (
 name        varchar not null,
 name_short  varchar not null,
 logo_ref    varchar,
 url         varchar,
 description varchar,
 id          varchar not null,
 created_at  timestamp,
 created_by  varchar
 );
 */