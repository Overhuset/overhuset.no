<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<MetaTags
		title='JProfessionals - en del av konsulentselskapet Overhuset'
		description='JProfessionals er 1 av 10 partnere i konsulentselskapet Overhuset. Her er de beste samlet
		under ett tak. Sammen leverer de tjenester i full bredde, på høyeste nivå.'
    />
	<h1>Spesialister på koding, teknologi, utvikling og arkitektur</h1>
	<p class='font-bold'></p>
	<p>
		JPro har stor tillit hos mange av de store offentlige og private aktørene i landet, og konsulentene herfra
		ender ofte opp i sentrale roller hos kunder. I tillegg til å være en faglig sterk gjeng. er de også opptatt av å
		bidra til aktiviteter og sosial hygge. Det kommer både kunder og kolleger til gode.
	</p>
	<h2>Fullstack tjenesteleverandør</h2>
	<p>JPro-konsulentene er glødende opptatt av teknologi og koding, og er spesialiserte på å levere topp kvalitet på
		utviklings- og arkitekturleveranser til våre kunder. De er en fullstack-leverandør med tro på synergien mellom
		fornøyde ansatte, gode tekniske løsninger og fornøyde kunder.
	</p>
		<p class='underline'>Les mer om oss her: <a href='/om_oss'>Les om vår kvalitetspolitikk her</a></p>
	<h2>Digitalisering og omstilling</h2>
	<p>
		Med en eller flere JPro-konsulenter på laget, kan du være trygg på at selv store og omfattende
		digitalisering- og omstillingsprosjekter er i trygge hender. Denne gjengen forstår at hvert prosjekt er unikt,
		og at en "one-size-fits-all"-tilnærming sjelden fungerer. De er drevne på å tilpasse seg bedrifters unike
		kultur og metodikk, og blir fort en integrert del av kundenes team, uavhengig av sektor og bransje.
	</p>


	<p>Vil du vite mer? <a {href}>Ta en tur innom JPros nettsider.</a></p>

</div>
