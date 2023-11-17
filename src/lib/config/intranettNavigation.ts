const items: TreeItem[] = [
	{
		title: 'Informasjon',
		children: [
			{
				title: 'Utformasjon',
				children: [
					{
						title: 'Utformasjon',
						children: [
							{
								title: 'Kvalitetssystemer',
								slug: 'vare-kunder',
								markdown: 'quality-systems.md',
								status: 'draft'
							},
							{
								title: 'Våre kunder',
								slug: 'vare-kunder',
								markdown: 'vare-kunder.md',
								status: 'draft'
							},
							{
								title: 'Retningslinjer',
								slug: 'retningslinjer',
								markdown: 'retningslinjer.md',
								status: 'draft'
							}
						]
					},
					{
						title: 'Kvalitetssystemer',
						slug: 'vare-kunder',
						markdown: 'quality-systems.md',
						status: 'draft'
					},
					{
						title: 'Våre kunder',
						slug: 'vare-kunder',
						markdown: 'vare-kunder.md',
						status: 'draft'
					},
					{
						title: 'Retningslinjer',
						slug: 'retningslinjer',
						markdown: 'retningslinjer.md',
						status: 'draft'
					}
				]
			},
			{
				title: 'Kvalitetssystemer',
				slug: 'vare-kunder',
				markdown: 'quality-systems.md',
				status: 'draft'
			},
			{
				title: 'Våre kunder',
				slug: 'vare-kunder',
				markdown: 'vare-kunder.md',
				status: 'draft'
			},
			{
				title: 'Retningslinjer',
				slug: 'retningslinjer',
				markdown: 'retningslinjer.md',
				status: 'draft'
			}
		]
	},
	{
		title: 'Sosialt 🥳',
		slug: 'sosialt',
		markdown: 'sosialt.md',
		status: 'published'
	}
];

// ****** TYPES ******
type LinkItem = {
	title: string;
	markdown: string;
	slug: string;
	status: 'draft' | 'published';
};

type GroupItem = {
	title: string;
	children: TreeItem[];
};

export type TreeItem = LinkItem | GroupItem;

// ****** Assert Types for each item ******
export function isLinkItem(node: TreeItem): node is LinkItem {
	return 'slug' in node && 'markdown' in node && 'status' in node;
}

export function isGroupItem(node: TreeItem): node is GroupItem {
	return 'children' in node;
}

// If we're in production, we only want a tree with "published" nodes/articles.
// If we're in another environment, we can retrieve everything.
export function getTree(isProd: boolean): TreeItem[] {
	if (!isProd) return items;
	return filterOutDrafts(items);
}

function filterOutDrafts(nodes: TreeItem[]): TreeItem[] {
	return nodes.flatMap((node): TreeItem[] => {
		if (isLinkItem(node)) {
			return node.status !== 'draft' ? [node] : [];
		} else if (isGroupItem(node)) {
			const filteredChildren = filterOutDrafts(node.children);
			return filteredChildren.length > 0 ? [{ ...node, children: filteredChildren }] : [];
		}
		return [];
	});
}

function findLinkItemBySlug(nodes: TreeItem[], slug: string): LinkItem | null {
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

export function getLinkItemBySlug(slug: string, isProd: boolean): LinkItem | null {
	const tree = isProd ? filterOutDrafts(items) : items;
	return findLinkItemBySlug(tree, slug);
}
