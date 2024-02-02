<script>
	import { getContext } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../../app.css';
	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();

	// Liste over ruter som ikke skal ha Header og Footer
	const routesWithoutHeaderFooter = ['/kino'];
	// Hent routen fra Svelte Context
	const route = getContext('routing')?.route;
	// Sjekk om den gjeldende ruten er i listen over ruter uten Header og Footer
	const shouldRenderHeaderFooter = route ? !routesWithoutHeaderFooter.includes(route) : false;

</script>

<div data-theme="skeleton">
	{#if shouldRenderHeaderFooter}
		<Header />
	{/if}
	<main class="flex flex-col items-stretch"><slot /></main>
	{#if shouldRenderHeaderFooter}
		<Footer />
	{/if}
</div>