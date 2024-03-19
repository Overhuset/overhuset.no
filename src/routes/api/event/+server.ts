import {createPool} from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';
import type {Event} from "$lib/types.js";
import {getNowFroDB} from "$lib/utils/dateUtils";
import {getIsValidUuid} from "$lib/utils/uuidUtils";

// @ts-ignore
export async function POST({ request }) {
    const event: Event = await request.json();
    const {id, title, description, registration,createdBy} = event;
    const now = getNowFroDB();
    const sql = `INSERT INTO event (id, title, description, registration, created_by, created_at) VALUES ('${uuidv4()}', '${title}', '${description}', '${registration}', '${createdBy}', '${now}')`;
    const db = createPool();
    await db.query(sql);
    return new Response(JSON.stringify({ message: "event created" }), { status: 200 });
}

export async function PUT({ request }) {
    const event: Event = await request.json();
    const isValidUuid = getIsValidUuid(event?.id);

    if (isValidUuid) {
        const now = getNowFroDB();
        const {
            id,
            title,
            description,
            registration,
            location,
            time,
            timeEnd,
            company,
            published,
            onlineStreaming,
            physicalAttendance,
            externalsAllowed,
            onlineCourse,
            fullDay
        } = event;
        const sql =  `UPDATE event SET 
                 title='${title}', 
                 description='${description}',
                 registration='${registration}',
                 location='${location}',
                 published='${published}',
                 externals_allowed='${externalsAllowed}',
                 physical_attendance='${physicalAttendance}',
                 online_streaming='${onlineStreaming}',
                 online_course='${onlineCourse}',
                 full_day='${fullDay}',
                 company='${company}',
                 company_id='${time}',
                 time_end=${time ? `'${time}'` :  'NULL'}
                 time_end=${timeEnd ? `'${timeEnd}'` :  'NULL'}
            WHERE id='${id}'`;
        console.log("update: ", sql);
        console.log("now: ", now);
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
    }
    return new Response(JSON.stringify({ message: "event deleted" }), { status: 200 });
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