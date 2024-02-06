<script>
	import { onMount } from 'svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import QRCode from 'qrcode';

	export let introduksjonsTekst; // Typen antas å være en streng
	export let tittel; // Typen antas å være en streng
	export let regissor; // Typen antas å være en streng
	export let stjerner; // Typen antas å være en streng
	export let utgivelsesdato; // Typen antas å være en streng
	export let link; // Typen er en streng (URL)
	export let bakgrunnsBilde; // Prop for bakgrunnsbilde

	let qrCodeURL = '';
	let qrCodeSize = 'w-32 md:w-48 lg:w-64'; // Juster størrelsen etter behov

	// Funksjon for å generere QR-kode basert på bestillingslenken
	async function generateQRCode() {
		try {
			qrCodeURL = await QRCode.toDataURL(link);
		} catch (error) {
			console.error('Feil ved generering av QR-kode:', error);
		}
	}

	onMount(() => {
		generateQRCode();
	});
</script>

<!-- Setter meta-tags for siden med tittel som prop -->
<MetaTags title={tittel} />

<!-- Rendering av komponenten -->
<div id="kino" class="flex flex-col items-center justify-center min-h-screen bg-no-repeat bg-current bg-contain bg-top md:bg-center"
		 style="background-image: url({bakgrunnsBilde});">
	<!-- Hele div-en, inkludert både øvre og nedre halvdel, vil ha bakgrunnen -->
	<!-- Innholdet vil bli sentrert vertikalt og horisontalt -->

	<!-- Delen for introduksjonstekst -->
	<div id="intro" class="flex items-center h-1/3">
		<h1 class="text-4xl md:text-6xl lg:text-8xl text-white text-center">{introduksjonsTekst}</h1>
	</div>

	<!-- Delen for informasjonstekst og QR-kode -->
	<div id="info"
			 class="flex flex-col h-5/6 md:flex-row md:justify-between md:p-8 w-full md:h-1/3 mt-auto md:bg-transparent">
		<!-- Venstre side for tekst og lenker -->
		<div id="info-text" class="text-center m-2 md:w-2/3 md:text-left mb-8 md:mb-0">
			<!-- Setter inn prop for tittel -->
			<h2 class="text-2xl mb-2 md:mb-6 md:text-3xl lg:text-4xl font-bold text-white">{tittel}</h2>
			<!-- Setter inn props for utgivelsesdato, regissør og stjerner -->
			<p class="mb-4 md:text-2xl lg:text-3xl text-white">Utgivelsesdato: {utgivelsesdato}</p>
			<p class="mb-4 md:text-2xl lg:text-3xl text-white">Regissør: {regissor}</p>
			<p class="mb-4 md:text-2xl lg:text-3xl text-white">Stjerner: {stjerner}</p>
			<!-- Legg til andre lenker ved behov -->
			{#if link}
				<a href={link} class="text-blue-500 md:text-2xl lg:text-3xl hover:underline">
					Bestill billetter her
				</a>
			{/if}
		</div>
		<!-- Høyre side for QR-kode -->
		<div id="qr-code" class="flex justify-center items-center m-6 md:w-1/3">
			<!-- Viser QR-kode hvis qrCodeURL er satt -->
			{#if qrCodeURL}
				<img class="block md:ml-0 md:mb-0 {qrCodeSize}" src={qrCodeURL} alt="QR-kode for bestillingslenke" />
			{:else}
				<!-- Kan vise melding her mens QR-kode genereres (eller om den feiler) -->
				<p class="text-white"></p>
			{/if}
		</div>
	</div>
</div>
