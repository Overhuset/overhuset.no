<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<p>
		Edisys Consulting er et av Norges ledende fagmiljøer innen elektronisk samhandling. Vi tilbyr
		rådgivning og tjenester innen prosjekt- og testledelse, prosessmodellering,
		spesifikasjonsutvikling og arkitektur. Våre erfarne rådgivere kan bidra i alle deler av en
		implementerings-prosess, fra strategiske avklaringer og valg av løsning, til analyse, design og
		implementering.<br /><br />Vi i Edisys Consulting har kunnskap om såvel prosesser, som løsninger
		og standarder som finnes i markedet, og vi deltar aktivt både nasjonalt og internasjonalt for å
		fremme og utvikle standarder på området. Våre rådgivere har erfaring fra en rekke bransjer og
		virksomheter innen både privat og offentlig sektor, og vi har opp gjennom årene deltatt i store
		EDI-prosjekter blant annet innen varehandel, kraft- og transportbransjen. Her har vi vært med på
		både å legge premissene for, og å implementere, standardiserte løsninger.<br /><br />Vi
		kombinerer evnen til å lede prosjekter og prosesser med evnen til å formidle kunnskap og idéer
		til våre oppdragsgivere. Det er viktig for oss å dele erfaring og kunnskap med våre kunder, slik
		at kjøp av våre tjenester også er et bidrag til å bygge kunnskap i egen organisasjon.
	</p>
	<p>Les mer om oss her: <a {href}>{href}</a></p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			Elektronisk samhandling, Prosjekt- og prosessledelse, Testledelse, Prosess- og
			informasjonsmodellering, Kravspesifisering
		</strong>
	</p>
</div>
