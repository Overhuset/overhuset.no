<script lang="ts">
	import EventItemList from '$lib/components/EventItemList.svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';

	export let data;
	let tabSet = 0;
	const pastEvents = data.events.slice(0, 10);
	const futureEvents = data.events.slice(9, -1);
</script>

<section class="max-w-8xl mx-auto">
	<TabGroup class="w-full" justify="justify-around" active="bg-stone-100 !rounded-t-lg">
		<Tab bind:group={tabSet} name="past" value={0} class="w-1/2">
			<svelte:fragment slot="lead">Tidligere samlinger</svelte:fragment>
		</Tab>
		<Tab bind:group={tabSet} name="future" value={1} class="w-1/2">
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
