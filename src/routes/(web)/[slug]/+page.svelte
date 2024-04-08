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

		<div class="grid sm:grid-cols-3 md:grid-cols-4 md:gap-12">
			{#each companiesList as company (company.id)}
				<a href={`/konsulentselskap/${company?.nameShort?.toLowerCase()}`} class="flex justify-center items-center min-h-[160px] md:last:col-start-3 md:[&:nth-last-child(2)]:col-start-2">
 					<img src={company.logoRef} alt={company.name} class="w-1/2 md:w-28" />
				</a>
			{/each}
		</div>

		{#each eventList as event (event.id)}
			<EventCard event={event} companies={companiesList}/>
		{/each}
	</div>
</section>
