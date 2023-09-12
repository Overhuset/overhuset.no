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
		Deepinsight er et konsulentselskap som spesialiserer seg på å levere tjenester for å skape verdi
		fra data. Vår ekspertise dekker AI (kunstig intelligens) og maskinlæring, data-infrastruktur og
		data-strategi. Våre ansatte har god erfaring i å designe, bygge, produksjonssette, monitorere og
		vedlikeholde maskinlæringsmodeller.<br /><br />Våre ansatte dekker til sammen de tre
		nøkkelkompetanseområdene forretningsforståelse, matematikk og statistikk, og software-utvikling,
		som kreves for å produksjonssette løsninger som gir verdi fra data.<br /><br />Vår visjon er å
		bygge løsninger basert på matematikk og kode som skaper verdi for samfunnet. Vi har som mål å
		skape et sted hvor nerder trives gjennom å utvikle seg og lære mest mulig.
	</p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			Maskinlæring, data-strategi, data-analyse, data-infrastruktur, Python, Java, C++, skyløsninger
			(Google Cloud Platform, Azure, AWS), Kubernetes, Docker, SQL, BigQuery.
		</strong>
	</p>
</div>
