<script lang="ts">
	import type { IntranettItem } from '$lib/config/intranettItems';
	import { TreeViewItem } from '@skeletonlabs/skeleton';
	export let items: IntranettItem[];
</script>

{#each items as item}
	{#if item.children}
		<TreeViewItem>
			{item.title}
			<svelte:fragment slot="children">
				<svelte:self items={item.children} />
			</svelte:fragment>
		</TreeViewItem>
	{:else}
		<TreeViewItem>
			<a href={'/intranett/' + item.slug}>{item.title}</a>
		</TreeViewItem>
	{/if}
{/each}
