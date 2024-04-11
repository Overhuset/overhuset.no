import type { Constellation } from "$lib/types";

export const sortConstellations = (constellations: Constellation[], by: "name" | "createdAt" ):Constellation[] => {
    switch (by) {
        case "name": {
            constellations.sort((a, b) => (a?.name || "").toLowerCase() < (b?.name || "").toLowerCase() ? -1 : 1);
            return constellations;
        }
        case "createdAt": {
            constellations.sort((a, b) => {
                return (new Date(a?.createdAt)) - (new Date(b?.createdAt));
            });
            return constellations.reverse();
        }

        default: return constellations;
    }
}