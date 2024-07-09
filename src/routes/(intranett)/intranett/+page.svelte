<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from './$types';
	import CompanyConstellations from '$lib/components/intranett/company-constellations/CompanyConstellations.svelte';

	export let data: PageData;

	const isPartner = !!data?.company?.partner;
</script>

<div class="prose prose-xl mx-auto p-4 md:py-20" style="max-width:140ch">
	{#if isPartner}
		<SvelteMarkdown source={data.content} />
	{:else}
		<CompanyConstellations
			company={data.company}
			companies={data.companies}
			constellations={data.constellations}
		/>
	{/if}
</div>
