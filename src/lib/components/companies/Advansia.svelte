<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<p>
		Advansia er en ledende rådgivnings- og ingeniørvirksomhet som tilbyr fremtidsrettede og
		bærekraftige løsninger, gjennom å kombinere vår lange erfaring med nytenkning og en helhetlig
		tilnærming. Vi er 600 dedikerte og modige lagspillere som er involvert i et mangfold av
		prosjekter av stor samfunnsmessig betydning i sektorene bygg og anlegg, energi og industri.
	</p>
	<p>Les mer om oss her: <a {href}>{href}</a></p>
	<h3>Fagområder</h3>
	<p>
		<strong>IT-sikkerhet</strong>
	</p>
</div>
