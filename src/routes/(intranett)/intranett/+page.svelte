<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="prose prose-xl mx-auto">
	<SvelteMarkdown source={data.content} />
</div>
