import { createClient } from '@sanity/client';
import type { Config } from 'sanity';
import { deskTool } from 'sanity/desk';

export const client = createClient({
	projectId: 'bza9rjev',
	dataset: 'production',
	apiVersion: '2021-10-21',
	useCdn: false
});

export const config: Config = {
	plugins: [deskTool()],
	name: 'overhuset',
	projectId: 'bza9rjev',
	dataset: 'production'
};
