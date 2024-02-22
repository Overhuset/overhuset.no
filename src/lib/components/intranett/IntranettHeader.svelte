<script lang="ts">
	import { AppBar, getDrawerStore } from '@skeletonlabs/skeleton';
	import { drawerSettings } from '$lib/config/drawerSettings';
	import { getTree, isLinkItem, type TreeItem } from '$lib/config/intranettNavigation';
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	const drawerStore = getDrawerStore();

	let tree: TreeItem[] = [];
	export let loggedIn: boolean = false;
	onMount(() => {
		if (loggedIn) tree = getTree(!dev);
		else tree = [];
	});
</script>

<AppBar slotLead="text-2xl">
	<svelte:fragment slot="lead">
		<div class="flex gap-4">
			{#if loggedIn}
				<button class="md:hidden" on:click={() => drawerStore.open(drawerSettings)}>🍔</button>
			{/if}
			<a href="/intranett" class="text-white">Overhusets Intranett</a>
		</div>
	</svelte:fragment>
	<div class="hidden md:flex text-white gap-4 text-xl justify-end">
		{#each tree as item}
			{#if isLinkItem(item)}
				<a href={`/intranett/${item.slug}`}>{item.title}</a>
			{:else}
				{item.title}
			{/if}
		{/each}

		{#if loggedIn}
			<a href={`/intranett/ledig`}>Ledige konsulenter</a>
		{/if}
	</div>
	<svelte:fragment slot="trail">
		{#if loggedIn}
			<form method="post" action="/intranett?/logout" use:enhance>
				<input type="submit" value="Logg ut" class="cursor-pointer rounded-lg bg-white px-2 py-1" />
			</form>
		{/if}
	</svelte:fragment>
</AppBar>
