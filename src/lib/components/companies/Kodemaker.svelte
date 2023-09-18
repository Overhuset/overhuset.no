<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<p>
		Kodemaker leverer meget høy kompetanse innen systemutvikling. Vi har kun erfarne konsulenter med
		oss, som liker å bryne seg på vanskelig oppgaver. Vi er en entusiastisk gjeng med lidenskap for
		faget. Vi bruker hverandre aktivt som sparringpartnere på tvers av oppdrag, og det kommer våre
		kunder til gode.<br /><br />Våre gode kommunikasjonsevner, evne til å samarbeide, samt at vi har
		et våkent øye for bedre løsninger, gjør oss til viktige støttespillere for kundene. Svært mange
		av våre konsulenter får forlenget kontraktene igjen og igjen, og det gjerne med riktig så
		hyggelige tilbakemeldinger fra kunden.<br /><br />Teknologisk sett har vi vår tyngde rundt
		systemutvikling på åpne plattformer. Vi kan dekke alle roller fra teknisk prosjektleder,
		rådgiver, arkitekt og sylskarp utvikler. Se liste til høyre for ytterligere detaljer.
	</p>
	<p>Les mer om oss her: <a {href}>{href}</a></p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			Java, Javascript, Groovy/Grails, Ruby/Rails, Scala, iOS/Android, Clojure, Bruker dere noe
			annet? Vi liker en utfordring.
		</strong>
	</p>
</div>
