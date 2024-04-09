import {createPool} from "@vercel/postgres";
import type {Company, Event} from "$lib/types.js";
import {getIsValidUuid} from "$lib/utils/uuidUtils";
import {getNowFroDB} from "$lib/utils/dateUtils";
import {v4 as uuidv4} from "uuid";

export async function POST({ request }) {
    const company: Company = await request.json();
    const now = getNowFroDB();
    const sql = `INSERT INTO company (
                   id,
                   name, 
                   name_short,
                   logo_ref,
                   url,
                   partner,
                   active,
                   description,
                   created_by,
                   created_at
                ) VALUES (
                  '${uuidv4()}', 
                  '${company.name || ""}', 
                  '${company.nameShort || ""}',
                  '${company.logoRef || ""}',
                  '${company.url || ""}',
                  '${company.partner || false}',
                  '${company.active || false}',
                  '${company.description || ""}',
                  '${company.createdBy || ""}',
                  '${now}')`;
    const db = createPool();
    await db.query(sql);
    return new Response(JSON.stringify({ message: "event created" }), { status: 200 });
}

export async function PUT({ request }) {
    const company: Company = await request.json();
    const isValidUuid = getIsValidUuid(company?.id);

    if (isValidUuid) {
        const sql =  `UPDATE company SET 
                 name='${company.name}', 
                 name_short='${company.nameShort}',
                 logo_ref='${company.logoRef}',
                 url='${company.url}',
                 partner='${company.partner || false}',
                 active='${company.active || false}',
                 description='${company.description}'
            WHERE id='${company.id}'`;

        console.log("sql: ", sql);

        const db = createPool();
        await db.query(sql);
        return new Response(JSON.stringify({ message: "company updated" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "company update failed" }), { status: 400 });
}

export async function DELETE({ request }) {
    const id = await request.json();
    const uuidLength = 36;
    if (id && id.length === uuidLength) {
        const sql = `DELETE FROM company WHERE id = '${id}'`;
        const db = createPool();
        await db.query(sql);
        return new Response(JSON.stringify({ message: "Company deleted" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Delete company failed" }), { status: 400 });
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