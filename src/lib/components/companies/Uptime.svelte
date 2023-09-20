<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<p>
		Uptime Consulting har eksistert i sin nåværende form siden 2014, og representerer et av Norges
		sterkeste miljø av systemutviklere og tekniske arkitekter. Vi har også flere som har spesielt
		mye domeneerfaring med søketeknologi, både elasticsearch, solr og forskjellige former for
		Microsoft-basert søketeknologi, noe som gjør oss spesielt godt egnet til slike prosjekter.
	</p>

	<p>
		Vi elsker å bidr med kompetanse og kapasitet på integrasjonsprosjekter,
		systemutviklingsprosjekter, app-utvikling og skreddersydd løsningsutvikling med høy
		kompleksistet. Dette er det vi gjør aller best! Vi jobber både innen JVM-basert utvikling
		(Kotlin, Java, Clojure), Microsoft-basert utvikling (C#/F#), samt at vi gjør app-utvikling.
	</p>
	<p>
		Vi er heller ikke redde for å ta ansvar for løsninger og prosjekter, og vårt favorittprosjekt er
		når vi sammen med kunden kan være med å forme en robust, brukervennlig løsning på en kompleks
		utfordring som bidrar til å ta kunden opp til neste nivå. Vi trives best når behovene ikke kan
		løses med et kjøpt, tilpasset produkt, men hvor man heller trenger å bygge noe på egen kjøl.
	</p>

	<p>
		Hovedfokuset vårt er, og vil alltid være - riktig utvikler til riktig kunde! Våre kunder vil ha
		utviklere som kan "hit the ground running" og bidra fra dag 1.
	</p>

	<p>
		Vi verdsetter lange kundeforhold, og setter pris på en gjensidighet i forholdet til våre kunder.
		En kunde av Uptime Consulting skal oppleve å bli ivaretatt både før, under og etter prosjektet -
		og ønske å jobbe sammen med oss på et senere tidspunkt.
	</p>
	<p>Les mer om oss her: <a {href}>{href}</a></p>
	<h4>Fagområder</h4>
	<p>
		<strong>
			Systemutvikling innen Java/JVM, Kotlin, Clojure, Microsoft/.NET/Azure, javascript, React/Vue,
			Typescript, Elastic, Solr, Android, Maui, Razor, Optimizely.
		</strong>
	</p>
</div>
