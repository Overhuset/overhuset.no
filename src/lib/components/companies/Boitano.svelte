<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	  <MetaTags
		title='Boitano - en del av konsulentselskapet Overhuset'
		description='Boitano er 1 av 10 partnere i konsulentselskapet Overhuset. Her er de beste samlet under ett
					 tak. Sammen leverer de tjenester i full bredde, på høyeste nivå.'
    />
	<h1>Erfarne utviklere – ledende på teknologi</h1>
	<p class='font-bold'>Boitano tilbyr erfarne utviklere med stor faglig kapasitet og en god porsjon
	   entreprenørskapsånd. Det blir det spennende leveranser av!
	</p>
	<p>
		Konsulentselskapet har ekspertise innen et bredt spekter av teknologi, og tilbyr det beste av det
		beste innenfor sine felt. Kunder som jobber med Boitano-konsulenter, vet hvor mye menneskene
		bak teknologien betyr.
	</p>
	<h2>Smarte digitale løsninger</h2>
	<p>Boitano tilbyr systemutviklere til krevende og forretningskritiske utfordringer, og prosjektene ligger
		langt fremme i bruk av teknologi. Samtidig er de opptatte av at de riktige løsningene blir valgt og
		gjennomført, i tråd med <a href="/kvalitet_i_alle_ledd">våre retningslinjer for kvalitet.</a>
	 </p>

	 <p class='py-4'>
		Høyt faglig engasjement, arbeidskapasitet og god stemning er en del av pakka når du får en
		Boitano-konsulent til ditt utviklingsprosjekt.
	 </p>
	 <h2>Utvikling, fremdrift og prosess</h2>
	 <p>Boitano leverer tjenester innen .Net-utvikling, arkitektur og interaksjonsdesign, i tillegg til ulike tek-
		løsninger. De har også bred ekspertise innen konsept- og forretningsutvikling, samt prosess- og
		personalledelse. Kort sagt; med over 50 dyktige konsulenter i stallen, er kompetanseområdet
		bredt.
	</p>
	<p>Vil du vite mer? <a class='underline' {href}>Ta en tur innom Boitanos nettside. </a></p>

</div>
