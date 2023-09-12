<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/header.svelte';
	import '../app.css';
	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();
</script>

<Header />
<slot />
<Footer />
