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

<AppBar slotLead="text-2xl">
	<svelte:fragment slot="lead">
		<div class="flex gap-4">
			<button class="md:hidden" on:click={() => drawerStore.open(drawerSettings)}>🍔</button>
			<a href="/intranett" class="text-white">Overhusets Intranett</a>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<div class="hidden md:flex text-white gap-4 text-xl">
			{#each tree as item}
				{#if isLinkItem(item)}
					<a href={`/intranett/${item.slug}`}>{item.title}</a>
				{:else}
					{item.title} ⬇️
				{/if}
			{/each}
		</div>
	</svelte:fragment>
</AppBar>
