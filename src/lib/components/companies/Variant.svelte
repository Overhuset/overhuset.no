<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<p>
		I Variant ønsker vi å bidra til størst mulig forandring til det bedre for kundene våre, for folk
		og for samfunnet. Derfor har vi rigget oss helhetlig for å kode, designe, lede og rådgi innenfor
		fire definerte kjerneområder som ofte spiller på lag.
	</p>
	<p>Les mer om oss her: <a {href}>{href}</a></p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			Systemutvikling backend og sky ( .net, Java, Kotlin, Amazon, Google Cloud Plattform),
			Systemutvikling frontend (Javascript, Typescript, React, Vue.js), Design ( Tjenestedesign,
			Grafisk design, Interaksjonsdesign, WCAG2.0, Universell utforming), Arkitektur,
			Prosjektledelse, Metodikk( Smidige metoder, design thinking, Lean Startup)
		</strong>
	</p>
</div>
