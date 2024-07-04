import type { VercelPool } from '@vercel/postgres';
import { mapFromDbToConstellationObject } from '$lib/utils/objectMapper';

export const fetchAllConstellations = async (db:VercelPool) => {
	const result = await db.query('SELECT * FROM constellation ORDER BY name ASC');
	return result.rows.map(c => mapFromDbToConstellationObject(c));
}

export const fetchActiveConstellationsByCompany = async (db:VercelPool, companyId?: string) => {
 	if (companyId) {
		const result = await db.query(`SELECT * FROM constellation WHERE active = true AND companies LIKE '%${companyId}%' ORDER BY name ASC`);
		return result.rows.map(c => mapFromDbToConstellationObject(c));
	}
	return [];
}

