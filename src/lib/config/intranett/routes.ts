
// ****** Assert Types for each item ******
import type { AuthUser, Company, LinkItem, SlugGroupItem, SlugLinkItem, SlugTreeItem } from '$lib/types';

export function isLinkItem(node: SlugTreeItem): node is SlugLinkItem {
	return 'slug' in node && 'markdown' in node && 'status' in node;
}


export function isGroupItem(node: SlugTreeItem): node is SlugGroupItem {
	return 'children' in node;
}

 export function getSlugTreeItems(authUser?: AuthUser, company?: Company): SlugTreeItem[] {
	if (!authUser || !company) return [];

	const isPartner = company?.partner || false;
  const isAdmin = authUser?.admin || false;

	return slugItems.filter(item =>
		isAdmin ||
		item.access.length === 0 ||
		item.access.includes("all") ||
		(isPartner && item.access.includes("partner"))
	);
}

export function getHeaderLinkItems (authUser?: AuthUser, company?: Company): LinkItem[] {
	if (!authUser || !company) return [];

	const isPartner = company?.partner || false;
	const isAdmin = authUser?.admin || false;

	return headerLinkItems.filter(item =>
		isAdmin ||
		item.access.length === 0 ||
		item.access.includes("all") ||
		(isPartner && item.access.includes("partner"))
	);
}

export function getAdminLinkItems (authUser?: AuthUser, company?: Company): LinkItem[] {
	if (!authUser || !company) return [];

	const isPartner = company?.partner || false;
	const isAdmin = authUser?.admin || false;

	return adminLinkItems.filter(item =>
		isAdmin ||
		item.access.length === 0 ||
		item.access.includes("all") ||
		(isPartner && item.access.includes("partner"))
	);
}



export function getLinkItemBySlug(slug: string): SlugLinkItem | null {
	function findLinkItemBySlug(nodes: SlugTreeItem[], slug: string): SlugLinkItem | null {
		for (const node of nodes) {
			if (isLinkItem(node)) {
				if (node.slug === slug) {
					return node;
				}
			} else if (isGroupItem(node)) {
				const found = findLinkItemBySlug(node.children, slug);
				if (found) {
					return found;
				}
			}
		}
		return null;
	}

 	return findLinkItemBySlug(slugItems, slug);
}


const headerLinkItems: LinkItem[] = [
  {
    title: 'Kvalitetssystem',
    href: '/intranett/kvalitetssystem',
    access: ['admin', 'partner']
	},
	{
		title: 'Informasjon til KAM',
		href: '/intranett/informasjon_KAM',
		access: ['admin', 'partner']
	},
	{
		title: 'Rammeavtaler',
		href: '/intranett/rammeavtaler',
 		access: ['admin', 'partner']
	},
	{
		title: 'Retningslinjer',
 		href: '/intranett/retningslinjer',
 		access: ['admin', 'partner']
	},
	{
		title: 'Ledige konsulenter',
		href: '/intranett/ledig',
		access: ['admin', 'partner']
	},
];


const adminLinkItems: LinkItem[] = [
	{
		title: 'Arrangementer',
		href: '/intranett/vedlikehold_kurs_og_seminarer',
		access: ['all']
	},
	{
		title: 'Brukere',
		href: '/intranett/vedlikehold_brukere',
		access: ['admin']
	},
	{
		title: 'Konstellasjoner',
		href: '/intranett/vedlikehold_konstellasjoner',
		access: ['admin', 'partner']
	},
	{
		title: 'Ledige konsulenter',
		href: '/intranett/vedlikehold_ledig',
		access: ['admin', 'partner']
	},
	{
		title: 'Selskaper',
		href: '/intranett/vedlikehold_selskaper',
		access: ['admin', 'partner']
	},
];

const slugItems: SlugTreeItem[] = [
	{
		slug: '',
		markdown: 'index.html',
		status: 'published',
		access: ['all']
	},
	{
		slug: 'kvalitetssystem',
		markdown: 'kvalitetssystem.md',
		status: 'published',
		access: ['admin', 'partner']
	},
	{
		slug: 'informasjon_KAM',
		markdown: 'informasjon_KAM.md',
		status: 'published',
		access: ['admin', 'partner']
	},
	{
		slug: 'rammeavtaler',
		markdown: 'rammeavtaler.md',
		status: 'published',
		access: ['admin', 'partner']
	},
	{
		slug: 'retningslinjer',
		markdown: 'retningslinjer.md',
		status: 'published',
		access: ['admin', 'partner']
	},
];
