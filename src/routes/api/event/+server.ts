import {createPool} from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';
import type {Event} from "$lib/types.js";
import {getNowForDB} from "$lib/utils/dateUtils";
import {getIsValidUuid} from "$lib/utils/uuidUtils";

// @ts-ignore
export async function POST({ request }) {
    const event: Event = await request.json();
    const now = getNowForDB();
    const sql = `INSERT INTO event (
                   id,
                   title, 
                   description,
                   registration,
                   location,
                   time,
                   time_end,
                   company,
                   company_id,
                   published,
                   online_course,
                   online_streaming,
                   physical_attendance,
                   externals_allowed,
                   full_day,
                   created_by,
                   created_at
                ) VALUES (
                  '${uuidv4()}', 
                  '${event.title || ""}', 
                  '${event.description || ""}',
                  '${event.registration || ""}',
                  '${event.location || ""}',
                  NULL,
                  NULL,
                  '${event.company || ""}',
                  '${event.companyId || ""}',
                  ${!!event.published},
                  ${!!event.onlineCourse},
                  ${!!event.onlineStreaming},
                  ${!!event.physicalAttendance},
                  ${!!event.externalsAllowed},
                  ${!!event.fullDay},
                  '${event.createdBy}',
                  '${now}')`;
    const db = createPool();
    await db.query(sql);
    return new Response(JSON.stringify({ message: "event created" }), { status: 200 });
}

export async function PUT({ request }) {
    const event: Event = await request.json();
    const isValidUuid = getIsValidUuid(event?.id);

    if (isValidUuid) {
        const sql =  `UPDATE event SET 
                 title='${event.title}', 
                 description='${event.description}',
                 registration='${event.registration}',
                 location='${event.location}',
                 published='${event.published}',
                 externals_allowed='${event.externalsAllowed}',
                 physical_attendance='${event.physicalAttendance}',
                 online_streaming='${event.onlineStreaming}',
                 online_course='${event.onlineCourse}',
                 full_day='${event.fullDay}',
                 company='${event.company}',
                 company_id='${event.companyId}',
                 time=${event.time ? `'${event.time}'` :  'NULL'},
                 time_end=${event.timeEnd ? `'${event.timeEnd}'` :  'NULL'}
            WHERE id='${event.id}'`;
        const db = createPool();
        await db.query(sql);
        return new Response(JSON.stringify({ message: "event updated" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "update event failed" }), { status: 400 });
}


// @ts-ignore
export async function DELETE({ request }) {
    const id = await request.json();
    const uuidLength = 36;
    if (id && id.length === uuidLength) {
        const sql = `DELETE FROM event WHERE id = '${id}'`;
        const db = createPool();
        await db.query(sql);
        return new Response(JSON.stringify({ message: "event deleted" }), { status: 200 });
    }
    return new Response(JSON.stringify({ message: "Delete event failed" }), { status: 400 });
}

/**
 * -- auto-generated definition
 * create table event
 * (
 *     id                  varchar not null,
 *     title               varchar,
 *     description         varchar,
 *     location            varchar,
 *     time                timestamp,
 *     created_by          varchar,
 *     created_at          timestamp,
 *     registration        varchar,
 *     published           boolean not null,
 *     online_streaming    boolean not null,
 *     physical_attendance boolean not null,
 *     externals_allowed   boolean not null,
 *     company             varchar,
 *     online_course       boolean,
 *     company_id          varchar,
 *     time_end            timestamp
 * );
 */