<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<p>
		I AFRY jobber vi for å skape en forskjell med alt vi gjør – fra våre løsninger til å fremme en
		sunn balanse mellom arbeidsliv og fritid. Dette gjør vi for å akselerere den grønne omstillingen
		til et bærekraftig samfunn og realisere vår visjon: Making Future.
	</p>
	<p>Les mer om oss her: <a {href}>{href}</a></p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			Prosjektledelse, arkitektur, systemutvikling, scrum-master, sikkerhet, UX, interaksjons- og
			tjenestedesign
		</strong>
	</p>
</div>
