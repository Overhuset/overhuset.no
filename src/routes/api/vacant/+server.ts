import {createPool} from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';
import type {Vacant} from "$lib/types.js";
import {getNowForDB} from "$lib/utils/dateUtils";

// @ts-ignore
export async function POST({ request }) {
    const vacant: Vacant = await request.json();

    if (vacant?.id) {
        // update
        const {id, name, comment, vacantFrom,cv} = vacant;
        const uuidLength = 36;
        if (id && id.length === uuidLength) {
            const sql = cv ?
                `UPDATE vacant_consultant SET name='${name}', comment='${comment}', vacant_from='${vacantFrom}',cv='${cv}' WHERE id='${id}'`
            :
                `UPDATE vacant_consultant SET name='${name}', comment='${comment}', vacant_from='${vacantFrom}' WHERE id='${id}'`
            ;
            const db = createPool();
            await db.query(sql);
        }
        return new Response(JSON.stringify({ message: "Vacant updated" }), { status: 200 });

    } else {
        // new
        const {name, email, vacantFrom, comment, createdBy, cv} = vacant;
        const now = getNowForDB();
        const sql = `INSERT INTO vacant_consultant (id, name, vacant_from, comment, created_by, created_at,  cv) VALUES ('${uuidv4()}', '${name}', '${vacantFrom}', '${comment}', '${createdBy}', '${now}', '${cv}')`;
        const db = createPool();
        await db.query(sql);
        return new Response(JSON.stringify({ message: "Vacant created" }), { status: 200 });
    }
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
 create table vacant_consultant
 (
 vacant_from timestamp,
 comment     varchar,
 created_by  varchar,
 id          uuid not null,
 created_at  timestamp,
 cv          varchar,
 name        varchar
 ); */