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

export const fetchConstellationByUrlRef = async (db:VercelPool, urlRef:string) => {
	const result = await db.query(`SELECT * FROM constellation WHERE active = true AND LOWER(url_ref) = LOWER('${urlRef}')`);
	return result.rows.length > 0 ? mapFromDbToConstellationObject(result.rows[0]) : undefined;
}
