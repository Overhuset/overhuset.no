<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="prose prose-xl mx-auto mt-20">
	<SvelteMarkdown source={data.content} />
</div>
