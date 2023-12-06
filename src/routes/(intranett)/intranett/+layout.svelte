<script lang="ts">
	import '../../../app.css';
	import { AppShell, Drawer, initializeStores } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/intranett/Sidebar.svelte';
	import IntranettHeader from '$lib/components/intranett/IntranettHeader.svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { browser } from '$app/environment';

	initializeStores();

	export let data: LayoutData;

	onMount(() => {
		document.body.setAttribute('data-theme', 'vintage');
		document.body.setAttribute('class', 'dark');
	});
	onDestroy(() => {
		if (browser) {
			document.body.removeAttribute('data-theme');
			document.body.removeAttribute('class');
		}
	});
</script>

<Drawer>
	<Sidebar />
</Drawer>

<AppShell>
	<svelte:fragment slot="header">
		<IntranettHeader loggedIn={data.isLoggedIn} />
	</svelte:fragment>
	<slot />
</AppShell>
