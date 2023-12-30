<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
		  <MetaTags
		title='Sannsyn - en del av konsulentselskapet Overhuset'
		description='Sannsyn er 1 av 10 partnere i konsulentselskapet Overhuset. Her er de beste samlet under ett
			tak. Sammen leverer de tjenester i full bredde, på høyeste nivå.'
    />
	<CompanyHeader {href} {imgSrc} />
	<h1>Ledende fagmiljø innen KI og maskinlæring</h1>
	<p class='font-bold'>
		Visste du at rundt 73 prosent tilgjengelig data ikke blir brukt på en strategisk måte? Sannsyn er et av
		landets fremste konsulentselskaper, som vet hvordan gjøre nettopp det.</p>
	<p>
		Konsulentselskapet Sannsyn har spisskompetanse på data science og maskinlæring, og hjelper kunder med å skape verdi
		av dataene de har tilgang på – for eksempel i form av innsikt, automatisering og relevans. På denne måten, har de styrket
		konkurransekraften til en rekke private og offentlige virksomheter siden selskapets oppstart i 2012.
	</p>
	<h2>Potensialet i dataanalyse</h2>
	<p>
		Sannsyns dyktige dataanalytikere, matematikere og utviklere har bred erfaring med alt fra å analysere data med fokus på
		hvordan selskapet kan dra nytte av den, til å utvikle maskinlæringsmodeller og etablere arkitektur arkitektur som
		understøtter best mulig innsikt.
	</p>
	<h2>Data science-prosjekter</h2>
	<p>
		Et vellykket data science-prosjekt krever en kombinasjon av solid forretningsforståelse, tung matematisk/statistisk
		kompetanse og dyktige utviklere. Denne kombinasjonen kan være vanskelig å få tak i, men Sannsyn leverer sterkt på alle
		felt her. Konsulentenes fagområder brer seg over alt fra maskinlæring, KI og stordata, til skyløsninger, datastrategi og -
		infrastruktur, for å nevne noen.
	</p>
	<p>
		Konsulentselskapet var tidlig ute i det norske markedet, og regnes derfor som et av bransjens mest erfarne på feltet.
		Dette gjenspeiles i deres leveranser til egne og felles kunder i regi av Overhuset.
	</p>
		<p><a href='/kvalitet_i_alle_ledd'>Les om vår kvalitetspolitikk her</a></p>
	<h2>Kollektiv kompetanse</h2>
	<p>I tillegg til å brenne for maskinlæring og stordata, er Sannsyn sitt ansvar bevisst når det gjelder å bidra til økt kollektiv
		kompetanse. Ved å jobbe systematisk med kompetansedeling, spiller de både hverandre og kundene gode. Det skaper
		trygge konsulenter, godt samarbeidsklima og bedre sluttresultat.
	</p>


	<p>Vil du vite mer?<a {href}> Ta en tur innom Sannsyns nettsider.</a></p>

</div>
