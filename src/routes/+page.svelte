<script>
	import CompanyList from '$lib/components/CompanyList.svelte';
</script>

<section class="flex flex-col-reverse md:flex-row items-center md:m-24 m-12 max-w-7xl gap-8">
	<img src="https://www.overhuset.no/images/image-slogan-test.png" alt="" class="w-96" />
	<h2 class="text-4xl font-bold antialiased text-center text-stone-600 px-4">
		350 AV DE RÅESTE KONSULENTENE I MARKEDET UNDER SAMME TAK
	</h2>
</section>

<section
	class="flex flex-col md:flex-row m-12 md:m-24 max-w-7xl items-end justify-between gap-2"
	id="selskapene"
>
	<h2 class="text-[#E97A58] font-bold text-6xl header-decoration">SELSKAPENE</h2>
	<img src="https://www.overhuset.no/images/selskapene-deco.jpg" alt="" class="w-96 max-w-[50%]" />
</section>

<section class="flex flex-col items-center m-12 md:m-24 max-w-7xl">
	<p class="prose font-normal">
		Overhuset leverer spisskompetanse innenfor et bredt spekter av fagområder. Tjenestene leveres
		gjennom våre partnerselskaper som alle har spesialisert seg på å være ledende fagmiljøer med
		spiss- og seniorkompetanse innenfor sine respektive fagfelt. Se på de enkelte selskapene for
		detaljer.
	</p>
	<CompanyList />
</section>

<section
	class="flex flex-col w-full max-w-7xl half-o text-white px-12 md:px-24 py-20 gap-12"
	id="om_oss"
>
	<h3 class="text-4xl header-decoration">OM OSS</h3>
	<p>
		Overhuset er et samarbeid mellom små og mellomstore konsulentselskaper. Sammen tilbyr vi vår
		spisskompetanse direkte til større kunder. Disse kundene opererer ofte med rammeavtaler, hvor
		små selskaper kan være diskvalifisert i utgangspunktet. Kundene var svært godt fornøyd med våre
		konsulenter, da de ble leid inn via større konsulentselskaper. Vil vil gjøre dem enda mer
		fornøyde ved å sørge for at våre kunder kan ha avtaler direkte med oss. Da får de den
		spisskompetansen de er ute etter. Uten bortkastet mellomledd.
	</p>
	<h3 class="text-4xl header-decoration">VÅR KVALITETSPOLITIKK</h3>
	<p>
		Vår kvalitetspolitikk skal bidra til å sikre høy kvalitet i våre tjenesteleveranser, og at vi
		forvalter våre oppgaver overfor eiere, partnere, kunder, samarbeidspartnere på en profesjonell
		og tillitsvekkende måte.<br /><br />
		Overhuset skal tilby de beste konsulentene i markedet til våre kunder, og levere tjenester med en
		kvalitet som tilfredsstiller krav og forventninger fra kunder og samarbeidspartnere.
		<br />
		<br />
		For å få dette til skal vi:<br />
		• Utføre våre oppdrag i henhold til kundens krav og betingelser<br />
		• Levere de tjenester våre kunder ønsker<br />
		• Følge lover, forskrifter og etiske retningslinjer<br />
		• Lære av våre feil<br />
		• Involvere partnere og samarbeidspartnere på en måte som sikrer forståelse for, identifisering og
		gjennomføring av vårt kvalitetsarbeid<br />
		• Dokumentere vårt arbeid med kvalitet; ha kvalitetsarbeid på dagsorden, samt ha fokus på kvalitetsmål
		i alle ledd i selskapet<br />
		• Ha et kvalitetssystem som tilfredsstiller kravene i NS-EN ISO 9001:2015
		<br />
		<br />
		Dette skal vi oppnå ved kontinuerlig forbedring av alle prosesser og rutiner som er etablert i Overhuset.<br
		/>
	</p>
</section>

<section class="flex flex-col-reverse md:flex-row m-12 md:m-24">
	<img src="https://www.overhuset.no/images/heading-test.jpg" class="w-96" alt="" />
	<div class="pl-12">
		<h3 class="text-4xl font-source font-bold text-[#729089]">Kunnskapsdeling</h3>
		<p class="mt-12 pr-8 md:text-right border-r-[3px] border-[#729089]">
			Overhuset har sterk tro på deling av kunnskap. Ingen blir bedre av å ruge på egen viten.
			Fagaktiviteter på tvers av selskapene gir oss selv og våre kunder stadige kunnskapsløft.
		</p>
	</div>
</section>

<section class="flex flex-col md:flex-row m-12 md:m-24 gap-12">
	<div class="flex flex-col gap-20">
		<h3 class="text-4xl font-source font-bold text-[#E97A58] text-right">
			Spesialistene på ett sted
		</h3>
		<p class="pl-8 border-[#E97A58] border-l-[3px]">
			De skarpeste fagmiljøene som dyrker spisskompetansen på lag med andre som er best i sine
			grener. Tilgang til eksperter på mange fagområder. Uten omveier.
		</p>
	</div>
	<img src="https://www.overhuset.no/images/quote-working.jpg" class="w-64" alt="" />
</section>
