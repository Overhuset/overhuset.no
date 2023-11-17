<script lang="ts">
	import '../../../app.css';
	import { AppShell, Drawer, initializeStores } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/intranett/Sidebar.svelte';
	import IntranettHeader from '$lib/components/intranett/IntranettHeader.svelte';
	import { onMount } from 'svelte';

	initializeStores();

	onMount(() => {
		document.body.setAttribute('data-theme', 'vintage');
		document.body.setAttribute('class', 'dark');
	});
</script>

<Drawer>
	<Sidebar />
</Drawer>

<AppShell>
	<svelte:fragment slot="header">
		<IntranettHeader />
	</svelte:fragment>
	<slot />
</AppShell>
