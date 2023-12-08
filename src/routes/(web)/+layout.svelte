<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../../app.css';
	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<div data-theme="skeleton">
	<Header />
	<main class="flex flex-col items-stretch"><slot /></main>
	<Footer />
</div>
