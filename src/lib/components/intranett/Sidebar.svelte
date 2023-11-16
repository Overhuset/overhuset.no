<script lang="ts">
	import { TreeView } from '@skeletonlabs/skeleton';
	import OhTreeViewItem from './OHTreeViewItem.svelte';
	import intranettItems from '$lib/config/intranettItems';
</script>

<TreeView class="text-2xl">
	<div class="pt-8 pl-8">
		<h1 class="text-4xl">Meny</h1>
		<hr />
		<a href="/intranett" class="mt-8 block underline">Hjem</a>
	</div>
	<OhTreeViewItem items={intranettItems} />
</TreeView>
