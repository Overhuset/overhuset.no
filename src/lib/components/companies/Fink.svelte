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
		Hos Fink finner du en gjeng nerder som elsker det de gjør. Fink er laget av de ansatte, for de
		ansatte, eid av de ansatte. <br /><br />Fink ønsker å være kontrast til det som noen ganger kan
		oppfattes som en kald konsulentverden. Kjerneverdier er inkluderende, varme og nysgjerrig.<br
		/><br />
	</p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			Swift, iOS, Android, Flutter, Python, Java, JavaScript, UX, Tjenestedesign, Grafisk Design,
			NodeJS, React, Vue
		</strong>
	</p>
</div>
