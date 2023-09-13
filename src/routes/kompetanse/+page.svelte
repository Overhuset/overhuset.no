<script lang="ts">
	import EventItem from '$lib/components/EventItem.svelte';
	import EventItemList from '$lib/components/EventItemList.svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';

	export let data;
	let tabSet = 0;
	console.log(data);
	const pastEvents = data.events.slice(0, 10);
	const futureEvents = data.events.slice(9, -1);

	console.log(pastEvents, futureEvents);
</script>

<section class="max-w-8xl mx-auto">
	<TabGroup class="w-full" justify="justify-around" border="" active="bg-stone-100 !rounded-t-lg">
		<Tab bind:group={tabSet} name="past" value={0}>
			<svelte:fragment slot="lead">Tidligere samlinger</svelte:fragment>
		</Tab>
		<Tab bind:group={tabSet} name="future" value={1}>
			<svelte:fragment slot="lead">Framtidige samlinger</svelte:fragment>
		</Tab>
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<EventItemList events={pastEvents} isInThePast={true} />
			{:else}
				<EventItemList events={futureEvents} />
			{/if}
		</svelte:fragment>
	</TabGroup>
</section>
