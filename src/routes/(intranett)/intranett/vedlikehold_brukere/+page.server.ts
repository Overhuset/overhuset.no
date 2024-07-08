import {createPool} from "@vercel/postgres";
import { fetchAllUserInvites, fetchAllAuthUsers, fetchAuthUser } from '$lib/data-access/user';


export async function load({ locals }) {

	const db = createPool();
	const session = await locals.auth.validate();
	const user  = session?.user;
	const authUser = user?.userId ? await fetchAuthUser(db, user.userId) : undefined;
	const authUserList = await fetchAllAuthUsers(db);
	const inviteList = fetchAllUserInvites(db);
	return { authUser, authUserList, inviteList};
}