export type Event = {
	id: string,
	title: string;
	description: string;
	location: string;
	time: string;
	createdBy: string;
	createdAt: Date;
	registration: string;
	published: boolean;
	onlineStreaming: boolean;
	physicalAttendance: boolean
	externalsAllowed: boolean;
	onlineCourse: boolean;
	company: string;
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