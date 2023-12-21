<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
		<MetaTags
		title='Uptime - en del av konsulentselskapet Overhuset'
		description='Uptime er 1 av 10 partnere i konsulentselskapet Overhuset. Her er de beste samlet under ett
		tak. Sammen leverer de tjenester i full bredde, på høyeste nivå.'
    />
	<h1>Norges sterkeste miljø for systemutviklere og tekniske arkitekter</h1>
	<p class='font-bold'>
		Uptime Consulting bidrar med kompetanse, kapasitet og skreddersøm til integrasjons- og
		systemutviklingsprosjekter. Favorittprosjektene innebærer å løfte kunder til neste nivå, ved å
		skape robuste og brukervennlige løsninger som svar på komplekse utfordringer.
	</p>
	<p>Siden oppstarten for nåværende selskapsform i 2014, har Uptime Consulting representert det beste av de
		beste innen systemutvikling og teknisk arkitektur. Selskapet har spesielt mye domeneerfaring med
		søketeknologi, både elasticsearch, solr og forskjellige former for Microsoft-basert søketeknologi. Det gjør
		konsulentene herfra spesielt godt egnet til den type prosjekter.
	</p>
	<h2>Teknologi, digitalisering og systemutvikling</h2>
	<p>
		Uptime består av dyktige, nysgjerrige og erfarne konsulenter med glødende engasjement for teknologi og
		gode digitale løsninger. Med kundens beste i bakhodet, er fokuset alltid på kunden og kundens brukere
		og/eller saksbehandlere. Hva vil fungere best for dem, og hvordan bygge en robust løsning som er levedyktig i
		flere år fremover?
	</p>
		<p><a href='/om_oss'>Les om vår kvalitetspolitikk her</a></p>
	<h2>Fleksible og tilpasningsdyktige utviklere</h2>
	<p>
		Med høye krav til resultat og kvalitet på sine leveranser, er Uptime-konsulentene likevel stødige og
		modige i sin tilnærming. De viser stor ansvarsfølelse, både for løsninger og prosjektet som helhet, og
		elsker å bidra til å løfte kundene til nye høyder.
	</p>
	<p>
		Med én eller flere Uptime-konsulenter på laget, er du garantert en løsning som er tilpasset deg og din
		bedrift – enten du trenger spesifikke funksjonaliteter “laget fra bunn”, eller om du trenger ekstra
		kompetanse, tid og innsats til et allerede eksisterende team og prosjekt. Mantraet til denne gjengen er
		nemlig å være fleksible og tilpasningsdyktige. Det blir det lange og gode kundeforhold av!
	</p>

	<p>Vil du vite mer? <a {href}>Ta en tur innom nettsidene til Uptime Consulting.</a></p>

</div>
