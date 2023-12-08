import { createPool } from '@vercel/postgres';
import { sql } from '@vercel/postgres';

// Function that shows how to create the tables required for authentication.

async function createAuthTables() {
	const createUserTable = await sql`
    CREATE TABLE IF NOT EXISTS auth_user (
      id TEXT NOT NULL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      image VARCHAR(255),
      username VARCHAR(255),
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `;

	const createKeyTable = await sql`
    CREATE TABLE IF NOT EXISTS user_key (
      id TEXT NOT NULL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES auth_user(id),
      hashed_password TEXT
    );
  `;

	const createSessionTable = await sql`
    CREATE TABLE user_session (
      id TEXT NOT NULL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES auth_user(id),
      active_expires BIGINT NOT NULL,
      idle_expires BIGINT NOT NULL
    );
  `;

	console.log(`Created "auth_user" table`);

	return {
		createUserTable,
		createKeyTable,
		createSessionTable
	};
}

// this function should only be used in case you want to test the db connection to vercel postgres.
// Lucia has a provider that handles everything we would need in these databases, but I'm keeping
// this file to show how to instansiate the database required, in case something happens.
export async function fetchAuthUser() {
	const db = createPool();
	const startTime = Date.now();

	try {
		const { rows: auth_user } = await db.query('SELECT * FROM auth_user');
		const duration = Date.now() - startTime;
		return {
			auth_user,
			duration: duration
		};
	} catch (error) {
		if (error?.message === `relation "auth_user" does not exist`) {
			console.log('Tables do not exist, creating them now...');
			// Table is not created yet
			await createAuthTables();
			const { rows: auth_user } = await db.query('SELECT * FROM auth_user');
			const duration = Date.now() - startTime;
			return {
				auth_user: auth_user,
				duration: duration
			};
		} else {
			throw Error;
		}
	}
}
