<script lang="ts">
	import type { TreeItem } from '$lib/config/intranettNavigation';
	import { isGroupItem } from '$lib/config/intranettNavigation';
	import { TreeViewItem, getDrawerStore } from '@skeletonlabs/skeleton';

	export let items: TreeItem[];
	export let loggedIn: boolean = false;

	const drawerStore = getDrawerStore();

	function handleLinkClick() {
		drawerStore.close();
	}
</script>

{#each items as item}
	{#if isGroupItem(item)}
		<TreeViewItem>
			{item.title}
			<svelte:fragment slot="children">
				<svelte:self items={item.children} />
			</svelte:fragment>
		</TreeViewItem>
	{:else}
		<TreeViewItem>
			<a on:click={handleLinkClick} href={'/intranett/' + item.slug}>{item.title}</a>
		</TreeViewItem>
	{/if}
{/each}

{#if loggedIn}
	<TreeViewItem>
		<a href={`/intranett/ledig`}>Ledige konsulenter</a>
	</TreeViewItem>
	<TreeViewItem>
	<a href={`/intranett/vedlikehold_kurs_og_seminarer`}>Administrer</a>
	</TreeViewItem>
{/if}
