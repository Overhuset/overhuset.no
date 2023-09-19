<script lang="ts">
	import Events from '$lib/components/Events.svelte';

	export let data;
	const pastEvents = data.pastEvents;
	const futureEvents = data.futureEvents;
</script>

<section class="max-w-8xl mx-auto">
	<div class="prose mb-16 mt-8 mx-4">
		<h1>Fagarrangement</h1>
		<p>
			Her kan du få et innblikk i de forskjellige aktivitetene, arrangementene og hendelsene
			Overhuset gjennomfører i løpet av året. Vi legger vekt på å dele kunnskap, inspirere og
			engasjere.
		</p>
		<p>Ta en titt og se hva som skjer hos oss!</p>
	</div>
	<Events {pastEvents} {futureEvents} />
</section>
