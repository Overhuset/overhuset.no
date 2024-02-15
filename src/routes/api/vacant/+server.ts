import {createPool} from "@vercel/postgres";
import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';
import type {Vacant} from "$lib/types.js";

const getNow = () => {
        let d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
}


// @ts-ignore
export async function POST({ request }) {
    const vacant: Vacant = await request.json();
    const {firstName, lastName, email, vacantFrom, comment, createdBy, cv} = vacant;
    const now = getNow();
    const sql = `INSERT INTO vacant_consultant (id, first_name, last_name, vacant_from, comment, created_by, created_at,  cv) VALUES ('${uuidv4()}', '${firstName}', '${lastName}', '${vacantFrom}', '${comment}', '${createdBy}', '${now}', '${cv}')`;
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
 *     comment     varchar,
 *     created_by  varchar,
 *     id          uuid    not null,
 *     created_at  timestamp,
 *     cv          varchar
 * );
 */