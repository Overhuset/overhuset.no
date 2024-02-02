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

<!-- Render komponenten -->
<div class="flex flex-col items-center justify-center h-screen">
	<!-- Hele div-en, inkludert både øvre og nedre halvdel, vil ha bakgrunnen -->
	<div
		class="w-3/5 h-full"
		style="background-image: url('/assets/dune.png'); background-size: cover; background-position: center;"
	>
		<div class="flex justify-between w-full h-1/2"></div>
		<!-- Tom øvre halvdel -->
		<div class="flex justify-between w-full h-1/2 p-8 bg-gray-200 border-t-2 border-gray-400">
			<!-- Venstre side for tekst og lenker -->
			<div class="info-text">
				<!-- Setter inn prop for tittel -->
				<h2 class="text-xl font-bold">{tittel}</h2>
				<!-- Setter inn props for utgivelsesdato, regissør og stjerner -->
				<p class="mb-2">Utgivelsesdato: {utgivelsesdato}</p>
				<p class="mb-2">Regissør: {regissor}</p>
				<p class="mb-2">Stjerner: {stjerner}</p>
				<!-- Legg til andre lenker ved behov -->
				{#if bestillingsLink}
					<a href={bestillingsLink} class="text-blue-500 hover:underline"
						>Foreløpig link til {tittel}</a
					>
				{/if}
			</div>
			<!-- Høyre side for QR-kode -->
			<div class="qr-code">
				<!-- Viser QR-kode hvis qrCodeURL er satt -->
				{#if qrCodeURL}
					<img src={qrCodeURL} alt="QR-kode for bestillingslenke" />
				{:else}
					<!-- Viser melding om QR-kode genereres -->
					<p>Genererer QR-kode...</p>
				{/if}
			</div>
		</div>
	</div>
</div>
