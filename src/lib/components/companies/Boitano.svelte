<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<p>
		Boitano er et ansatteid selskap med over 50 erfarne utviklere og teknologiledere. Felles for
		alle vi jobber med, er at de vet hvor mye menneskene bak teknologien betyr. Det er menneskene
		som gjør den store forskjellen. Boitano samler solide faglige ressurser og entreprenørskapsånd
		på ett sted.
	</p>
	<p>Les mer om oss her: <a {href}>{href}</a></p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			.Net-utvikling, arkitektur, design, interaksjonsdesign, konsept- og forretningsutvikling,
			teknologi-, prosess- og personalledelse.
		</strong>
	</p>
</div>
