import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {createPool} from "@vercel/postgres";


const fetchConstellation = async (urlRef:string) => {
	const db = createPool();
	const result = await db.query(`SELECT * FROM constellation WHERE url_ref = '${urlRef}'`);

	return result.rows.map(c => ({
		id: c.id,
		name: c.name,
		description: c.description,
		companies: c.companies,
		active: c.active,
		createdBy: c.created_by,
		createdAt: c.created_at,
		logoRef: c.logo_ref,
		urlRef: c.urlRef,
	}));
}

export const load: PageServerLoad = async ({ fetch, params }) => {

	if (params.slug) {
		console.log("param: ", params.slug);
		const constellation = await fetchConstellation(params.slug);

		if (constellation.length > 0) {
			return {
				constellation: constellation[0]
			}
		} else {

			console.log("return 404");

			throw error(404, {
				message: 'Vi fant ikke denne siden.'
			});
		}

	}

};
