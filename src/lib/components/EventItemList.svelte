<script lang="ts">
	import EventItem from './EventItem.svelte';
	import type { Event } from '$lib/types';
	import { Accordion } from '@skeletonlabs/skeleton';

	export let events: Event[];
	export let isInThePast = false;
</script>

<Accordion>
	<ul class="grid md:grid-cols-2 gap-4 mx-4 md:mx-0 justify-center items-start mb-12">
		{#each events as event}
			<EventItem {event} {isInThePast} />
		{/each}
	</ul>
</Accordion>
