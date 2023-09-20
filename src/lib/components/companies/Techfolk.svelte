<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<h2>Vi gjør det enklere å lykkes digitalt</h2>
	<h3>Utvikling</h3>
	<p>
		Vi har engasjerte utviklere som bistår med å realisere digitale visjoner. Behøves det utvikling
		av nye digitale løsninger, skytjenester eller systemutvikling av den gamle skolen, stiller vi
		med masse kompetanse og energi. Vi samarbeider gjerne om å definere hva som skal oppnås og
		hvordan vi kommer dit, før vi tar frem verktøykassa og koder i vei.
	</p>
	<h3>Design</h3>
	<p>
		Man kan ha fantastisk teknologi under panseret, men det er brukeropplevelsen som gjør at motoren
		virkelig kommer til sin rett. Vi har lidenskapelige designere som vet hvordan man jobber for å
		forstå menneskene som skal bruke en tjeneste, og organisasjonen som skal levere den. Slik former
		vi digitale produkter som begeistrer både bruker og butikk.
	</p>
	<h3>Slik jobber vi</h3>
	<p>
		Vi gjør det enklere å lykkes digitalt ved å tilby konsulenter og team som bidrar til økt
		kompetanse, hastighet og fleksibilitet.
	</p>
	<p>
		Tett samarbeid legger grunnlaget for leveranser med høy presisjon og gode resultater. Derfor
		jobber vi smidig, kryss-funksjonelt og samlokalisert med kundene våre. Dette sikrer løpende
		dialog og kompetanseoverføring.
	</p>
	<p>Les mer om oss her: <a {href}>{href}</a></p>
	<h3>Fagområder</h3>
	<p>
		<strong>UX-, interaksjons og tjenstedesign, app-utvikling</strong>
	</p>
</div>
