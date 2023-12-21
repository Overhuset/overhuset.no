<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	  <MetaTags
		title='Arktekk - en del av konsulentselskapet Overhuset'
		description='Arktekk er 1 av 10 partnere i konsulentselskapet Overhuset. Her er de beste samlet under ett
		tak. Sammen leverer vi tjenester i full bredde, på høyeste nivå.'
    />
	<CompanyHeader {href} {imgSrc} />
	<h1>Spesialister på utvikling og arkitektur i Java, Scala og REST</h1>
	<p class='font-bold'>Arktekk er for mange Scala-sjappa i Norge, men konsulentene her kan mye mer!
		Faktisk så mye at de ofte brukes som mentorer for kunder med mindre erfarne utviklere i
		staben.
	</p>
	<p>
		Konsulentselskapet tilbyr anerkjente spesialister, som stadig er å se som foredragsholdere på
		konferanser i Norge og utlandet. I tillegg arrangerer de den årlige konferansen flatMap, som har
		tiltrukket seg fulle hus fra første år. Arrangementet er en viktig arena for funksjonell programmering i
		det norske utviklermiljøet.
	</p>
	<h2>Fagspesialiserte utviklere</h2>
	<p>
		Arktekks konsulenter er eksperter på Java-plattformen, og er lidenskapelig opptatte av fag. De er alle
		utbrytere fra større konsulentselskaper, av den enkle grunn at de ønsket å dyrke nettopp
		faginteressen. Som del av Overhuset får de det beste fra to verdener; å være del av et stort nettverk for
		samarbeid og læring, samtidig som spisskompetansen kan dyrkes i et selvstendig og uavhengig miljø.
	</p>
	<p>Vil du vite mer? <a class='underline' {href}>Ta en tur innom Arktekks nettside</a></p>

</div>