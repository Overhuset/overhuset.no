import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getLinkItemBySlug } from '$lib/config/intranett/routes';
import { accessCheck } from '$lib/utils/accessController';
import { createPool } from '@vercel/postgres';
import { fetchAuthUser } from '$lib/data-access/user';

const allMarkdownFiles = import.meta.glob('/src/lib/content/articles/*.md', { as: 'raw' });

export const load: PageServerLoad = async ({ params, locals }) => {
  const db = createPool();
  const session = await locals.auth.validate();
  const user = session?.user;
  const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;

  await accessCheck(db, authUser, `/intranett/${params.slug}`);

  const item = getLinkItemBySlug(params.slug);

  if (!item) {
    throw error(404, { message: 'Fant ikke element for slug: ' + params.slug });
  }

  const fileKey = `/src/lib/content/articles/${item.markdown}`;
  const loader = allMarkdownFiles[fileKey];

  if (!loader) {
    throw error(404, { message: 'Vi fant ikke denne siden.' });
  }

  const markdownContent = await loader();
  return { content: markdownContent };
};
