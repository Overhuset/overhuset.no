<script>
	import { MetaTags } from 'svelte-meta-tags';
	import Link from '$lib/components/web/Link.svelte';

	export let introduksjonsTekst; // Typen antas å være en streng
	export let tittel; // Typen antas å være en streng
	export let regissor; // Typen antas å være en streng
	export let stjerner; // Typen antas å være en streng
	export let utgivelsesdato; // Typen antas å være en streng
	export let tekst1; // Typen antas å være en streng
	export let link1; // Typen er en streng (URL)
	export let tekst2; // Typen antas å være en streng
	export let link2; // Typen er en streng (URL)
	export let bakgrunnsBilde; // Prop for bakgrunnsbilde
</script>

<MetaTags title={tittel} />

<div id="kino"
		 class="flex flex-col items-center justify-center min-h-screen bg-no-repeat bg-current bg-contain bg-top md:bg-center"
		 style="background-image: url({bakgrunnsBilde});">

		<h1 class="flex items-center h-1/3 text-4xl md:text-6xl lg:text-8xl text-white text-center">{introduksjonsTekst}</h1>

	<div id="info"
			 class="flex flex-col h-5/6 md:flex-row md:p-8 w-full md:h-1/3 mt-auto"
	>
		<div id="info-text" class="text-center m-2 md:w-2/3 md:text-left mb-8 md:mb-0">
			<h2 class="text-2xl mb-2 md:mb-6 md:text-3xl lg:text-4xl font-bold text-white">{tittel}</h2>
			<p class="mb-4 md:text-2xl lg:text-3xl text-white">Utgivelsesdato: {utgivelsesdato}</p>
			<p class="mb-4 md:text-2xl lg:text-3xl text-white">Regissør: {regissor}</p>
			<p class="mb-4 md:text-2xl lg:text-3xl text-white">Stjerner: {stjerner}</p>
			{#if link1 && tekst1}<Link tekst={tekst1} to={link1} />{/if}
			{#if link2 && tekst2}<Link tekst={tekst2} to={link2} />{/if}
		</div>
	</div>
</div>
