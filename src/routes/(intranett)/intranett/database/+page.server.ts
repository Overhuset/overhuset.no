import { createPool } from '@vercel/postgres';
import { sql } from '@vercel/postgres';

async function seed() {
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

	const auth_user = await Promise.all([
		sql`
          INSERT INTO auth_user (id, name, email, image)
          VALUES ('darth-v', 'Darth Vader', 'darth@overhuset.no', 'https://static.wikia.nocookie.net/888f4245-6374-444d-b156-401bf676d894/scale-to-width/755')
          ON CONFLICT (email) DO NOTHING;
      `,
		sql`
          INSERT INTO auth_user (id, name, email, image)
          VALUES ('emp-pal', 'Emperor Palpatine', 'force-gutten@jpro.no', 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/star-wars-episode-7/0/02/Palpatine_1.jpg?width=640')
          ON CONFLICT (email) DO NOTHING;
      `,
		sql`
          INSERT INTO auth_user (id, name, email, image)
          VALUES ('luke-sky', 'Luke Skywalker', 'milkDrinker@ferde.no', 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/star-wars-episode-7/2/2d/Luke.jpg')
          ON CONFLICT (email) DO NOTHING;
      `
	]);
	console.log(`Seeded ${auth_user.length} auth_user`);

	return {
		createUserTable,
		createKeyTable,
		createSessionTable,
		auth_user
	};
}

export async function load() {
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
			console.log('Table does not exist, creating and seeding it with dummy data now...');
			// Table is not created yet
			await seed();
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
