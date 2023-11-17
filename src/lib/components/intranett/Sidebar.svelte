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
	<div class="pt-8">
		<h1 class="text-4xl pl-8">Meny</h1>
		<hr />
		<a href="/intranett" class="mt-8 pl-4 block underline">Hjem</a>
	</div>
	<OhTreeViewItem items={tree} />
</TreeView>
