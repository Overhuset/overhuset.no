<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
		<MetaTags
		title='Kodemaker - en del av konsulentselskapet Overhuset'
		description='Kodemaker er 1 av 10 partnere i konsulentselskapet Overhuset. Her er de beste samlet under
		ett tak. Sammen leverer de tjenester i full bredde, på høyeste nivå.'
    />
	<h1>Lidenskapelig ekspertise innen systemutvikling</h1>
	<p class='font-bold'>Kodemakers konsulenter leverer høy kompetanse, og setter pris på store og komplekse
		utfordringer. De bruker kolleger og fagnettverk aktivt for å ligge ett steg foran på vegne av kunder
		og samarbeidspartnere.
	
	</p>
	<p>
		Konsulentene fra Kodemaker har gode kommunikasjons- og samarbeidsevner. De spiller hverandre og
		kundene gode, ved å ha øynene åpne for nye og bedre løsninger. De er modige og engasjerte, og det
		etablerte blir gjerne utfordret. Det ser det ut til at kundene setter pris på, ettersom kontraktene ofte blir
		forlenget etter endt leveranse.
	</p>
	<h2>Systemutvikling på åpne plattformer</h2>
	<p>
	Teknologisk sett har Kodemakers konsulenter sin tyngde rundt systemutvikling på åpne plattformer, som
	ofte passer organisasjoner som trenger stor kontroll over egne systemer. Det innebærer som regel
	fleksibilitet i prosessene, transparens og innovasjon.
	</p>

	<p><a {href}>Les om vår kvalitetspolitikk her</a></p>
	<h2>Kompetanse på Kotlin, Clojure, Java og mye mer!</h2>
	<p>Kompetansefeltet er bredt, og denne gjengen kan de fleste programmeringsspråk og plattformer, som
		Kotlin, Clojure, Java, Go og Rust, samt TypeScript, JavaScript og ClojureScript. Operativsystemene iOS og
		Android er en selvfølge. Det samme er Flutter. Skulle du likevel ønske tjenester basert på andre
		rammeverk enn de nevnte, er det lite som stopper denne gjengen fra å sette seg inn i det på effektivt vis.
	</p>
	<p>Vil du vite mer? <a {href}>Ta en tur innom Kodemakers nettsider</a></p>

</div>
