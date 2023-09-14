<script lang="ts">
	import EventItem from './EventItem.svelte';
	import type { Event } from '$lib/types';
	import { Accordion } from '@skeletonlabs/skeleton';

	export let events: Event[];
	export let isInThePast = false;
</script>

<Accordion>
	<ul class="grid md:grid-cols-2 gap-x-4 gap-y-2 items-start">
		{#each events as event}
			<EventItem {event} {isInThePast} />
		{/each}
	</ul>
</Accordion>
