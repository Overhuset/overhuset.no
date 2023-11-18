<script lang="ts">
	import { TreeView } from '@skeletonlabs/skeleton';
	import OhTreeViewItem from './OHTreeViewItem.svelte';
	import { getTree } from '$lib/config/intranettNavigation';
	import { onMount } from 'svelte';
	import type { TreeItem } from '$lib/config/intranettItems';

	let tree: TreeItem[] = [];
	onMount(() => {
		tree = getTree(false);
	});
</script>

<TreeView class="text-2xl">
	<h1 class="text-4xl pt-8 pl-8">Meny</h1>
	<hr class="border-[2px] border-white divider" />
	<OhTreeViewItem items={tree} />
</TreeView>
