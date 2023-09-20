<script>
	import CompanyList from '$lib/components/CompanyList.svelte';
	import { posten } from '$lib/config/constellations';
</script>

<svelte:head>
	<title>Overhuset</title>
	<meta
		name="description"
		content="Overhuset leverer spisskompetanse innenfor et bredt spekter av fagområder. Tjenestene leveres gjennom våre partnerselskaper som alle har spesialisert seg på å være ledende fagmiljøer med spiss- og seniorkompetanse innenfor sine respektive fagfeltOverhuset leverer spisskompetanse innenfor et bredt spekter av fagområder. Tjenestene leveres gjennom våre partnerselskaper som alle har spesialisert seg på å være ledende fagmiljøer med spiss- og seniorkompetanse innenfor sine respektive fagfelt."
	/>
</svelte:head>
<section class="page-section flex-col-reverse md:flex-row items-center gap-6 !max-w-5xl">
	<img src="/assets/posten_logo.png" alt="" class="md:w-2/5" />
	<span class="text-7xl pt-14 hidden md:block">+</span>
	<img src="/companies/overhuset_logo.svg" alt="" class="md:w-2/5 hidden md:block" />
</section>
<!-- <section -->
<!-- 	class="page-section w-full flex-col md:flex-row md:items-end justify-between gap-6 md:gap-16" -->
<!-- 	id="selskapene" -->
<!-- > -->
<!-- 	<h2 class="text-[#E97A58] font-bold text-5xl md:text-7xl md:w-1/2">SELSKAPENE</h2> -->
<!-- 	<img src="/assets/companies-deco.png" alt="" class="w-full md:w-1/2 aspect-[4/3] min-h-[200px]" /> -->
<!-- </section> -->

<section class="page-section flex-col max-w-6xl">
	<p class="max-w-5xl text-2xl font-light">
		I rammeavtalen med Posten samarbeider vi i Overhuset med et utvalg selskaper der vi samler
		spisskompetanse fra et bredt spekter av fagområder. Denne kompetansen leveres ikke bare av oss,
		men også gjennom våre partnerselskaper. Hvert av disse selskapene har spesialisert seg på å være
		ledende fagmiljøer med spiss- og seniorkompetanse innenfor sine respektive fagfelt. Nedenfor
		finner du en liste over selskapene som er en del av denne avtalen. Klikk på de enkelte
		selskapene for mer detaljert informasjon.
	</p>
	<CompanyList companyNames={posten} />
</section>

<section class="page-section flex-col md:flex-row !mt-0">
	<div class="md:pl-12 flex flex-col justify-evenly mt-16">
		<h3 class="text-4xl font-source font-bold text-[#729089]">Kunnskapsdeling</h3>
		<p class="mt-6 pr-6 border-r-[3px] border-[#729089] max-w-2xl mx-auto text-2xl font-light">
			Overhuset har sterk tro på deling av kunnskap. Ingen blir bedre av å ruge på egen viten.
			Gjennom rammeavtalen vi har med dere i Posten vil vi gjerne invitere dere med på noen av våre
			arrangementer. <a href="/posten/kompetanse" class="font-normal underline">Trykk her</a>
		</p>
		<p />
	</div>
</section>
