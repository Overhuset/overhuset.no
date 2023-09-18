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

type Company = { href: string; imgSrc: string; name: string };

export type CompanyWithComponent = {
	component: ComponentType<SvelteComponent<Company>>;
} & Company;

export const companies: CompanyWithComponent[] = [
	{
		href: 'https://www.arktekk.no',
		imgSrc: '/companies/arktekk_logo.png',
		name: 'Arktekk',
		component: Arktekk
	},
	{
		href: 'https://boitano.no',
		imgSrc: '/companies/boitano_logo.png',
		name: 'Boitano',
		component: Boitano
	},
	{
		href: 'https://www.edisys.no/',
		imgSrc: '/companies/edisys_logo.png',
		name: 'Edisys',
		component: Edisys
	},
	{
		href: 'https://www.fink.no/',
		imgSrc: '/companies/fink_logo.png',
		name: 'Fink',
		component: Fink
	},
	{
		href: 'https://www.forse.no/',
		imgSrc: '/companies/forse_logo.svg',
		name: 'Forse',
		component: Forse
	},
	{
		href: 'https://www.jpro.no/',
		imgSrc: '/companies/jpro_logo.png',
		name: 'Jpro',
		component: Jpro
	},
	{
		href: 'https://www.kodemaker.no/',
		imgSrc: '/companies/kodemaker_logo.png',
		name: 'Kodemaker',
		component: Kodemaker
	},
	{
		href: 'https://www.sannsyn.com/no',
		imgSrc: '/companies/sannsyn_logo.png',
		name: 'Sannsyn',
		component: Sannsyn
	},
	{
		href: 'https://www.uptime.no/',
		imgSrc: '/companies/uptime_logo.png',
		name: 'Uptime',
		component: Uptime
	},
	{
		href: 'https://www.zenior.no/',
		imgSrc: '/companies/zenior_logo.png',
		name: 'Zenior',
		component: Zenior
	}
];

export const getLogoFromCompanyName = (companyName: string) =>
	companies.find(({ name }) => name === companyName)?.imgSrc || '/companies/overhuset_logo.svg';
