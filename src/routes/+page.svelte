<script>
	import CompanyList from '$lib/components/CompanyList.svelte';
</script>

<section class="page-section flex-col-reverse md:flex-row items-center gap-6">
	<img src="/assets/slogan.png" alt="" class="md:w-1/2" />
	<h2
		class="text-3xl md:text-4xl lg:text-6xl font-bold text-center text-stone-600 md:w-1/2 font-source md:px-16"
	>
		350 AV DE RÅESTE KONSULENTENE I MARKEDET UNDER SAMME TAK
	</h2>
</section>

<section
	class="page-section flex-col md:flex-row md:items-end justify-between gap-6 md:gap-16"
	id="selskapene"
>
	<!-- class="flex flex-col md:flex-row mx-auto my-12 md:my-24 max-w-8xl md:items-end justify-between md:gap-16 gap-6 px-12" -->

	<h2 class="text-[#E97A58] font-bold text-4xl md:text-7xl md:w-1/2">SELSKAPENE</h2>
	<img src="/assets/companies-deco.jpg" alt="" class="md:w-1/2" />
</section>

<section class="page-section flex-col">
	<p class="max-w-5xl text-2xl font-light">
		Overhuset leverer spisskompetanse innenfor et bredt spekter av fagområder. Tjenestene leveres
		gjennom våre partnerselskaper som alle har spesialisert seg på å være ledende fagmiljøer med
		spiss- og seniorkompetanse innenfor sine respektive fagfelt. Se på de enkelte selskapene for
		detaljer.
	</p>
	<CompanyList />
</section>

<section class="half-o" id="om_oss">
	<div class="page-section text-white flex-col gap-12">
		<h3 class="text-4xl md:text-6xl">OM OSS</h3>
		<p class="max-w-4xl mx-auto text-lg md:text-2xl font-light">
			Overhuset er et samarbeid mellom små og mellomstore konsulentselskaper. Sammen tilbyr vi vår
			spisskompetanse direkte til større kunder. Disse kundene opererer ofte med rammeavtaler, hvor
			små selskaper kan være diskvalifisert i utgangspunktet. Kundene var svært godt fornøyd med
			våre konsulenter, da de ble leid inn via større konsulentselskaper. Vil vil gjøre dem enda mer
			fornøyde ved å sørge for at våre kunder kan ha avtaler direkte med oss. Da får de den
			spisskompetansen de er ute etter. Uten bortkastet mellomledd.
		</p>
		<h3 class="text-4xl md:text-6xl">VÅR KVALITETSPOLITIKK</h3>
		<p class="max-w-4xl mx-auto text-lg md:text-2xl font-light">
			Vår kvalitetspolitikk skal bidra til å sikre høy kvalitet i våre tjenesteleveranser, og at vi
			forvalter våre oppgaver overfor eiere, partnere, kunder, samarbeidspartnere på en profesjonell
			og tillitsvekkende måte.<br /><br />
			Overhuset skal tilby de beste konsulentene i markedet til våre kunder, og levere tjenester med
			en kvalitet som tilfredsstiller krav og forventninger fra kunder og samarbeidspartnere.
			<br />
			<br />
			For å få dette til skal vi:<br />
			• Utføre våre oppdrag i henhold til kundens krav og betingelser<br />
			• Levere de tjenester våre kunder ønsker<br />
			• Følge lover, forskrifter og etiske retningslinjer<br />
			• Lære av våre feil<br />
			• Involvere partnere og samarbeidspartnere på en måte som sikrer forståelse for, identifisering
			og gjennomføring av vårt kvalitetsarbeid<br />
			• Dokumentere vårt arbeid med kvalitet; ha kvalitetsarbeid på dagsorden, samt ha fokus på kvalitetsmål
			i alle ledd i selskapet<br />
			• Ha et kvalitetssystem som tilfredsstiller kravene i NS-EN ISO 9001:2015
			<br />
			<br />
			Dette skal vi oppnå ved kontinuerlig forbedring av alle prosesser og rutiner som er etablert i
			Overhuset.<br />
		</p>
	</div>
</section>

<section class="page-section flex-col md:flex-row">
	<img src="/assets/knowledge-sharing.jpg" class="md:w-1/2" alt="" />
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
	<img src="/assets/cyclists.jpg" class="md:w-96" alt="" />
</section>
