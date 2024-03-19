export type Event = {
	id: string,
	title: string;
	description: string;
	location: string;
	time: string;
	timeEnd: string;
	createdBy: string;
	createdAt: Date;
	registration: string;
	published: boolean;
	onlineStreaming: boolean;
	physicalAttendance: boolean
	externalsAllowed: boolean;
	fullDay: boolean;
	onlineCourse: boolean;
	company: string;
	companyId: string;
};

export type Vacant = {
	id?: string;
	name?: string;
	vacantFrom?: string;
	email?: string;
	comment?: string;
	createdBy?: string;
	createdAt?: string;
	cv?: string;
}

export type Company = {
	id?: string;
	name?: string;
	nameShort?: string;
	logoRef?: string;
	url?: string;
	description?: string;
}