<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	  <MetaTags
		title='Edisys - en del av konsulentselskapet Overhuset'
		description='Edisys er 1 av 10 partnere i konsulentselskapet Overhuset. Her er de beste samlet under ett
		tak. Sammen leverer de tjenester i full bredde, på høyeste nivå.'
    />
	<h1>Ledende fagmiljø på elektronisk samhandling</h1>
	<p class='font-bold'>
		Edisys Consulting ser på digitalisering som en lagidrett, og tilbyr erfarne rådgivere til alle deler av
		en implementeringsprosess – fra strategiske avklaringer og valg av løsning, til analyse og design.</p>
	<p>
		Konsulentselskapet har erfaring fra en rekke bransjer og virksomheter innen både privat og offentlig sektor, og har
		deltatt i store EDI-prosjekter blant annet innen varehandel, kraft- og transportbransjen. EDI står for Electronic Data
		Interchange, og dreier seg om nettopp utveksling av elektronisk informasjon. På dette feltet har Edisys Consulting
		vært en viktig premissgiver i flere år.
	</p>

	<h2>Støtter og løfter IT-prosjekter</h2>
	<p>Edisys-konsulentene brenner for datadeling, samarbeid og standardisering på tvers av digitale økosystemer. Med
		sterk kompetanse og lang erfaring, støtter og løfter de prosjekter og team på kundesiden. Målet er å bidra til de
		beste løsningene – nå og for fremtiden. Du finner dem i roller som for eksempel arkitekt, prosjekt- eller teamleder.
	</p>
	<h2>Digitalisering og opplæring</h2>
	<p>Selskapet har markert seg på nasjonalt og internasjonalt nivå, og deltar aktivt for å fremme og utvikle standarder
		som finnes i markedet. Konsulentene herfra ser stor verdi i opplæring og kunnskapsdeling, for å sikre at tjenestene
		de tilbyr alene og gjennom Overhuset lander godt hos kundene. Opplæring er en viktig del av leveransen, og en
		god måte for våre kunder å bygge kunnskap i egen organisasjon.
	</p>

	<p>Vil du vite mer? <a {href}>Besøk nettsiden til Edisys Consulting. </a></p>

</div>
