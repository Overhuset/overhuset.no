<script lang="ts">
	import { initializeStores } from '@skeletonlabs/skeleton';
	import '../app.css';
	import { page } from '$app/stores';
 	import Header from '$lib/components/web/Header.svelte';
	import Footer from '$lib/components/web/Footer.svelte';

	initializeStores();
	const isIntranett = $page.url.href.split('/').includes('intranett');
</script>

{#if isIntranett}
	<slot />
{:else}
	<Header />
		<div class="w-full flex flex-col gap-8 items-center my-auto">
			<h1 class="h1 font-bold text-5xl">{$page.status}</h1>
			<p class="text-3xl">{$page.error?.message}</p>
			<p class="text-xl">
				<a class="text-xl underline" href="/">Gå Hjem</a>
			</p>
		</div>
	<Footer />
{/if}
