<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
		<MetaTags
		title='Zenior - en del av konsulentselskapet Overhuset'
		description='Zenior er 1 av 10 partnere i konsulentselskapet Overhuset. Her er de beste samlet under ett
			tak. Sammen leverer de tjenester i full bredde, på høyeste nivå.'
    />
	<h1>Eksperter på komplekse, skreddersydde IT-løsninger</h1>
	<p class='font-bold'>
		Zenior leverer solide tjenester innen systemutvikling og -arkitektur, og bistår kunder i å
		utvikle IT-løsninger som krever dyp innsikt i både teknologi og metodikk. For å få til det, har de
		sikret seg erfarne konsulenter som er ledende i bruk av ny teknologi.
	</p>
	<p>
		Zenior ble etablert i 2001 og består av rundt tjue konsulenter på seniornivå. De rådgir og utvikler, primært
		i systemutviklingsprosjekter mot offentlige og private kunder.
	</p>
	<h2>Teknisk kompetanse + samhandling</h2>
	<p>
		Konsulentselskapet Zenior mener teknisk kompetanse, sammen med evnen til samhandling og
		kommunikasjon, er avgjørende for at du som kunde skal kunne levere dine produkter og tjenester til avtalt
		tid og kvalitet. Deres evne til å tilpasse seg i prosjekter er derfor stor, og kvalitet, kompetanse og
		leveranseevne står høyt.
	</p>
			<p><a href='/om_oss'>Les om vår kvalitetspolitikk her</a></p>
	<h2>Java, Android, iOS, Microsoft og .NET</h2>
	<p>
		Zeniors kjernevirksomhet er utvikling av serverbaserte systemer på Java-plattformen, enten det er rene
		webløsninger eller tjenesteorientert arkitektur. I tillegg jobber de med plattformer som Android, iOS og
		Microsoft .NET. Målet er å tilby de beste ressursene i markedet innenfor sitt felt, noe de lykkes med i både
		egne og Overhusets kundeprosjekter.
	</p>


	<p>Vil du vite mer? <a {href}>Ta en tur innom Zeniors nettsider.</a></p>

</div>
