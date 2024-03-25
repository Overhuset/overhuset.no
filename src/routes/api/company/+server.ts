import {createPool} from "@vercel/postgres";
import type {Company} from "$lib/types.js";
import {getIsValidUuid} from "$lib/utils/uuidUtils";

export async function PUT({ request }) {
    const company: Company = await request.json();
    const isValidUuid = getIsValidUuid(company?.id);

    if (isValidUuid) {
        const sql =  `UPDATE company SET 
                 name='${company.name}', 
                 name_short='${company.nameShort}',
                 logo_ref='${company.logoRef}',
                 url='${company.url}',
                 description='${company.description}'
            WHERE id='${company.id}'`;
        const db = createPool();
        await db.query(sql);
        return new Response(JSON.stringify({ message: "company updated" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "company event failed" }), { status: 400 });
}




/**
 create table company
 (
 name        varchar not null,
 name_short  varchar not null,
 logo_ref    varchar,
 url         varchar,
 description varchar,
 id          varchar not null
 );
 */