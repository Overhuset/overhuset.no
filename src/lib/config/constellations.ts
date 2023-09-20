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

export const posten = [
	...overhuset.filter((name) => name !== 'kodemaker'),
	'afry',
	'techfolk',
	'advansia',
	'variant',
	'redpill'
].sort();
