import type { VercelPool } from '@vercel/postgres';
import {
	mapFromDbToAuthUserObject,
	mapFromDbToUserInviteObject
} from '$lib/utils/objectMapper';

export const fetchAuthUser = async (db: VercelPool, userId?: string)=> {
	if (userId) {
		const result = await db.query(`SELECT * FROM auth_user WHERE id = '${userId}'`);
		return result.rows.length > 0 ? mapFromDbToAuthUserObject(result.rows[0]) : undefined;
	}
	return undefined;
}

export const fetchAllAuthUsers = async (db: VercelPool)=> {
	const result = await db.query(`SELECT * FROM auth_user`);
	return result.rows.map(au => mapFromDbToAuthUserObject(au));
}

export const fetchAllUserInvites = async (db: VercelPool)=> {
	const result = await db.query(`SELECT * FROM user_invite`);
	return result.rows.map(ui => mapFromDbToUserInviteObject(ui));
}

export const fetchUserInvitesByEmail = async (db: VercelPool, email?: string)=> {
	if (email) {
		const result = await db.query(`SELECT * FROM user_invite WHERE email = '${email}'`);
		return result.rows.map(ui => mapFromDbToUserInviteObject(ui));
	}
	return [];
}
