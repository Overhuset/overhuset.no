<script lang="ts">
	import {Accordion} from "@skeletonlabs/skeleton";
	import EventAccordionItem from "./EventAccordionItem.svelte";
	import {invalidateAll} from "$app/navigation";

	const api = '/api/event';
	const headers = {'content-type': 'application/json'};

	export let data;

	const handleNewEvent = async (title: string) => {
		if (title) {
			const body = JSON.stringify({ title, createdBy: data.email});
			const response = await fetch(api, {method: 'PUT', body, headers});
			if (response.status !== 200) alert("Endre feilet");
			invalidateAll();
		}
	}
	const handleChangeEvent = async (eventChanged: Event) => {
		if (eventChanged) {
			const body = JSON.stringify({...eventChanged});
			const response = await fetch(api, {method: 'PUT', body, headers});
			if (response.status !== 200) alert("Endre feilet");
			invalidateAll();
		}
	}

	const handleDeleteEvent = async (id: string) => {
		if (id) {
			const body = JSON.stringify(id);
			const response = await fetch(api, {method: 'DELETE', body, headers});
			if (response.status !== 200) alert("Sletting feilet");
			invalidateAll();
		}
	}

</script>

<div class="prose prose-xl mx-auto p-4 md:py-20" style="max-width:140ch">
	<h1>Administrer</h1>
	<h3>Seminarer, kurs og aktiviteter</h3>

	<Accordion>
		{#each (data.eventList || []) as event}
			<EventAccordionItem
				event={event}
				companies={data.companyList}
				onChange={handleChangeEvent}
				onDelete={handleDeleteEvent}
			/>
		{/each}
	</Accordion>
</div>



