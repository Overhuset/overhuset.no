<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from './$types';
	import Constellations from './components/constellations/Constellations.svelte';
  	export let data: PageData;
</script>

<div class="prose prose-xl mx-auto p-4 md:py-20" style="max-width:140ch">
	{#if !data?.company?.partner}
		<SvelteMarkdown source={data.content} />
	{:else}
		<Constellations
			company={data.company}
			constellationList={data.constellationList}
		/>
	{/if}
</div>
