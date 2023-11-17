<script lang="ts">
	import { AppBar, getDrawerStore } from '@skeletonlabs/skeleton';
	import { drawerSettings } from '$lib/config/drawerSettings';
	import { getTree, isLinkItem, type TreeItem } from '$lib/config/intranettNavigation';
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	const drawerStore = getDrawerStore();

	let tree: TreeItem[] = [];
	onMount(() => {
		tree = getTree(!dev);
	});
</script>

<AppBar
	gridColumns="grid-cols-3 "
	slotLead="text-4xl"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
>
	<svelte:fragment slot="lead">
		<button on:click={() => drawerStore.open(drawerSettings)}>🍔</button>
	</svelte:fragment>
	Overhusets Intranett
	<svelte:fragment slot="trail">Logg inn</svelte:fragment>
</AppBar>
