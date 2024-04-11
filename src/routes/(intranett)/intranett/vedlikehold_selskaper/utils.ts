import type { Company } from "$lib/types";

export const sortCompanies = (companies: Company[], by: "name" | "createdAt" ):Company[] => {
    switch (by) {
        case "name": {
            companies.sort((a, b) => (a?.name || "").toLowerCase() < (b?.name || "").toLowerCase() ? -1 : 1);
            return companies;
        }
        case "createdAt": {
            companies.sort((a, b) => {
                return (new Date(a?.createdAt)) - (new Date(b?.createdAt));
            });
            return companies.reverse();
        }

        default: return companies;
    }
}