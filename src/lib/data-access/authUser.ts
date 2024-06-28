import type { VercelPool } from '@vercel/postgres';
import { mapFromDbToAuthUserObject } from '$lib/utils/objectMapper';

export const fetchAuthUser = async (db: VercelPool, userId?: string)=> {
	if (userId) {
		const result = await db.query(`SELECT * FROM auth_user WHERE id = '${userId}'`);
		return result.rows.length > 0 ? mapFromDbToAuthUserObject(result.rows[0]) : undefined;
	}
	return undefined;
}
