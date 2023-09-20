<script>
	import Events from '$lib/components/Events.svelte';

	export let data;
	const pastEvents = data.pastEvents;
	const futureEvents = data.futureEvents;
</script>

<section class="max-w-4xl mx-auto mb-8 md:w-4/5">
	<button on:click={() => window.history.back()}>&larr; Tilbake</button>
	<div class="prose mb-16 mt-8 mx-4">
		<h1>Fagarrangement for:</h1>
		<img src="/assets/posten_logo.png" alt="" class="md:w-2/5" />
		<p>
			Her kan du få et innblikk i de forskjellige aktivitetene, arrangementene og hendelsene
			Overhuset og andre samarbeidspartnere i rammeavtalen gjennomfører i løpet av året. Vi legger
			vekt på å dele kunnskap, inspirere og engasjere.
		</p>
		<p>Ta en titt og se hva som skjer hos oss!</p>
	</div>
	<Events {futureEvents} {pastEvents} />
</section>
