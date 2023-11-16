export type IntranettItem = {
	title: string;
	children?: IntranettItem[];
	slug?: string;
	markdown?: string;
};

const items: IntranettItem[] = [
	{
		title: 'Home',
		slug: '/',
		markdown: 'index.md'
	},
	{
		title: 'Informasjon',
		children: [
			{
				title: 'Kvalitetssystemer',
				slug: '/vare-kunder',
				markdown: 'quality-systems.md'
			},
			{
				title: 'Våre kunder',
				slug: '/vare-kunder'
			},
			{
				title: 'Våre kunder',
				slug: '/vare-kunder'
			},
			{
				title: 'Retningslinjer',
				slug: '/retningslinjer'
			}
		]
	},
	{
		title: 'Sosialt 🥳',
		slug: '/sosialt'
	},

	{
		title: 'Hva mer skal vi ha?',
		slug: '/meh'
	}
];

export default items;
