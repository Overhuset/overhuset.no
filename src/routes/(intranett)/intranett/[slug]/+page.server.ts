import fs from 'fs';
import path from 'path';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getLinkItemBySlug } from '$lib/config/intranett/routes';
import { accessCheck } from '$lib/utils/accessController';
import { createPool } from '@vercel/postgres';
import { fetchAuthUser } from '$lib/data-access/user';

export const load: PageServerLoad = async ({ fetch, params, locals }) => {
  const db = createPool();
  const session = await locals.auth.validate();
  const user = session?.user;
  const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;

  await accessCheck(db, authUser, `/intranett/${params.slug}`);

  const item = getLinkItemBySlug(params.slug);

  if (!item) {
    throw error(404, { message: 'Fant ikke element for slug: ' + params.slug });
  }

  // Bruk fs til å lese filen direkte
  const filePath = path.resolve(`static/intranett-articles/articles/${item.markdown}`);
  if (!fs.existsSync(filePath)) {
    throw error(404, { message: 'Vi fant ikke denne siden.' });
  }

  const markdownContent = fs.readFileSync(filePath, 'utf-8');
  return { content: markdownContent };
};
