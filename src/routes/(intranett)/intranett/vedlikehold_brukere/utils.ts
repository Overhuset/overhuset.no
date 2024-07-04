import type { AuthUser, Constellation } from '$lib/types';

export const sortUsers = (authUsers: AuthUser[], by: "name" | "createdAt" ):Constellation[] => {
    switch (by) {
        case "name": {
            authUsers.sort((a, b) => (a?.username || "").toLowerCase() < (b?.username || "").toLowerCase() ? -1 : 1);
            return authUsers;
        }
        case "createdAt": {
            authUsers.sort((a, b) => {
                return (new Date(a?.createdAt)) - (new Date(b?.createdAt));
            });
            return authUsers.reverse();
        }

        default: return authUsers;
    }
}