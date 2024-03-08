import { dev } from '$app/environment';
import {createPool} from "@vercel/postgres";

const fetchAllEvents = async () => {
	const db = createPool();
	const result = await db.query('SELECT * FROM event ORDER by time ASC');
	return result.rows.map(e => ({
		id: e.id,
		title: e.title,
		description: e.description,
		location: e.location,
		time: e.time,
		createdBy: e.created_by,
		createdAt: e.created_at,
		registration: e.registration,
		published: e.published,
		onlineStreaming: e.online_streaming,
		physicalAttendance: e.physical_attendance,
		externalsAllowed: e.externals_allowed,
		company: e.company,
		onlineCourse: e.online_course
	}));
}

export async function load() {
	const eventList = await fetchAllEvents();
	return { eventList };
}

export const config = dev
	? {}
	: {
			isr: {
				expiration: 60
			}
	  };
