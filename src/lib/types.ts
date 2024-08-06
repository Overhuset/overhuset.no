// data types

export type Event = {
	id?: string,
	title?: string;
	description?: string;
	location?: string;
	time?: string;
	timeEnd?: string;
	createdBy?: string;
	createdAt?: Date;
	registration?: string;
	published: boolean;
	onlineStreaming: boolean;
	physicalAttendance: boolean
	externalsAllowed: boolean;
	fullDay: boolean;
	onlineCourse: boolean;
	company?: string;
	companyId?: string;
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
	logo?: BlobPart;
	logoRef?: string;
	url?: string;
	title?: string;
	ingress?: string;
	description?: string;
	createdBy?: string;
	createdAt?: Date;
	partner?: boolean;
	active?: boolean;
}

export type Constellation = {
	id?: string;
	name?: string;
	description?: string;
	description2?: string;
	companies?: string;
	active?: boolean;
	createdBy?: string;
	createdAt?: Date;
	logo?: string;
	logoRef?: string;
	urlRef?: string;
}

export type AuthUser = {
	id?: string;
	name?: string;
	email?: string;
	image?: boolean;
	username?: string;
	createdAt?: Date;
	admin?: boolean;
	active?: boolean;
	companyId?: string;
}

export type EmailDomain = {
	id?: string;
	domain?: string;
	companyId?: string;
	createdBy?: string;
	createdAt?: Date;
}

export type UserInvite = {
	id?: string;
	email?: string;
	companyId?: string;
	createdBy?: string;
	createdAt?: Date;
}


// helper types

export type LinkItem = {
	title: string;
	href: string;
	access: ("partner" | "admin" | "all")[];
};

export type SlugLinkItem = {
	markdown: string;
	slug: string;
	status: 'draft' | 'published';
	access: ("partner" | "admin" | "all")[];
};

export type SlugGroupItem = {
	children: SlugTreeItem[];
	access: ("partner" | "admin" | "all")[];
};

export type SlugTreeItem = SlugLinkItem | SlugGroupItem;
