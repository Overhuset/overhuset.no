<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';
		import { MetaTags } from 'svelte-meta-tags';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	 <MetaTags
		title='Fink - en del av konsulentselskapet Overhuset'
		description='Fink er 1 av 10 partnere i konsulentselskapet Overhuset. Her er de beste samlet under ett tak.
		Sammen leverer de tjenester i full bredde, på høyeste nivå.'
    />
	<h1>Spesialister på UX, UI og mye mer!</h1>
	<p class='font-bold'>Fink er et inkluderende og kunnskapsrikt konsulentselskap som elsker kombinasjonen teknologi og
		design. Denne gjengen består av nysgjerrige, smarte og veldig hyggelige fagnerder, som beriker ethvert
		prosjekt.
	</p>
	<p>
		Konsulentselskapet Fink er eid av rundt 60 dyktige fagspesialister, som sammen motbeviser alle fordommer om at
		konsulentverden er kjølig. Med en fink på laget, er kundene garantert en faglig sterk støttespiller, så vel som et
		kjærkomment tilskudd til teamet.
	</p>
	<h2>Javascript, Kotlin, HTML, .NET...</h2>
	<p>I møte med ny teknologi, er Fink-konsulentene både modige og lekne. Med solid fagkompetanse i bunn, hjelper de
		kunder med å løse komplekse problemer, og lager gjennomtenkte løsninger som passer deres behov. Deres utviklere
		har spisskompetanse på Javascript, Kotlin, HTML React og Java, i tillegg til CSS, .NET, NodeJS, Vue og swift.
	</p>
	<h2>Design på folks premisser</h2>
	<p>Konsulentene fra Fink er opptatte av menneskene som bruker digitale tjenester og organisasjonene som leverer dem.
		Ved å forstå hvordan folk tenker og handler, har de gjennom årenes løp dannet seg et sterkt grunnlag for å skape de
		beste brukeropplevelsene. Fink tilbyr konsulenter med kompetanse på UX- og UI-design, i tillegg til tjenestedesign,
		strategisk design og visuell kommunikasjon.
	</p>

	<p>Vil du vite mer? <a {href}>Ta en tur innom Finks nettside.</a></p>

</div>
