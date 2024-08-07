<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<div class="prose prose-xl mx-auto p-4 md:py-20" style="max-width:140ch">
	<SvelteMarkdown source={data.content} />
</div>
