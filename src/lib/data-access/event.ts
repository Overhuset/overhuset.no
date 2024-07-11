import type {VercelPool } from '@vercel/postgres';
import { mapFromDbToEventObject } from '$lib/utils/objectMapper';
import type { Constellation } from '$lib/types';
import { overhusetId } from '$lib/utils/uuidUtils';

export const fetchAllEvents = async (db: VercelPool) => {
	const result = await db.query('SELECT * FROM event ORDER by created_at DESC');
	return result.rows.map(e => mapFromDbToEventObject(e));
}

export const fetchAllEventsOnCompany = async (db: VercelPool, companyId?: string) => {
	if (companyId) {
		const result = await db.query(`SELECT * FROM event WHERE company_id = '${companyId}' ORDER by created_at DESC`);
		return result.rows.map(e => mapFromDbToEventObject(e));
	}
	return [];
}

export const fetchAllPublishedEvents = async (db: VercelPool) => {
	const result = await db.query('SELECT * FROM event WHERE published = true ORDER by time DESC');
	return result.rows.map(e => mapFromDbToEventObject(e));
}

export const fetchEventsByConstellation = async (db: VercelPool, constellation?: Constellation) => {
	if (constellation) {
		const companyIds = (constellation.companies || "").split(";").concat(overhusetId);
		const companyIdsParam = companyIds.map(companyId => `'${companyId}'`);
		const sql = `SELECT * FROM event WHERE company_id IN (${companyIdsParam}) AND published = true ORDER BY time DESC`;
		const result = await db.query(sql);
		return result.rows.map(e => mapFromDbToEventObject(e));
	}
	return [];
}