<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<p>
		Kodemaker leverer meget høy kompetanse innen systemutvikling. Vi har kun erfarne konsulenter med
		oss, som liker å bryne seg på utfordrende oppgaver. Vi er en entusiastisk gjeng med lidenskap
		for faget. Vi bruker hverandre aktivt som sparringpartnere på tvers av oppdrag, og det kommer
		våre kunder til gode.
	</p>
	<p>
		Våre gode kommunikasjonsevner, evne til å samarbeide, samt at vi har et våkent øye for bedre
		løsninger, gjør oss til viktige støttespillere for våre kunder. Svært mange av våre konsulenter
		får forlenget kontraktene igjen og igjen, og det gjerne med riktig så hyggelige tilbakemeldinger
		fra kunden.
	</p>
	<p>
		Teknologisk sett har vi vår tyngde rundt systemutvikling på åpne plattformer. Vi kan dekke alle
		roller fra teknisk prosjektleder, rådgiver, arkitekt og sylskarp utvikler. De fleste av oss
		trives best i en rolle som anerkjent fullstack-utvikler med utvidet ansvar.
	</p>
	<p>Les mer om oss her: <a {href}>{href}</a></p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			Kotlin, Clojure, Java, Go, Rust, Elm, TypeScript, JavaScript, ClojureScript, iOS, Android,
			Flutter. Bruker dere noe annet? Vi liker en utfordring!
		</strong>
	</p>
</div>
