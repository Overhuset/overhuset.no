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

// External companies that are part of constellations
import Afry from '$lib/components/companies/Afry.svelte';
import Advansia from '$lib/components/companies/Advansia.svelte';
import Redpill from '$lib/components/companies/Redpill.svelte';
import Techfolk from '$lib/components/companies/Techfolk.svelte';
import Variant from '$lib/components/companies/Variant.svelte';

import { get } from 'radash';
import { overhuset } from '$lib/config/constellations';

type Company = { href: string; slug: string; imgSrc: string; name: string };

export type CompanyWithComponent = {
	component: ComponentType<SvelteComponent<Company>>;
} & Company;

export const companies: Record<string, CompanyWithComponent> = {
	advansia: {
		href: 'https://www.advansia.no/',
		imgSrc: '/companies/advansia_logo.svg',
		name: 'Advansia',
		slug: 'advansia',
		component: Advansia
	},
	afry: {
		href: 'https://afry.com/no-no',
		imgSrc: '/companies/afry_logo.png',
		name: 'Afry',
		slug: 'afry',
		component: Afry
	},
	arktekk: {
		href: 'https://www.arktekk.no',
		imgSrc: '/companies/arktekk_logo.png',
		name: 'Arktekk',
		slug: 'arktekk',
		component: Arktekk
	},
	boitano: {
		href: 'https://boitano.no',
		imgSrc: '/companies/boitano_logo.svg',
		name: 'Boitano',
		slug: 'boitano',
		component: Boitano
	},
	edisys: {
		href: 'https://www.edisys.no/',
		imgSrc: '/companies/edisys_logo.png',
		name: 'Edisys',
		slug: 'edisys',
		component: Edisys
	},
	fink: {
		href: 'https://www.fink.no/',
		imgSrc: '/companies/fink_logo.png',
		name: 'Fink',
		slug: 'fink',
		component: Fink
	},
	forse: {
		href: 'https://www.forse.no/',
		imgSrc: '/companies/forse_logo.svg',
		name: 'Forse',
		slug: 'forse',
		component: Forse
	},
	jpro: {
		href: 'https://www.jpro.no/',
		imgSrc: '/companies/jpro_logo.png',
		name: 'Jpro',
		slug: 'jpro',
		component: Jpro
	},
	kodemaker: {
		href: 'https://www.kodemaker.no/',
		imgSrc: '/companies/kodemaker_logo.png',
		name: 'Kodemaker',
		slug: 'kodemaker',
		component: Kodemaker
	},
	redpill: {
		href: 'https://www.redpill-linpro.com/no',
		imgSrc: '/companies/redpill_logo.svg',
		name: 'Redpill Linpro',
		slug: 'redpill',
		component: Redpill
	},
	sannsyn: {
		href: 'https://www.sannsyn.com/no',
		imgSrc: '/companies/sannsyn_logo.png',
		name: 'Sannsyn',
		slug: 'sannsyn',
		component: Sannsyn
	},
	techfolk: {
		href: 'https://www.techfolk.no/',
		imgSrc: '/companies/techfolk_logo.svg',
		name: 'Techfolk',
		slug: 'techfolk',
		component: Techfolk
	},
	uptime: {
		href: 'https://www.uptime.no/',
		imgSrc: '/companies/uptime_logo.png',
		name: 'Uptime',
		slug: 'uptime',
		component: Uptime
	},
	variant: {
		href: 'https://www.variant.no/',
		imgSrc: '/companies/variant_logo.svg',
		name: 'Variant',
		slug: 'variant',
		component: Variant
	},
	zenior: {
		href: 'https://www.zenior.no/',
		imgSrc: '/companies/zenior_logo.png',
		name: 'Zenior',
		slug: 'zenior',
		component: Zenior
	}
};

export const getLogoFromCompanyName = (companyName: string) =>
	get(companies, `${companyName.toLowerCase()}.imgSrc`, '/companies/overhuset_logo.svg');

export const getConstellation = (companyNames: string[] = overhuset) =>
	companyNames.map((name) => companies[name]).filter(Boolean);
