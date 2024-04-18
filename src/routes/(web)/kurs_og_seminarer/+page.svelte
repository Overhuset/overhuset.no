<script lang="ts">
 	import { MetaTags } from 'svelte-meta-tags';
	import EventCard from "$lib/components/common/event-card/EventCard.svelte";
	import {getIsPassed} from "$lib/utils/dateUtils";
	import {ButtonGroup, Button, P} from 'flowbite-svelte';

	export let data;

	const companies = data.companies;
	const upcoming = ((data.eventList || []).filter(event => !event.onlineCourse && !getIsPassed(event?.time)));
	const historic = ((data.eventList || []).filter(event => !event.onlineCourse && getIsPassed(event?.time)));
	const online = ((data.eventList || []).filter(event => event.onlineCourse));

	let filterMode:  "upcoming" | "historic" | "online" = upcoming.length === 0 ? "historic" : "upcoming";

 </script>

 <section class="max-w-6xl mx-auto md:w-5/5">
	<MetaTags
	title='Overhuset - kurs og seminarer for IT-bransjen'
	description='Overhuset holder kurs og seminarer gjennom hele året, for å bidra til kompetanseheving for alle med
				interesse for IT og systemutvikling. Sjekk programmet her.'
    />

	<div class="prose mb-16 mt-8 mx-4" style="max-width:140ch">

		<P size="3xl" color="dark" weight="bold">
			Seminarer, kurs og aktiviteter på Overhuset
		</P>

		<P size="2xl" color="dark" weight="medium">
			Mens de dyktige konsulentene våre er opptatte av å bidra til kompetanseløft ute hos
			kundene våre, legger Overhuset som helhet til rette for faglig utvikling internt og for
			alle interesserte.

			Overhuset består av ti ulike konsulentselskaper, som alle besitter spisskompetanse og
			erfaring på hver sine fagområder. Sammen er vi faglig krutt – og det må selvsagt deles!
		</P>

		<P lineHeight="0" size="2xl" color="dark" weight="light">
			Her finner du en oversikt over alt som skjer. Påmeldingsinfo skal stå under hvert
			arrangement.
		</P>


		<br/>

		<div class="container">
			<ButtonGroup>
				<Button
						size="xl"
						on:click={() => filterMode = "upcoming"}
						checked={filterMode === "upcoming"}>
					Kommende ({upcoming?.length || 0})
				</Button>
				<Button
						size="xl"
						on:click={() => filterMode = "historic"}
						checked={filterMode === "historic"}
				>
					Tidligere ({historic?.length || 0})
				</Button>
			</ButtonGroup>

			<ButtonGroup>
				<Button
						size="xl"
						on:click={() => filterMode = "online"}
						checked={filterMode === "online"}>
					Online kurs ({online?.length || 0})
				</Button>
			</ButtonGroup>
		</div>


		<br/>
		<br/>

		<div class="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
			{#each (
				(filterMode === "upcoming" ? upcoming :
						(filterMode === "online" ? online :
								historic))) as event (event.id)}
				<EventCard event={event} companies={companies}/>
			{/each}
		</div>

		<br/>
		<br/>

	</div>


</section>

<style>
	.container {
		display: flex;
		justify-content: flex-start;
		gap: 1.5rem;
		wrap: flex-wrap;
	}
</style>

