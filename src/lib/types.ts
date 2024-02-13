export type Event = {
	title: string;
	description: string;
	date: string;
	time: string;
	company: string;
	presentationLink: string;
	registrationLink: string;
	location: string;
	type: 'Åpent' | 'Internt' | 'Online kurs';
};

export type Vacant = {
	id?: string;
	firstName?: string;
	lastName?: string;
	vacantFrom?: string;
	email?: string;
	comment?: string;
	createdBy?: string;
}

export type AuthUser = {
	id?: string;
	email?: string;
	username?: string;
}