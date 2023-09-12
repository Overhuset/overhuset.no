<script lang="ts">
	import type { ModalProps } from '@skeletonlabs/skeleton/dist/utilities/Modal/Modal.svelte';
	import CompanyHeader from './CompanyHeader.svelte';

	export let parent: ModalProps;
	export let imgSrc: string;
	export let href: string;

	function handleClose() {
		if (parent?.onClose) parent.onClose();
	}
</script>

<div class="prose">
	<CompanyHeader {handleClose} {href} {imgSrc} />

	<p>
		Zenior er en etablert leverandør av tjenester innen systemutvikling og -arkitektur. Vi bistår
		våre kunder i å utvikle komplekse, skreddersydde IT-løsninger som krever dyp innsikt i både
		teknologi og metodikk.<br /><br />Alle våre konsulenter kombinerer lang erfaring med evnen til å
		være ledende i bruk av ny teknologi.<br /><br />
	</p>
	<h4>Fagområder</h4>
	<p>
		<strong>
			Utvikling av virksomhetskritiske IT-systemer, Teknologi- og arkitekturvalg, Tilpasning og
			forbedring av utviklingsprosesser, Oppsett og optimalisering av utviklingsmiljø, Etablering og
			effektivisering av driftsmiljø og prosesser, Java, Android, iOS, .Net
		</strong>
	</p>
</div>
