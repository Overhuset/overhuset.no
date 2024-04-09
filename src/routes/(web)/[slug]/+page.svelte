<script lang="ts">
	import EventCard from "$lib/components/common/EventCard.svelte";
	import {Button, ButtonGroup, P} from "flowbite-svelte";
	import {getIsPassed} from "$lib/utils/dateUtils";

	export let data;
	const constellation = data.constellation;
	const companiesList = data.companiesList;
	let filterMode: "all" | "upcoming" | "historic" | "online" = "all";
	const all = (data.eventList || []);
	const upcoming = (all.filter(event => !event.onlineCourse && !getIsPassed(event?.time)));
	const historic = (all.filter(event => !event.onlineCourse && getIsPassed(event?.time)));
	const online = (all.filter(event => event.onlineCourse));
</script>

<section class="max-w-6xl mx-auto md:w-5/5">
	<div class="prose mb-16 mt-8 mx-4" style="max-width:140ch">

		{@html constellation.logoRef}

		<P size="4xl" color="dark" class="dada">
			{constellation.name}
		</P>

		<P lineHeight="0" size="3xl" color="dark" weight="thin" style="margin-top: -3.5rem">
			{constellation.description}
		</P>

		<div>
		<div class="grid sm:grid-cols-3 md:grid-cols-4 md:gap-12">
			{#each companiesList as company (company.id)}
				<a href={`/konsulentselskap/${company?.nameShort?.toLowerCase()}`} class="flex justify-center items-center min-h-[160px] md:last:col-start-3 md:[&:nth-last-child(2)]:col-start-2">
 					<img src={company.logoRef} alt={company.name} class="w-1/2 md:w-28" />
				</a>
			{/each}
		</div>

		<br/>
		<br/>

		<P lineHeight="0" size="3xl" color="dark" weight="thin" style="margin-top: -3.5rem">
			{constellation.description2}
		</P>

		<ButtonGroup>
			<Button
					on:click={() => filterMode = "all"}
					checked={filterMode === "all"}>
				Alle ({data.eventList?.length || 0})
			</Button>
			<Button
					on:click={() => filterMode = "upcoming"}
					checked={filterMode === "upcoming"}>
				Kommende ({upcoming?.length || 0})
			</Button>
			<Button
					on:click={() => filterMode = "online"}
					checked={filterMode === "online"}>
				Online kurs ({online?.length || 0})
			</Button>
			<Button
					on:click={() => filterMode = "historic"}
					checked={filterMode === "historic"}
			>
				Historiske ({historic?.length || 0})
			</Button>
		</ButtonGroup>

		<br/>
		<br/>

		{#each (
				filterMode === "all" ? data.eventList :
						(filterMode === "upcoming" ? upcoming :
								(filterMode === "online" ? online :
										historic))) as event (event.id)}
			<EventCard event={event} companies={companiesList}/>
		{/each}
	</div>
</section>
