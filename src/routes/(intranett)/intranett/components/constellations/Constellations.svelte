<script lang="ts">
	import { P } from 'flowbite-svelte';
	import { FlatToast, ToastContainer } from 'svelte-toasts';
	import ConstellationCard from './ConstellationCard.svelte';

	export let company;
	export let constellationList;
</script>

<div>
	<P size="3xl" color="dark">{company.name}</P>
	<P lineHeight="0" size="2xl" color="dark" weight="thin" style="margin-bottom:0.5rem">
		Velkommen til overhusets intranett, her kan du se informasjon om hvilke konstellasjoner ditt selskap er med i og administrere dine faglige arrangementer
		{company.name} er med i følgende konstellasjoner:
	</P>

	<br/>

	<div class="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
		{#each constellationList as constellation (constellation.id)}
			<ConstellationCard constellation={constellation}/>
		{/each}
	</div>

	<ToastContainer placement="bottom-right" let:data={data}>
		<FlatToast {data} />
	</ToastContainer>
</div>
