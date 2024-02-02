<script>
	import { onMount } from 'svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import QRCode from 'qrcode';

	// Definerer props for bestillingslenke, utgivelsesdato, regissør, stjerner og tittel
	export let bestillingsLink; // Typen er en streng (URL)
	export let utgivelsesdato; // Typen antas å være en streng
	export let regissor; // Typen antas å være en streng
	export let stjerner; // Typen antas å være en streng
	export let tittel; // Typen antas å være en streng

	// Oppretter en variabel for QR-kode URL
	let qrCodeURL = '';

	// Funksjon for å generere QR-kode basert på bestillingslenken
	async function generateQRCode() {
		try {
			qrCodeURL = await QRCode.toDataURL(bestillingsLink);
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
<div class="flex flex-col items-center justify-center h-screen">
	<!-- Hele div-en, inkludert både øvre og nedre halvdel, vil ha bakgrunnen -->
	<div class="w-3/5 h-full" style="background-image: url('/assets/dune.png'); background-size: cover; background-position: center; height: 100vh;">
		<div class="flex justify-between w-full h-3/4"></div> <!-- Tom øvre halvdel -->
		<div class="flex justify-around h-1/4 p-8" style="background-color: rgba(255, 255, 255, 0);">
			<!-- Venstre side for tekst og lenker -->
			<div class="info-text">
				<!-- Setter inn prop for tittel -->
				<h2 class="text-xl font-bold text-white">{tittel}</h2>
				<!-- Setter inn props for utgivelsesdato, regissør og stjerner -->
				<p class="mb-2 text-white">Utgivelsesdato: {utgivelsesdato}</p>
				<p class="mb-2 text-white">Regissør: {regissor}</p>
				<p class="mb-2 text-white">Stjerner: {stjerner}</p>
				<!-- Legg til andre lenker ved behov -->
				{#if bestillingsLink}
					<a href={bestillingsLink} class="text-blue-500 hover:underline">Link: {tittel}</a>
				{/if}
				<!-- Legg til andre lenker ved behov -->
			</div>
			<!-- Høyre side for QR-kode -->
			<div class="qr-code">
				<!-- Viser QR-kode hvis qrCodeURL er satt -->
				{#if qrCodeURL}
					<img src={qrCodeURL} alt="QR-kode for bestillingslenke" />
				{:else}
					<!-- Viser melding om QR-kode genereres -->
					<p class="text-white">Genererer QR-kode...</p>
				{/if}
			</div>
		</div>
	</div>
</div>
