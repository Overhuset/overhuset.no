<script lang="ts">
	import {Accordion} from "@skeletonlabs/skeleton";
	import EventAccordionItem from "./EventAccordionItem.svelte";
	import {invalidateAll} from "$app/navigation";

	const api = '/api/event';
	const headers = {'content-type': 'application/json'};

	export let data;


	const handleChangeEvent = async (eventChanged: Event) => {


		if (eventChanged) {
			console.log("handleChangeEvent: ", event);
			const body = JSON.stringify({...eventChanged});
			console.log("body: ", body);
			const response = await fetch(api, {method: 'PUT', body, headers});
			if (response.status !== 200) alert("Endre feilet");
			invalidateAll();
		}
	}

</script>

<div class="prose prose-xl mx-auto p-4 md:py-20" style="max-width:140ch">
	<h1>Administrer</h1>
	<h3>Seminarer, kurs og aktiviteter</h3>

	<Accordion>
		{#each (data.eventList || []) as event}
			<EventAccordionItem event={event} onChange={handleChangeEvent} />
		{/each}
	</Accordion>
</div>



