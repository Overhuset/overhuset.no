import type { VercelPool } from '@vercel/postgres';
import { mapFromDbToCompanyObject } from '$lib/utils/objectMapper';

export const fetchCompany = async (db: VercelPool, companyId?: string) => {
	if (companyId) {
		const result = await db.query(`SELECT * FROM company WHERE id = '${companyId}'`);
		return result.rows.length > 0 ?  mapFromDbToCompanyObject(result.rows[0]) : undefined;
	}
	return undefined;
}

export const fetchCompanyByName = async (db: VercelPool, nameShort:string) => {
	const result = await db.query(`SELECT * FROM company WHERE active = true AND LOWER(name_short) = LOWER('${nameShort}')`);
	return result.rows.length > 0 ? mapFromDbToCompanyObject(result.rows[0]) : undefined;
}

export const fetchAllCompaniesExceptOverhuset = async (db: VercelPool) => {
 	const result = await db.query("SELECT * FROM company WHERE name_short != 'Overhuset' ORDER BY created_at ASC");
	return result.rows.map(c => mapFromDbToCompanyObject(c));
}

export const fetchAllCompanies = async (db: VercelPool) => {
 	const result = await db.query('SELECT * FROM company ORDER BY created_at ASC');
	return result.rows.map(c => mapFromDbToCompanyObject(c));
}

export const fetchActiveCompanies = async (db: VercelPool) => {
 	const result = await db.query('SELECT * FROM company WHERE active = true');
	return result.rows.map(c => mapFromDbToCompanyObject(c));
}

export const fetchAllActivePartnerCompanies = async (db: VercelPool) => {
 	const result = await db.query('SELECT * FROM company WHERE partner = true AND active = true ORDER BY name ASC');
	return result.rows.map(c => mapFromDbToCompanyObject(c));
}


