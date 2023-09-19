<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<p>
		Sannsyn er et av Norges ledende fagmiljøer innen data science og maskinlæring. Vi har siden
		starten i 2012 hjulpet en rekke virksomheter å skape konkurransekraft med egne data.
	</p>
	<p>
		Vi har bred erfaring med alt fra å analysere data med fokus på å finne hvordan virksomheten kan
		kommersialisere dataenes potensiale, til utvikling av maskinlæringsmodeller og etablering av
		arkitektur som understøtter best mulig innsikt.
	</p>
	<p>
		Et vellykket data science prosjekt krever en kombinasjon av solid forretningsforståelse, tung
		matematisk/statistisk kompetanse og dyktige utviklere. Dette er en kombinasjon som er vanskelig
		å få tak i, men som vi kan levere. Vi var tidlig ute i det norske markedet med fokus på data
		science og maskinlæring, og har derfor rukket å få lang erfaring fra de fleste bransjer på dette
		området.
	</p>
	<p>
		I tillegg til å brenne for maskinlæring og stordata, så er vi opptatt av å at alle våre kunder
		skal kunne dra nytte av vår kollektive kompetanse. Det gjør vi ved å jobbe systematisk med
		kompetansedeling og ved å jobbe aktivt for å spille hverandre gode. Dette skaper trygge
		konsulenter, godt samarbeidsklima og bedre sluttresultat.
	</p>
	<p>Les mer om oss her: <a {href}>{href}</a></p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			Maskinlæring, AI, store data / big data, Python, C#, Java, Kotlin, Spark, data-strategi,
			data-infrastruktur, skyløsninger (AWS, Azure, GCP), Solr, søk / semantisk søk, tekstforståelse
			/ entiteter i tekst
		</strong>
	</p>
</div>
