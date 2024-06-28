import type { VercelPool } from '@vercel/postgres';
import { mapFromDbToConstellationObject } from '$lib/utils/objectMapper';

export const fetchAllConstellations = async (db:VercelPool) => {
	const result = await db.query('SELECT * FROM constellation ORDER BY name ASC');
	return result.rows.map(c => mapFromDbToConstellationObject(c));
}
