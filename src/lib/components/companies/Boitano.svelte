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
		Boitano er et partnerskap med 45 erfarne teknologer og forretningsutviklere som jobber i
		prosjekter hos noen av Norges største selskap.<br /><br />
	</p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			.Net-utvikling, arkitektur, design, interaksjonsdesign, konsept- og forretningsutvikling,
			teknologi-, prosess- og personalledelse.
		</strong>
	</p>
</div>
