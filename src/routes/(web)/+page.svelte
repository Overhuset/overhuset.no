<script>
	import CompanyList from '$lib/components/CompanyList.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	export let data;
</script>

<svelte:head>
	<title>Overhuset</title>
	<MetaTags
	title='Overhuset – de råeste konsulentene i IT-bransjen'
	description='Overhuset er et samarbeid mellom 11 ledende konsulentselskaper. Sammen tilbyr vi IT-tjenester til store
prosjekter – i full bredde, på høyeste nivå.'
/>
</svelte:head>
<section class="page-section flex-col-reverse md:flex-row items-center gap-6">
	<img src="/assets/slogan.png" alt="" class="md:w-1/2 aspect-[4/3]" />
	<h2
		class="text-3xl md:text-4xl lg:text-6xl font-bold text-center text-stone-600 md:w-1/2 font-source md:px-16"
	>
		360 AV DE RÅESTE IT-KONSULENTENE I MARKEDET UNDER SAMME TAK
	</h2>
</section>

<section class="half-o mt-12" id="kurs_og_kompetanse">
	<div class="page-section text-white flex-col gap-12">
		<h3 class="text-4xl md:text-6xl">ER DU LIKE GLAD I UTVIKLING SOM OSS?</h3>
			<p class="max-w-4xl mx-auto text-lg md:text-2xl font-light">
			Som et av IT-bransjens mest fremoverlente fagnettverk, sitter vi på mye kompetanse og erfaring. Det
			er vi opptatte av å kunne dele, inspirere og engasjere med – både internt og eksternt. Derfor
			gjennomfører vi flere spennende arrangementer og aktiviteter i løpet av året.
		</p>
		<a class='underline underline-offset-1' href='/kurs_og_seminarer'>Se hva som skjer på huset hos oss!</a>
		
	</div>
</section>

<section
	class="page-section w-full flex-col md:flex-row md:items-end justify-between gap-6 md:gap-16"
	id="selskapene"
>
	<!-- class="flex flex-col md:flex-row mx-auto my-12 md:my-24 max-w-8xl md:items-end justify-between md:gap-16 gap-6 px-12" -->

	<h2 class="text-[#E97A58] font-bold text-5xl md:text-7xl md:w-1/2">TI KONSULENTSELSKAPER - ETT FELLESSKAP</h2>
	<img src="/assets/companies-deco.png" alt="" class="w-full md:w-1/2 aspect-[4/3] min-h-[200px]" />
</section>

<section class="page-section flex-col max-w-6xl gap-24">
	<p class="max-w-5xl text-2xl font-light">
		Overhuset består av Norges elleve ledende konsulentselskaper, som samarbeider om større IT-
		utviklingsprosjekter i offentlig og privat sektor. Hvert selskap er spesialisert innenfor sine
		fagfelt, og er nøye satt sammen for å berike og komplettere hverandre på best mulig vis.
		Sammen utgjør vi bransjens mest fremoverlente og kompetente fagmiljø.
	<br>
	<br>
	Vi kan alt fra mobil- og systemutvikling, til data-infrastruktur og KI, for å nevne noe.
		Nysgjerrig på hva hvert selskap er spesialisert innenfor? Klikk på logoene for å lese mer!
	</p>
	<CompanyList companyList={data.companyList} />
</section>

<section class="half-o" id="om_oss">
	<div class="page-section text-white flex-col gap-12">
		<h3 class="text-4xl md:text-6xl">OM OSS</h3>
			<p class="max-w-4xl mx-auto text-lg md:text-2xl font-semibold">
			Overhuset ble etablert i 2009, som svar på bransjens behov for fullservice-selskaper til større IT-prosjekter. 
                        Selskapet består av ti konsulentselskaper med ekspertise på hver sine felt. Sammen tilbyr vi spisskompetanse i full bredde.
			</p>
		<p class="max-w-4xl mx-auto text-lg md:text-2xl font-light">
			Som kunde av Overhuset, forholder du deg til ett selskap, med ett kontaktpunkt og ett sett avtaler. Med over 350
                        av bransjens mest erfarne konsulenter i stallen, setter vi sammen teamet akkurat ditt prosjekt trenger.
		</p>
		<a href="/om_oss" class="underline font-semibold px-8">Les mer</a>
		<h3 class="text-4xl md:text-6xl">Å VÆRE BEST FORPLIKTER</h3>
		<p class="max-w-4xl mx-auto text-lg md:text-2xl font-bold">
			Ved å forene bransjens beste konsulentselskaper, er ambisjonene om kvalitet tilsvarende høye. Vi
			lykkes der andre feiler, fordi vi har samarbeid og kompetanseoverføring i vårt DNA.
		</p>
		<p class="max-w-4xl mx-auto text-lg md:text-2xl font-light">
			Overhusets konsulenter er stødige, ambisiøse og pålitelige fagfolk, som legger mye stolthet i å levere tjenester i
			topp-klassen. For å få til det, følger vi kvalitetssystemet NS-EN ISO 9001, og har definert noen retningslinjer basert
			på det.
			
		</p>
			<a href="/kvalitet_i_alle_ledd" class="underline font-semibold px-8">Les mer</a>
	</div>
</section>

<section class="page-section flex-col md:flex-row">
	<img src="/assets/knowledge-sharing.jpg" class="md:w-1/2 aspect-[16/10]" alt="" />
	<div class="md:pl-12 flex flex-col justify-evenly mt-16">
		<h3 class="text-4xl font-source font-bold text-[#729089]">Kunnskapsdeling</h3>
		<p
			class="mt-6 pr-6 text-right border-r-[3px] border-[#729089] max-w-2xl mx-auto text-2xl font-light"
		>
			Overhuset har sterk tro på deling av kunnskap. Ingen blir bedre av å ruge på egen viten.
			Fagaktiviteter på tvers av selskapene gir oss selv og våre kunder stadige kunnskapsløft.
		</p>
	</div>
</section>
<section class="page-section flex-col md:flex-row gap-12">
	<div class="flex flex-col gap-6 justify-evenly items-end md:my-16">
		<h3 class="text-3xl md:text-4xl font-source font-bold text-[#E97A58] md:text-right">
			Spesialistene på ett sted
		</h3>
		<p class="pl-6 md:pl-12 border-[#E97A58] border-l-[3px] text-2xl font-light md:ml-32">
			De skarpeste fagmiljøene som dyrker spisskompetansen på lag med andre som er best i sine
			grener. Tilgang til eksperter på mange fagområder. Uten omveier.
		</p>
	</div>
	<img src="/assets/cyclists.jpg" class="md:w-96 aspect-square bg-slate-100" alt="" />
</section>
