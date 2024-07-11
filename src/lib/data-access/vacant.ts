import type { VercelPool } from '@vercel/postgres';

export const fetchAllVacants = async (db: VercelPool) => {
	const result = await db.query('SELECT * FROM vacant_consultant ORDER by vacant_from ASC');
	return result.rows.map(v => ({
		id: v.id,
		name: v.name,
		email: v.email,
		vacantFrom: v.vacant_from,
		comment: v.comment,
		createdBy: v.created_by,
		createdAt: v.created_by,
		cv: v.cv
	}));
}

