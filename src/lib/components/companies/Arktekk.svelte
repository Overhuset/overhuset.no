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
		Arktekk er "Scala-sjappa" i Norge. Hos oss finner du eksperter på Scala og funksjonell
		programmering. Vårt fokus er fag. Vi dyrker et fagmiljø som alltid vil være med på lasset inn
		til alle våre kunder.<br /><br />Hvert år arrangerer vi den internasjonalt anerkjente
		konferansen flatpMap(Oslo), som gjester entusiaster for funksjonell programmering fra hele
		verden.<br /><br />
	</p>
	<h3>Fagområder</h3>
	<p>
		<strong> Scala og funksjonell programmering. </strong>
	</p>
</div>
