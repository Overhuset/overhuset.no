<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import '../app.css';
	import { page } from '$app/stores';

	initializeStores();
	const isIntranett = $page.url.href.split('/').includes('intranett');
	const isWeb = !isIntranett;
</script>

{#if isWeb}
	<Header />
	<div class="w-full flex flex-col gap-8 items-center my-auto">
		<h1 class="h1 text-5xl">404</h1>
		<p class="text-3xl">Fant ikke denne siden gitt</p>
		<a class="text-xl underline" href="/">Gå tilbake til start og prøv igjen</a>
	</div>
	<Footer />
{:else if isIntranett}
	<slot />
{/if}
