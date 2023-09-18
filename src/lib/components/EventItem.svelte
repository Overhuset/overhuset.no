<script lang="ts">
	import { AccordionItem } from '@skeletonlabs/skeleton';
	import { getLogoFromCompanyName } from '$lib/components/companies';
	import type { Event } from '$lib/types';
	export let event: Event;

	export let isInThePast = false;
	const logo = getLogoFromCompanyName(event.company);
</script>

<AccordionItem class="bg-stone-100 rounded-xl w-full max-w-sm">
	<svelte:fragment slot="summary">
		<div class="flex items-center w-full">
			<img src={logo} alt="" class="w-20" />
			<div class="flex flex-col pl-4 py-4 font-source">
				<span class="font-light text-sm">{event?.date ?? 'TBA'}</span>
				<span class="font-bold">{event?.title ?? 'Sveltekit fagdag'}</span>
				<span class="font-light text-sm">
					{event?.company && event?.location
						? `${event?.company}, ${event?.location}`
						: 'Oslo @ Rebel'}
				</span>
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="px-4 pb-2 space-y-8">
			<p class="prose">
				{event?.description ??
					'Nå er det på tide med enda en lorem ipsum sim dum ting tar lang tid'}
			</p>
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
		</div>
	</svelte:fragment>
</AccordionItem>
