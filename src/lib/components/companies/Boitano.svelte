<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<p>
		Boitano er et partnerskap med 45 erfarne teknologer og forretningsutviklere som jobber i
		prosjekter hos noen av Norges største selskap.<br /><br />
	</p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			.Net-utvikling, arkitektur, design, interaksjonsdesign, konsept- og forretningsutvikling,
			teknologi-, prosess- og personalledelse.
		</strong>
	</p>
</div>
