import type { ComponentType, SvelteComponent } from 'svelte';
import Arktekk from '$lib/components/companies/Arktekk.svelte';
import Boitano from '$lib/components/companies/Boitano.svelte';
import Sannsyn from '$lib/components/companies/Sannsyn.svelte';
import Edisys from '$lib/components/companies/Edisys.svelte';
import Fink from '$lib/components/companies/Fink.svelte';
import Forse from '$lib/components/companies/Forse.svelte';
import Jpro from '$lib/components/companies/Jpro.svelte';
import Kodemaker from '$lib/components/companies/Kodemaker.svelte';
import Uptime from '$lib/components/companies/Uptime.svelte';
import Zenior from '$lib/components/companies/Zenior.svelte';
import { get, objectify } from 'radash';

type Company = { href: string; slug: string; imgSrc: string; name: string };

export type CompanyWithComponent = {
	component: ComponentType<SvelteComponent<Company>>;
} & Company;

export const companies: CompanyWithComponent[] = [
	{
		href: 'https://www.arktekk.no',
		imgSrc: '/companies/arktekk_logo.png',
		name: 'Arktekk',
		slug: 'arktekk',
		component: Arktekk
	},
	{
		href: 'https://boitano.no',
		imgSrc: '/companies/boitano_logo.png',
		name: 'Boitano',
		slug: 'boitano',
		component: Boitano
	},
	{
		href: 'https://www.edisys.no/',
		imgSrc: '/companies/edisys_logo.png',
		name: 'Edisys',
		slug: 'edisys',
		component: Edisys
	},
	{
		href: 'https://www.fink.no/',
		imgSrc: '/companies/fink_logo.png',
		name: 'Fink',
		slug: 'fink',
		component: Fink
	},
	{
		href: 'https://www.forse.no/',
		imgSrc: '/companies/forse_logo.svg',
		name: 'Forse',
		slug: 'forse',
		component: Forse
	},
	{
		href: 'https://www.jpro.no/',
		imgSrc: '/companies/jpro_logo.png',
		name: 'Jpro',
		slug: 'jpro',
		component: Jpro
	},
	{
		href: 'https://www.kodemaker.no/',
		imgSrc: '/companies/kodemaker_logo.png',
		name: 'Kodemaker',
		slug: 'kodemaker',
		component: Kodemaker
	},
	{
		href: 'https://www.sannsyn.com/no',
		imgSrc: '/companies/sannsyn_logo.png',
		name: 'Sannsyn',
		slug: 'sannsyn',
		component: Sannsyn
	},
	{
		href: 'https://www.uptime.no/',
		imgSrc: '/companies/uptime_logo.png',
		name: 'Uptime',
		slug: 'uptime',
		component: Uptime
	},
	{
		href: 'https://www.zenior.no/',
		imgSrc: '/companies/zenior_logo.png',
		name: 'Zenior',
		slug: 'zenior',
		component: Zenior
	}
];

export const companiesAsObject: Record<string, CompanyWithComponent> = objectify(
	companies,
	(c) => c.slug,
	(c) => c
);

export const getLogoFromCompanyName = (companyName: string) =>
	get(companiesAsObject, `${companyName.toLowerCase()}.imgSrc`, '/companies/overhuset_logo.svg');
