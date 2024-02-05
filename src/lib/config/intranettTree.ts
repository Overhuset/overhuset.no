import type { TreeItem } from './intranettNavigation';

const tree: TreeItem[] = [
	{
		title: 'Hjem',
		slug: '',
		markdown: 'index.html',
		status: 'draft'
	},
	{
		title: 'Kvalitetssystem',
		slug: 'kvalitetssystem',
		markdown: 'kvalitetssystem.md',
		status: 'published'
	},
	{
		title: 'Rammeavtaler',
		slug: 'rammeavtaler',
		markdown: 'rammeavtaler.md',
		status: 'published'
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
		status: 'published'
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
