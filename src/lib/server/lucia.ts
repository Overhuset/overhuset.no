// src/lib/server/lucia.ts
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';

import { google, azureAD } from '@lucia-auth/oauth/providers';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_TENANT, REDIRECT_URI } from '$env/static/private';
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
const redirectUriBase =  REDIRECT_URI ? REDIRECT_URI : `https://${process.env.VERCEL_URL}`;

export const googleAuth = google(auth, {
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	redirectUri: `${redirectUriBase}/intranett/login/google/callback`,
	scope: ['email']
});

export const azureADAuth = azureAD(auth, {
	clientId: AZURE_CLIENT_ID,
	clientSecret: AZURE_CLIENT_SECRET,
	tenant: AZURE_TENANT,
	redirectUri: `${redirectUriBase}/intranett/login/microsoft/callback`,
	scope: ['email']
});

export type Auth = typeof auth;
