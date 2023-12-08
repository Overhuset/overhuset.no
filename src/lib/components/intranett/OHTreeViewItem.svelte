<script lang="ts">
	import type { TreeItem } from '$lib/config/intranettNavigation';
	import { isGroupItem } from '$lib/config/intranettNavigation';
	import { TreeViewItem, getDrawerStore } from '@skeletonlabs/skeleton';
	export let items: TreeItem[];
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
