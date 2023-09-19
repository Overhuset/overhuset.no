<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<p>
		Vi hjelper kundene våre med å bygge grunnlaget for deres digitale transformasjon innen områdene
		API og integrasjon, DevOps og skytjenester. Som en ledende åpen kildekode-leverandør i Norden
		har vi alltid fokus på åpenhet.
	</p>
	<p>
		Vi leverer løsninger innenfor ovennevnte områder, den åpne teknologien som løsningene er basert
		på sørger for at leveransen er i teknologisk forkant. Det gir våre kunder nye inntektsstrømmer,
		mulighet til å handle raskere på markedet og mer effektive forretningsprosesser.
	</p>
	<ul>
		<li>
			Skytilbudet vårt er basert på en hybridstrategi som involverer aspekter fra
			“bruk-din-egen-maskinvare i offentlige skyer”. Alt håndteres sømløst av vår
			administrasjonstjeneste.
		</li>
		<li>
			API- og integrasjonsløsninger er nøkkelen til å få kontroll og kunne bruke det fulle
			potensialet i informasjonsflyter og til å skape eksterne eller interne økosystemer.
		</li>
		<li>
			I et DevOps-miljø jobber utviklere og driftsavdelinger effektivt sammen. For å sikre at
			samarbeidet går problemfritt, trengs klare automatiseringsstrategier og en kraftig
			DevOps-verktøykasse.
		</li>
	</ul>
	<p>Les mer om oss her: <a {href}>{href}</a></p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			DevOps, DevSecOps, skytjenester, integrasjon, arkitektur, prosjektledelse, systemutvikling
		</strong>
	</p>
</div>
