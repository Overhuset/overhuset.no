import type { ComponentType, SvelteComponent } from 'svelte';
import Arktekk from '$lib/components/companies/Arktekk.svelte';
import Boitano from '$lib/components/companies/Boitano.svelte';
import DeepInsight from '$lib/components/companies/DeepInsight.svelte';
import Edisys from '$lib/components/companies/Edisys.svelte';
import Fink from '$lib/components/companies/Fink.svelte';
import Forse from '$lib/components/companies/Forse.svelte';
import Jpro from '$lib/components/companies/Jpro.svelte';
import Kodemaker from '$lib/components/companies/Kodemaker.svelte';
import Miles from '$lib/components/companies/Miles.svelte';
import Uptime from '$lib/components/companies/Uptime.svelte';
import Zenior from '$lib/components/companies/Zenior.svelte';

type Company = { href: string; imgSrc: string; name: string };

export type CompanyWithComponent = {
	component: ComponentType<SvelteComponent<Company>>;
} & Company;

export const companies: CompanyWithComponent[] = [
	{
		href: 'https://www.arktekk.no',
		imgSrc: 'https://www.overhuset.no/images/companies/logo_arktekk.png',
		name: 'Arktekk',
		component: Arktekk
	},
	{
		href: 'https://boitano.no',
		imgSrc: 'https://www.overhuset.no/images/companies/logo_boitano.png',
		name: 'Boitano',
		component: Boitano
	},
	{
		href: 'https://www.deepinsight.no/',
		imgSrc: 'https://www.overhuset.no/images/companies/logo_deepinsight.png',
		name: 'Deepinsight',
		component: DeepInsight
	},
	{
		href: 'https://www.edisys.no/',
		imgSrc: 'https://www.overhuset.no/images/companies/logo_edisys_consulting.png',
		name: 'Edisys Consulting',
		component: Edisys
	},
	{
		href: 'https://www.fink.no/',
		imgSrc: 'https://www.overhuset.no/images/companies/logo_fink.png',
		name: 'Fink',
		component: Fink
	},
	{
		href: 'https://www.forse.no/',
		imgSrc: 'https://www.overhuset.no/images/companies/forse-2.svg',
		name: 'Forse',
		component: Forse
	},
	{
		href: 'https://www.jpro.no/',
		imgSrc: 'https://www.overhuset.no/images/companies/logo_jpro.png',
		name: 'Jpro',
		component: Jpro
	},
	{
		href: 'https://www.miles.no/',
		imgSrc: 'https://www.overhuset.no/images/companies/logo_miles.png',
		name: 'Miles',
		component: Miles
	},
	{
		href: 'https://www.kodemaker.no/',
		imgSrc: 'https://www.overhuset.no/images/companies/logo_kodemaker.png',
		name: 'Kodemaker',
		component: Kodemaker
	},
	{
		href: 'https://www.uptime.no/',
		imgSrc: 'https://www.overhuset.no/images/companies/logo_uptime_consulting.png',
		name: 'Uptime',
		component: Uptime
	},
	{
		href: 'https://www.zenior.no/',
		imgSrc: 'https://www.overhuset.no/images/companies/logo_zenior.png',
		name: 'Zenior',
		component: Zenior
	}
];