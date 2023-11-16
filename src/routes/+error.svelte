<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import IntranettHeader from '$lib/components/intranett/IntranettHeader.svelte';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import '../app.css';

	initializeStores();
	const isIntranett = $page.url.href.includes('intranett');
	const isWeb = !isIntranett;
</script>

{#if isWeb}
	<Header />
	<h1>Whoops</h1>
	<Footer />
{:else if isIntranett}
	<IntranettHeader />
	<h1>Intra whoops</h1>
{/if}
