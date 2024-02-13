import {createPool} from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';
import type {Vacant} from "$lib/types.js";

// @ts-ignore
export async function POST({ request }) {
    const vacant: Vacant = await request.json();
    const {firstName, lastName, email, vacantFrom, comment, createdBy} = vacant;
    const id = uuidv4();
    const sql = `INSERT INTO vacant_consultant (id, first_name, last_name, vacant_from,  email, comment, created_by) VALUES ('${id}', '${firstName}', '${lastName}', '${vacantFrom}', '${email}', '${comment}', '${createdBy}')`;
    const db = createPool();
    await db.query(sql);
    return new Response(JSON.stringify({ message: "Vacant created" }), { status: 200 });
}

// @ts-ignore
export async function DELETE({ request }) {
    const id = await request.json();
    const uuidLength = 36;
    if (id && id.length === uuidLength) {
        const sql = `DELETE FROM vacant_consultant WHERE id = '${id}'`;
        const db = createPool();
        await db.query(sql);
    }
    return new Response(JSON.stringify({ message: "Vacant deleted" }), { status: 200 });
}


/**
 * create table vacant_consultant
 * (
 *     first_name  varchar not null,
 *     last_name   varchar not null,
 *     vacant_from timestamp,
 *     email       varchar not null,
 *     comment     varchar,
 *     created_by  varchar,
 *     id          uuid    not null
 * );
 */