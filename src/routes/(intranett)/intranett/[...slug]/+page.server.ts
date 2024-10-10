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

  // Sjekk om slug er en array, og hvis ikke, pakk den inn i en array
  const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug];
  const slug = slugArray.join('/');

  console.log('Slug:', slug);

  // Sjekk brukerens tilgang til siden
  await accessCheck(db, authUser, `/intranett/${slug}`);

  // Hent riktig element basert på slug
  const item = getLinkItemBySlug(slug);

  console.log('Item:', item);

  // Hvis elementet ikke finnes, kast en 404-feil
  if (!item) {
    throw error(404, { message: 'Fant ikke element for slug: ' + slug });
  }

  // Definer stien til markdown-filen for innholdet
  const filePath = path.resolve(`src/lib/content/articles/${item.markdown}`);

  console.log('File path:', filePath);

  // Sjekk om filen eksisterer
  if (!fs.existsSync(filePath)) {
    throw error(404, { message: 'Vi fant ikke denne siden.' });
  }

  // Les innholdet fra markdown-filen
  const markdownContent = fs.readFileSync(filePath, 'utf-8');

  // Returner markdown-innholdet
  return { content: markdownContent };
};
