<script lang="ts">
	import EventItem from './EventItem.svelte';
	import type { Event } from '$lib/types';
	import { Accordion } from '@skeletonlabs/skeleton';

	export let events: Event[];
	export let isInThePast = false;

</script>

<Accordion>
	  {#if events.length === 0 && isInThePast === true}
  		  <p class='text-center py-4'>{'Det er ingen tidligere arrangement å vise'}</p>
 		 {/if}
		 	  {#if events.length === 0 && isInThePast === false}
  		  <p class='text-center py-4'>{'Det er for tiden ingen planlagte fremtidige samlinger'}</p>
 		 {/if}
	<ul class="grid md:grid-cols-2 gap-4 mx-4 md:mx-0 items-start mb-12">
		
		 
		{#each events as event}
			<EventItem {event} {isInThePast} />
		{/each}
	</ul>
</Accordion>
