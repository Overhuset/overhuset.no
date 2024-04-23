<script lang="ts">
 	import { MetaTags } from 'svelte-meta-tags';
	import {P} from 'flowbite-svelte';
	import Events from "$lib/components/common/events/Events.svelte";

	export let data;
 </script>

 <section class="max-w-6xl mx-auto md:w-5/5 mt-10">
	<MetaTags
	title='Overhuset - kurs og seminarer for IT-bransjen'
	description='Overhuset holder kurs og seminarer gjennom hele året, for å bidra til kompetanseheving for alle med
				interesse for IT og systemutvikling. Sjekk programmet her.'
    />

	<div class="prose mb-16 mt-8 mx-4" style="max-width:140ch">

		<P size="3xl" color="dark" weight="bold">
			Seminarer, kurs og aktiviteter på Overhuset
		</P>

		<P size="2xl" color="dark" weight="medium">
			Mens de dyktige konsulentene våre er opptatte av å bidra til kompetanseløft ute hos
			kundene våre, legger Overhuset som helhet til rette for faglig utvikling internt og for
			alle interesserte.

			Overhuset består av ti ulike konsulentselskaper, som alle besitter spisskompetanse og
			erfaring på hver sine fagområder. Sammen er vi faglig krutt – og det må selvsagt deles!
		</P>

		<P lineHeight="0" size="2xl" color="dark" weight="light">
			Her finner du en oversikt over alt som skjer. Påmeldingsinfo skal stå under hvert
			arrangement.
		</P>

		<br/>
		<Events data={data} />
		<br/>
		<br/>

	</div>
</section>

