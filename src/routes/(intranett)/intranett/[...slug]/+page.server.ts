import fs from 'fs';
import path from 'path';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getLinkItemBySlug } from '$lib/config/intranett/routes';
import { accessCheck } from '$lib/utils/accessController';
import { createPool } from '@vercel/postgres';
import { fetchAuthUser } from '$lib/data-access/user';

export const load: PageServerLoad = async ({ params, locals }) => {
  const db = createPool();
  const session = await locals.auth.validate();
  const user = session?.user;
  const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;

  const slugArray = params.slug || [];
  const slug = slugArray.join('/');

  console.log('Slug:', slug);

  await accessCheck(db, authUser, `/intranett/${slug}`);

  const item = getLinkItemBySlug(slug);

  console.log('Item:', item);

  if (!item) {
    throw error(404, { message: 'Fant ikke element for slug: ' + slug });
  }

  const filePath = path.resolve(`src/lib/content/articles/${item.markdown}`);

  console.log('File path:', filePath);

  if (!fs.existsSync(filePath)) {
    throw error(404, { message: 'Vi fant ikke denne siden.' });
  }

  const markdownContent = fs.readFileSync(filePath, 'utf-8');
  return { content: markdownContent };
};
