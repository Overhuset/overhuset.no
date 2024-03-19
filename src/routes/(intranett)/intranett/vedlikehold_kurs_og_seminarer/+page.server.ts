import {createPool} from "@vercel/postgres";

const fetchEmail = async (id: string) => {
	const db = createPool();
	const result = await db.query(`SELECT email FROM auth_user WHERE id = '${id}'`);
	const email = result.rows.map(au => au.email);
	return email[0];
}

const fetchAllEvents = async () => {
	const db = createPool();
	const result = await db.query('SELECT * FROM event ORDER by created_at DESC');
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

const fetchAllCompanies = async () => {
	const db = createPool();
	const result = await db.query('SELECT * FROM company');
	return result.rows.map(c => ({
		id: c.id,
		name: c.name,
		nameShort: c.name_short,
		logoRef: c.logo_ref,
		url: c.url,
		description: c.description
	}));
}

export async function load({ locals }) {
	const session = await locals.auth.validate();
	const user  = session?.user;
	const email = user?.userId ? await fetchEmail(user?.userId) : undefined;
	const eventList = await fetchAllEvents();
	const companyList = fetchAllCompanies();
	return { eventList, companyList, email};
}