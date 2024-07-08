<script lang="ts">
	import { P } from 'flowbite-svelte';
	import { FlatToast, ToastContainer } from 'svelte-toasts';
	import ConstellationCard from './ConstellationCard.svelte';
	import HtmlRender from '$lib/components/common/HtmlRender.svelte';

	export let company;
	export let companies;
	export let constellations;
</script>

<div>
 	<P lineHeight="0" size="3xl" color="dark" weight="normal" style="margin-bottom:0.5rem">
		Velkommen til overhusets intranett
	</P>

	<P lineHeight="0" size="2xl" color="dark" weight="thin" style="margin-bottom:0.5rem">
		Her kan du se informasjon om hvilke konstellasjoner ditt selskap er med i og administrere dine faglige arrangementer
	</P>

	<br/>

	<P lineHeight="0" size="2xl" color="dark" weight="normal" style="margin-bottom:0.5rem">
		Om {company.name}
	</P>

	<P lineHeight="0" size="2xl" color="dark" weight="thin" style="margin-bottom:0.5rem">
		<HtmlRender htmlText={company?.description} />
 	</P>

	<br/>
	<br/>

	<P lineHeight="0" size="2xl" color="dark" weight="thin" style="margin-bottom:0.5rem">
 		{company.name} er med i følgende konstellasjoner:
	</P>

	<div class="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
		{#each constellations as constellation (constellation.id)}
			<ConstellationCard constellation={constellation} companies={companies}/>
		{/each}
	</div>

	<ToastContainer placement="bottom-right" let:data={data}>
		<FlatToast {data} />
	</ToastContainer>
</div>
