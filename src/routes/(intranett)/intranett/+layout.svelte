<script lang="ts">
	import { onMount } from 'svelte';
	import '../../../app.css';
	import { AppShell, Drawer, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/intranett/Sidebar.svelte';
	import IntranettHeader from '$lib/components/intranett/IntranettHeader.svelte';
	import { drawerSettings } from '$lib/config/drawerSettings';

	initializeStores();

	const drawerStore = getDrawerStore();

	// onMount(() => {
	// 	drawerStore.open(drawerSettings);
	// });
</script>

<Drawer>
	<Sidebar />
</Drawer>

<AppShell>
	<svelte:fragment slot="header"><IntranettHeader /></svelte:fragment>
	<slot />
</AppShell>
