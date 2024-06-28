import type { VercelPool } from '@vercel/postgres';
import { mapFromDbToEventObject } from '$lib/utils/objectMapper';

export const fetchAllEvents = async (db: VercelPool) => {
	const result = await db.query('SELECT * FROM event ORDER by created_at DESC');
	return result.rows.map(e => mapFromDbToEventObject(e));
}
export const fetchAllPublishedEvents = async (db: VercelPool) => {
	const result = await db.query('SELECT * FROM event WHERE published = true ORDER by time DESC');
	return result.rows.map(e => mapFromDbToEventObject(e));
}
