<script lang="ts">
	import EventCard from "../kurs_og_seminarer/EventCard.svelte";
	import {P} from "flowbite-svelte";

	export let data;
	const constellation = data.constellation;
	const companiesList = data.companiesList;
	const eventList = data.eventList;

</script>

<section class="max-w-6xl mx-auto md:w-5/5">
	<div class="prose mb-16 mt-8 mx-4" style="max-width:140ch">
		<P size="4xl" color="dark" class="dada">{constellation.name}</P>
		<P lineHeight="0" size="3xl" color="dark" weight="thin" style="margin-top: -3.5rem">
			{constellation.description}
		</P>

		<div class="rowDirection">
			{#each companiesList as company (company.id)}
				<img src={company.logoRef} alt="" class="w-1/12" />
			{/each}
		</div>

		{#each eventList as event (event.id)}
			<EventCard event={event} companies={companiesList}/>
		{/each}
	</div>
</section>

<style>
	.rowDirection {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		gap: 5rem;
		flex-wrap: wrap;
	}
</style>