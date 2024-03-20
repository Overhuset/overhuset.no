<script lang="ts">
 	import { MetaTags } from 'svelte-meta-tags';
	import EventCard from "./EventCard.svelte";
	import {getIsPassed} from "$lib/utils/dateUtils";
	import { ButtonGroup, Button } from 'flowbite-svelte';

	export let data;

	let filterMode: "all" | "upcoming" | "historic" | "online" = "all";
	const all = (data.eventList || []);
	const upcoming = (all.filter(event => !event.onlineCourse && !getIsPassed(event?.time)));
	const historic = (all.filter(event => !event.onlineCourse && getIsPassed(event?.time)));
	const online = (all.filter(event => event.onlineCourse));
 </script>

 <section class="max-w-6xl mx-auto md:w-5/5">
	<MetaTags
	title='Overhuset - kurs og seminarer for IT-bransjen'
	description='Overhuset holder kurs og seminarer gjennom hele året, for å bidra til kompetanseheving for alle med
				interesse for IT og systemutvikling. Sjekk programmet her.'
    />

	<div class="prose mb-16 mt-8 mx-4" style="max-width:140ch">
		<h1>Seminarer, kurs og aktiviteter på Overhuset</h1>
		<p class="font-bold">
			Mens de dyktige konsulentene våre er opptatte av å bidra til kompetanseløft ute hos
			kundene våre, legger Overhuset som helhet til rette for faglig utvikling internt og for
			alle interesserte.
		</p>
		<p>
			Overhuset består av ti ulike konsulentselskaper, som alle besitter spisskompetanse og
			erfaring på hver sine fagområder. Sammen er vi faglig krutt – og det må selvsagt deles!
		</p>
		<p>Her finner du en oversikt over alt som skjer. Påmeldingsinfo skal stå under hvert
			arrangement. Skulle du likevel lure på noe, ikke nøl med <a href="/#kontakt" class="underline"> å ta kontakt</a>.
		</p>

		<br/>

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
			<EventCard event={event} />
		{/each}
	</div>


</section>

