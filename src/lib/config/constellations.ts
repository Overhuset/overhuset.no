export const overhuset = [
	'arktekk',
	'boitano',
	'edisys',
	'fink',
	'forse',
	'jpro',
	'kodemaker',
	'sannsyn',
	'uptime',
	'zenior'
];

export const overhusetDomains = [
	'arktekk.no',
	'boitano.no',
	'edisys.no',
	'fink.no',
	'forse.no',
	'jpro.no',
	'kodemaker.no',
	'sannsyn.com',
	'uptimeconsulting.no',
	'zenior.no'
];

export const posten = [
	...overhuset.filter((name) => name !== 'kodemaker'),
	'afry',
	'techfolk',
	'advansia',
	'variant',
	'redpill'
].sort();
