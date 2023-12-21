<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import EventItemList from '$lib/components/EventItemList.svelte';
	import type { Event } from '$lib/types';
	let tabSet = 2;

	export let pastEvents: Event[];
	export let futureEvents: Event[];
	export let onlineCourses: Event[];
</script>

<TabGroup
	class="w-full max-w-5xl mx-auto"
	padding="pt-2 pb-1 px-4"
	rounded="rounded-t-lg"
	justify="justify-around"
	active="bg-[#3a2417] text-white"
>
	<Tab bind:group={tabSet} name="past" value={0} class="w-1/3">
		<svelte:fragment slot="lead">Tidligere samlinger</svelte:fragment>
	</Tab>
	<Tab bind:group={tabSet} name="onlineCourses" value={1} class="w-1/3">
		<svelte:fragment slot="lead">Online kurs</svelte:fragment>
	</Tab>
	<Tab bind:group={tabSet} name="future" value={2} class="w-1/3">
		<svelte:fragment slot="lead">Framtidige samlinger</svelte:fragment>
	</Tab>
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<EventItemList events={pastEvents} isInThePast={true} eventType='past' />
		{:else if tabSet === 1}
			<EventItemList events={onlineCourses} eventType='online'/>
		{:else}
			<EventItemList events={futureEvents} eventType='future'/>
		{/if}
	</svelte:fragment>
</TabGroup>
