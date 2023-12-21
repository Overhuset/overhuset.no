<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
		<MetaTags
		title='Forse - en del av konsulentselskapet Overhuset'
		description='Forse er 1 av 10 partnere i konsulentselskapet Overhuset. Her er de beste samlet under ett tak.
		Sammen leverer de tjenester i full bredde, på høyeste nivå.'
    />
	<h1>Spesialister på Microsoft, .NET og mobilutvikling</h1>
	<p class='font-bold'>Forse er et av landets sterkeste utviklermiljøer, bestående av konsulenter med senior
		kompetanse på sine felt. Konsulentselskapet er vel ansett i markedet og har kunnskap som sin
		fremste forse, som betyr styrke.
	</p>
	<p>
		Kundene som får en av Forses konsulenter til prosjektet sitt, er garantert en konsulent med lang erfaring,
		kompetanse på ekspertnivå, og som har et sterkt fagmiljø å støtte seg på. Konsulentene drives av å tilegne
		seg ny kunnskap, utfordre og forbedre den. Det hjelper kundene til å ligge ett steg foran.
	</p>
	<h2>iOS og Android, ja-takk begge deler!</h2>
	<p>Konsulentene fra Forse er driftige apputviklere med oppdatert kunnskap og kompetanse knyttet til app-
		markedet. De har bred innsikt i hvilke muligheter som finnes i hvert operativsystem og har høy kompetanse
		i native-utvikling, så vel som utvikling for kryssplattformer. Målet er alltid brukervennlige apper som gjør
		jobben smart og effektivt.
	</p>
	<h2>Frontend, backend og fullstack</h2>
	<p>Med ett ben i nåtiden og ett i fremtiden, vet de dyktige konsulentene hva som skal til for at din tjeneste skal
		bli en brukersuksess. Forse tilbyr utviklere med ekspertise på frontend, backend og fullstack - alt etter hva
		som passer ditt behov. I tett samarbeid med både UX- og UI-designere, står alltid brukervennlighet,
		universell utforming og responsivt design i fokus.
	</p>

	<p>Vil du vite mer? <a {href}>Ta en tur innom Forses nettsider.</a></p>

</div>
