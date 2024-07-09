import {createPool} from "@vercel/postgres";
import { fetchAllUserInvites, fetchAllAuthUsers, fetchAuthUser } from '$lib/data-access/user';
import { accessCheck } from '$lib/utils/accessController';


export async function load({ locals }) {
	const db = createPool();
	const session = await locals.auth.validate();
	const user  = session?.user;
	const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;
	const authUserList = await fetchAllAuthUsers(db);
	const inviteList = fetchAllUserInvites(db);

	await accessCheck(db,  authUser, '/intranett/vedlikehold_brukere');

	return { authUser, authUserList, inviteList};
}