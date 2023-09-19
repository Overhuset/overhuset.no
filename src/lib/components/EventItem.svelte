<script lang="ts">
	import { AccordionItem } from '@skeletonlabs/skeleton';
	import { getLogoFromCompanyName } from '$lib/components/companies';
	import type { Event } from '$lib/types';
	export let event: Event;

	export let isInThePast = false;
	const logo = getLogoFromCompanyName(event.company);
</script>

<AccordionItem class="border-2 rounded-md w-full max-w-sm">
	<svelte:fragment slot="summary">
		<div class="flex items-center w-full h-28">
			<img src={logo} alt="" class="w-20" />
			<div class="flex flex-col pl-4 py-4 font-source">
				<span class="font-light text-sm">{event?.date ?? 'TBA'}</span>
				<span class="font-bold">{event?.title ?? 'Sveltekit fagdag'}</span>
				<span class="font-light text-sm">
					{event?.company && event?.location
						? `${event?.company}, ${event?.location}`
						: 'Oslo @ Rebel'}
				</span>
				{#if event?.openFor}
					<span class="font-light text-sm">
						Åpen for eksterne: <strong>{event.openFor === 'external' ? '✅' : 'Nei'}</strong>
					</span>
				{/if}
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="px-4 pb-2 space-y-8">
			{#if event?.description}
				<p class="prose whitespace-break-spaces">
					{event.description}
				</p>
			{/if}
			<!-- If event is in the past, and there exists a presentation link, show it. Otherwise show registration link if it exists -->
			{#if (!isInThePast && event?.registrationLink) || (isInThePast && event?.presentationLink)}
				<p class="flex justify-end gap-2">
					{isInThePast ? 'Se presentasjon her:' : 'Påmelding:'}
					<a
						href={(isInThePast ? event?.presentationLink : event?.registrationLink) ??
							'https://vg.no/'}
						class="underline font-bold"
					>
						Trykk her
					</a>
				</p>
			{/if}
		</div>
	</svelte:fragment>
</AccordionItem>
