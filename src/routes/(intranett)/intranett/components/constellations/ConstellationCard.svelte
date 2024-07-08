<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';
 	import type { Constellation } from '$lib/types';
	import { ArrowRightOutline, FileCopyOutline } from 'flowbite-svelte-icons';
	import { toasts } from 'svelte-toasts';
	import SVGImageRender from '$lib/components/common/SVGImageRender.svelte';
	import ConstellationCardHeader from './ConstellationCardHeader.svelte';

	export let constellation: Constellation;


	const handleCopyToClipboard = (url: string) => {
		navigator.clipboard?.writeText(url);
		onToast("success", `${url} - kopiert til clipboard`)
	}

	const onToast = (type: "success" | "info" | "error", message: string) => {
		toasts.add({
			description: message,
			duration: 3000,
			placement: 'bottom-right',
			type: type,
			theme: 'light',
		});
	}
</script>

<Card size="xl" color="none" border={true} style="border: 1px solid rgb(107 114 128)">
	<ConstellationCardHeader constellation={constellation} />

	<div style="margin-top:-3rem">
		<SVGImageRender svgString={constellation?.logo} styleClass="w-36" />
	</div>


	<div class="rowDirection">
		<Button class="w-fit" on:click={() => handleCopyToClipboard(`${location.protocol}//${window.location.hostname}/${constellation.urlRef}`)}>
			<FileCopyOutline class="w-5 h-5 me-2" /> Kopier link
		</Button>

		<Button class="w-fit" href={`/${constellation.urlRef}`}>
			Gå til detaljer <ArrowRightOutline class="w-6 h-6 ms-2 " />
		</Button>
	</div>
</Card>


<style>
    .rowDirection {
				margin-top: -1rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
				align-items: flex-end;
				gap: 1rem;
        width: 100%;
				height: 100%;
    }
</style>
