import {createPool} from "@vercel/postgres";
import type {Constellation} from "$lib/types.js";
import {getIsValidUuid} from "$lib/utils/uuidUtils";
import {getNowForDB} from "$lib/utils/dateUtils";
import {v4 as uuidv4} from "uuid";

export async function POST({ request }) {
    const constellation: Constellation = await request.json();
    const now = getNowForDB();
    const sql = `INSERT INTO constellation (
                   id,
                   name,
                   description,
                   description2,
                   companies,
                   active,
                   logo_ref,
                   url_ref,
                   created_by,
                   created_at
                ) VALUES (
                  '${uuidv4()}', 
                  '${constellation.name || ""}', 
                  '${constellation.description || ""}',
                  '${constellation.description2 || ""}',
                  '${constellation.companies || ""}',
                  '${constellation.active || false}',
                  '${constellation.logoRef || ""}',
                  '${constellation.urlRef || ""}',
                  '${constellation.createdBy || ""}',
                  '${now}')`;
    const db = createPool();
    await db.query(sql);
    return new Response(JSON.stringify({ message: "constellation created" }), { status: 200 });
}

export async function PUT({ request }) {
    const constellation: Constellation = await request.json();
    const isValidUuid = getIsValidUuid(constellation?.id);

    if (isValidUuid) {
        const sql =  `UPDATE constellation SET 
                 name='${constellation.name}',
                 description='${constellation.description}',
                 description2='${constellation.description2}',
                 companies='${constellation.companies}',
                 active='${constellation.active}',
                 logo_ref='${constellation.logoRef}',
                 url_ref='${constellation.urlRef}'
            WHERE id='${constellation.id}'`;
        const db = createPool();
        await db.query(sql);
        return new Response(JSON.stringify({ message: "constellation updated" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "constellation update failed" }), { status: 400 });
}

export async function DELETE({ request }) {
    const id = await request.json();
    const uuidLength = 36;
    if (id && id.length === uuidLength) {
        const sql = `DELETE FROM constellation WHERE id = '${id}'`;
        const db = createPool();
        await db.query(sql);
        return new Response(JSON.stringify({ message: "Constellation deleted" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Delete constellation failed" }), { status: 400 });
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