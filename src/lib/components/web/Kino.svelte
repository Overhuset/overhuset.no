<script>
	import { MetaTags } from 'svelte-meta-tags';

	export let introduksjonsTekst; // Typen antas å være en streng
	export let tittel; // Typen antas å være en streng
	export let regissor; // Typen antas å være en streng
	export let stjerner; // Typen antas å være en streng
	export let utgivelsesdato; // Typen antas å være en streng
	export let link1; // Typen er en streng (URL)
	export let link2; // Typen er en streng (URL)
	export let bakgrunnsBilde; // Prop for bakgrunnsbilde


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
			{#if link1}
				<p class="mb-4 md:text-2xl lg:text-3xl text-white">
					<a href={link1} class="text-blue-500 md:text-2xl lg:text-3xl hover:underline">
						Bestill første forestilling her
					</a>
				</p>
			{/if}
			{#if link2}
				<p class="mb-4 md:text-2xl lg:text-3xl text-white">
					<a href={link2} class="text-blue-500 md:text-2xl lg:text-3xl hover:underline">
						Bestill andre forestilling her
					</a>
				</p>
			{/if}
		</div>
	</div>
</div>
