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
		Miles er et IT-konsulentselskap med kontorer i Oslo, Bergen, Stavanger, Trondheim og Vilnius. Vi
		startet i 2005 av og for konsulenter med en visjon om å være en fremragende arbeidsplass basert
		på verdiene faglig autoritet og varme.<br /><br />Våre konsulenter er kjent for å holde et høyt
		faglig nivå med gode mellommenneskelige egenskaper. Ved hjelp av flat struktur, tillit og
		verdiene våre har vi skapt en unik formel som funker. Vi er primært et fagmiljø med
		seniorkonsulenter og leverer spisskompetanse fremfor volum.<br /><br />I Miles praktiserer vi
		«Beyond Budgeting» som innebærer at vi ikke har noen begrensninger i form av budsjetter. Dette
		vil si at alle våre konsulenter har betydelig frihet og et stort mulighetsrom for egen
		kompetanseutvikling og kan gå på hvilket kurs, sertifiseringer og konferanser de selv ønsker,
		som del av vår kontinuerlige kompetanseutvikling.<br /><br />Vårt største kontor holder til i
		Bislett gata i Oslo med spennende kunder innen både privat og offentlig sektor.<br /><br />
	</p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			Systemutvikling (Java og .Net), arkitektur, UX, prosjektledelse, testledelse, smidig
			produktutvikling, stordata, kunstig intelligens og rådgivning.
		</strong>
	</p>
</div>
