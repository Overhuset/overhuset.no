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
		Forse er et norsk konsulentselskap. Vår spesialkompetanse er Microsoft .NET og mobilutvikling.
		Vi er et selskap som verdsetter mennesker, kunnskap og det sosiale, ved siden av et absolutt
		krav til høyt faglig nivå hos våre ansatte. Som utvikler i Forse vet kundene at du har lang
		erfaring, ekspertkompetanse og at du er del av et meget sterkt fagmiljø, som har riktig fokus og
		er vel ansett i markedet.<br /><br />Ordet forse betyr styrke eller spesialitet, og dette er vår
		grunnverdi. Vår forse er kunnskap. De ansatte hos oss får frihet til å jobbe med sin styrke, og
		med å utvikle seg innen sitt spesialfelt. Vi ansetter kun de beste. På denne måten blir vi de
		beste innen vårt felt.<br /> <br />Forse har lokaler på Lysaker og jobber primært med spennende
		kunder i det sentrale Østlandsområdet.<br /><br />
	</p>
	<h3>Fagområder</h3>
	<p>
		<strong> .Net og mobilutvikling </strong>
	</p>
</div>
