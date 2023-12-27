// src/lib/server/lucia.ts
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';

import { google, azureAD } from '@lucia-auth/oauth/providers';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_TENANT, AZURE_REDIRECT_URI } from '$env/static/private';
import { pg } from '@lucia-auth/adapter-postgresql';
import { db } from '@vercel/postgres';

const dbConfig = { user: 'auth_user', session: 'user_session', key: 'user_key' };

export const auth = lucia({
	adapter: pg(db, dbConfig),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});

// Get full path to web app anywhere it is. If it's not on Vercel, default to local host

export const googleAuth = google(auth, {
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	redirectUri: GOOGLE_REDIRECT_URI,
	scope: ['email']
});

export const azureADAuth = azureAD(auth, {
	clientId: AZURE_CLIENT_ID,
	clientSecret: AZURE_CLIENT_SECRET,
	tenant: AZURE_TENANT,
	redirectUri: AZURE_REDIRECT_URI,
	scope: ['email']
});

export type Auth = typeof auth;
