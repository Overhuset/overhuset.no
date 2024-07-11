import type { VercelPool } from '@vercel/postgres';
import { mapFromDbToCompanyObject } from '$lib/utils/objectMapper';
import type { Constellation } from '$lib/types';
import { overhusetId } from '$lib/utils/uuidUtils';



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

export const fetchCompaniesByConstellation = async (db: VercelPool, constellation?: Constellation) => {
	if (constellation) {
		const companyIds = (constellation.companies || "").split(";").concat(overhusetId);;
		const companyIdsParam = companyIds.map(companyId => `'${companyId}'`);
		const sql = `SELECT * FROM company WHERE id IN (${companyIdsParam}) ORDER BY NAME ASC`;
		const result = await db.query(sql);
		return result.rows.map(c => mapFromDbToCompanyObject(c));
	}
	return [];
}

