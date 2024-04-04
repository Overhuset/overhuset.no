import {createPool} from "@vercel/postgres";

const fetchAllEvents = async () => {
	const db = createPool();
	const result = await db.query('SELECT * FROM event WHERE published = true ORDER by time DESC');
	return result.rows.map(e => ({
		id: e.id,
		title: e.title,
		description: e.description,
		location: e.location,
		time: e.time,
		timeEnd: e.time_end,
		createdBy: e.created_by,
		createdAt: e.created_at,
		registration: e.registration,
		published: e.published,
		onlineStreaming: e.online_streaming,
		physicalAttendance: e.physical_attendance,
		externalsAllowed: e.externals_allowed,
		companyId: e.company_id,
		company: e.company,
		fullDay: e.full_day,
		onlineCourse: e.online_course
	}));
}

const fetchActiveCompanies = async () => {
	const db = createPool();
	const result = await db.query('SELECT * FROM company WHERE active = true');
	return result.rows.map(c => ({
		id: c.id,
		name: c.name,
		nameShort: c.name_short,
		logoRef: c.logo_ref,
		url: c.url,
		description: c.description,
		partner: c.partner
	}));
}


export async function load() {
	const eventList = await fetchAllEvents();
	const companies = await fetchActiveCompanies();
	const partnerEventsOnly = eventList.filter(
		e =>
			companies.find(c => c.id === e.companyId && (c.partner || !e.companyId )));
	return { eventList:partnerEventsOnly, companies };
}