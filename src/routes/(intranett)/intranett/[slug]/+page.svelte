<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<div class="prose mx-auto py-20">
	<SvelteMarkdown source={data.content} />
</div>
