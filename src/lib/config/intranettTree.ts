import type { TreeItem } from './intranettNavigation';

const tree: TreeItem[] = [
	{
		title: 'Hjem',
		slug: '',
		markdown: 'index.html',
		status: 'draft'
	},
	{
		title: 'Kvalitetssystemer',
		slug: 'kvalitetssystemer',
		markdown: 'kvalitetssystemer.md',
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
	},
	{
		title: 'Sosialt 🥳',
		slug: 'sosialt',
		markdown: 'sosialt.md',
		status: 'published'
	}
	// {
	// 	title: 'Example nested tree',
	// 	children: [
	// 		{
	// 			title: 'Example 1',
	// 			slug: 'example-1',
	// 			markdown: 'example.md',
	// 			status: 'draft'
	// 		}
	// 	]
	// }
];

export default tree;
