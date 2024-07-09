<script>
	import '../../app.css';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import Header from '$lib/components/web/Header.svelte';
	import Footer from '$lib/components/web/Footer.svelte';

	initializeStores();
</script>

<div data-theme="skeleton">
	<Header />
	<main class="flex flex-col items-stretch"><slot /></main>
	<Footer />
</div>
