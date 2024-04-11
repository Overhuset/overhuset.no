import type {Event} from "$lib/types";

export const sortEvents = (events: Event[], by: "title" | "createdAt" | "time"): Event[] => {
    switch (by) {
        case "title": {
            events.sort((a, b) => (a?.title || "").toLowerCase() < (b?.title || "").toLowerCase() ? -1 : 1);
            return events;
        }
        case "createdAt": {
            events.sort((a, b) => {
                return (new Date(a?.createdAt)) - (new Date(b?.createdAt));
            });
            return events.reverse();
        }
        case "time": {
            events.sort((a, b) => {
                return (new Date(a?.time)) - (new Date(b?.time));
            });
            return events.reverse();
        }

        default: return events;
    }
}