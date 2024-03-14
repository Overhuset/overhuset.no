<script lang="ts">
 	import { MetaTags } from 'svelte-meta-tags';
	import EventCard from "./EventCard.svelte";
	import {getIsPassed} from "$lib/utils/dateUtils";
	import Button from "$lib/components/common/Button.svelte";

	export let data;

	const eventsUpcoming = data.eventList.filter(event => !event.onlineCourse && !getIsPassed(event?.time));
	const eventsPassed = data.eventList.filter(event => !event.onlineCourse && getIsPassed(event?.time));
	const onlineEvents = data.eventList.filter(event => event.onlineCourse);
	let showEventsUpcoming = true;
	let showOnlineEvents = true;
	let showEventsPassed = true;
 </script>

<section class="max-w-6xl mx-auto md:w-4/5">
	<MetaTags
	title='Overhuset - kurs og seminarer for IT-bransjen'
	description='Overhuset holder kurs og seminarer gjennom hele året, for å bidra til kompetanseheving for alle med
				interesse for IT og systemutvikling. Sjekk programmet her.'
    />
	<div class="prose mb-16 mt-8 mx-4">
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
           arrangement. Skulle du likevel lure på noe, ikke nøl med <a href="/#kontakt" class="underline"> å ta kontakt!</a></p>
	</div>

	<Button
		variant={showEventsUpcoming ? "primary" : "none"}
		onClick={() => showEventsUpcoming = !showEventsUpcoming}
	>
		Kommende ({eventsUpcoming?.length || 0})
	</Button>

	<Button
		variant={showOnlineEvents ? "primary" : "none"}
		onClick={() => showOnlineEvents = !showOnlineEvents}
	>
		Online kurs ({onlineEvents?.length || 0})
	</Button>

	<Button
		variant={showEventsPassed ? "primary" : "none"}
		onClick={() => showEventsPassed = !showEventsPassed}
	>
		Historiske ({eventsPassed?.length || 0})
	</Button>

	<br/>
	<br/>

	{#if showEventsUpcoming}
		{#each eventsUpcoming as event}
			<EventCard event={event} />
		{/each}
	{/if}

	{#if showOnlineEvents}
		{#each onlineEvents as event}
			<EventCard event={event} />
		{/each}
	{/if}

	{#if showEventsPassed}
		{#each eventsPassed as event}
			<EventCard event={event} />
		{/each}
	{/if}

</section>

