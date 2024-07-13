
// ****** Assert Types for each item ******
import type { LinkItem, SlugGroupItem, SlugLinkItem, SlugTreeItem } from '$lib/types';

export function isLinkItem(node: SlugTreeItem): node is SlugLinkItem {
	return 'slug' in node && 'markdown' in node && 'status' in node;
}

export function isGroupItem(node: SlugTreeItem): node is SlugGroupItem {
	return 'children' in node;
}

// If we're in production, we only want a tree with "published" nodes/articles.
// If we're in another environment, we can retrieve everything.
export function getSlugTreeItems(isProd: boolean, isAdmin: boolean, isPartner: boolean): SlugTreeItem[] {
	const items = isProd ? filterOutDrafts(slugItems) : slugItems;
	return items.filter(item =>
		isAdmin ||
		item.access.length === 0 ||
		item.access.includes("all") ||
		(isPartner && item.access.includes("partner"))
	);
}

export function getHeaderLinkItems (isAdmin: boolean, isPartner: boolean): LinkItem[] {
	return headerLinkItems.filter(item =>
		isAdmin ||
		item.access.length === 0 ||
		item.access.includes("all") ||
		(isPartner && item.access.includes("partner"))
	);
}

export function getAdminLinkItems (isAdmin: boolean, isPartner: boolean): LinkItem[] {
	return adminItems.filter(item =>
		isAdmin ||
		item.access.length === 0 ||
		item.access.includes("all") ||
		(isPartner && item.access.includes("partner"))
	);
}

function filterOutDrafts(nodes: SlugTreeItem[]): SlugTreeItem[] {
	return nodes.flatMap((node): SlugTreeItem[] => {
		if (isLinkItem(node)) {
			return node.status !== 'draft' ? [node] : [];
		} else if (isGroupItem(node)) {
			const filteredChildren = filterOutDrafts(node.children);
			return filteredChildren.length > 0 ? [{ ...node, children: filteredChildren }] : [];
		}
		return [];
	});
}

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

export function getLinkItemBySlug(slug: string, isProd: boolean): SlugLinkItem | null {
	const filteredTree = isProd ? filterOutDrafts(slugItems) : slugItems;
	return findLinkItemBySlug(filteredTree, slug);
}

const headerLinkItems: LinkItem[] = [
	{
		title: 'Ledige konsulenter',
		href: '/intranett/ledig',
		access: ['admin', 'partner']
	},
];

const adminItems: LinkItem[] = [
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
		title: 'Hjem',
		slug: '',
		markdown: 'index.html',
		status: 'published',
		access: ['all']
	},
	{
		title: 'Kvalitetssystem',
		slug: 'kvalitetssystem',
		markdown: 'kvalitetssystem.md',
		status: 'published',
		access: ['admin', 'partner']
	},
	{
		title: 'Rammeavtaler',
		slug: 'rammeavtaler',
		markdown: 'rammeavtaler.md',
		status: 'published',
		access: ['admin', 'partner']
	},
	{
		title: 'Våre kunder',
		slug: 'vare-kunder',
		markdown: 'vare-kunder.md',
		status: 'published',
		access: ['all']
	},
	{
		title: 'Retningslinjer',
		slug: 'retningslinjer',
		markdown: 'retningslinjer.md',
		status: 'published',
		access: ['admin', 'partner']
	},
];
