<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<div class="prose mx-auto py-4 md:py-20 px-4">
	<SvelteMarkdown source={data.content} />
</div>
