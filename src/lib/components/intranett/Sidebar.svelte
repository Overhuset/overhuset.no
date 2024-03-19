<script lang="ts">
	import { TreeView } from '@skeletonlabs/skeleton';
	import OhTreeViewItem from './OHTreeViewItem.svelte';
	import { getTree, type TreeItem } from '$lib/config/intranettNavigation';
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';

	let tree: TreeItem[] = [];

	export let loggedIn: boolean = false;
	onMount(() => {
		if (loggedIn) tree = getTree(!dev);
	});
</script>

<TreeView class="text-2xl">
	<h1 class="text-4xl pt-8 pl-8">Meny</h1>
	<hr class="border-[2px] border-white divider" />
	<OhTreeViewItem items={tree} loggedIn={loggedIn}/>
</TreeView>
