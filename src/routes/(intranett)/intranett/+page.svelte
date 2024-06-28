<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from './$types';
	import PartnerHome from '$lib/components/intranett/PartnerHome.svelte';
	export let data: PageData;
</script>

<div class="prose prose-xl mx-auto p-4 md:py-20">
	<PartnerHome
		company={data.company}
		constellationList={data.constellationList}
	/>

	<br/>
	<br/>
	<SvelteMarkdown source={data.content} />

</div>
