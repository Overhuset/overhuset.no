<script lang="ts">
	import { Button, Card, P, Popover } from 'flowbite-svelte';
	import type { Company, Constellation } from '$lib/types';
	import { ArrowRightOutline, FileCopyOutline } from 'flowbite-svelte-icons';
	import { toasts } from 'svelte-toasts';
	import SVGImageRender from '$lib/components/common/SVGImageRender.svelte';
	import ConstellationCardHeader from './ConstellationCardHeader.svelte';

	export let constellation: Constellation;
	export let companies: Company[];


	const handleCopyToClipboard = (url: string) => {
		navigator.clipboard?.writeText(url);
		onToast("success", `${url} - Lenke kopiert.`)
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

	<div style="margin-top:-3.5rem">
		<P lineHeight="0" size="2xl" color="dark" weight="thin" style="margin-bottom:0.5rem">
			{constellation.description}
		</P>
	</div>

	<div class="grid xs: grid-cols-2 sm:grid-cols-2 md:grid-cols-3 md:gap-1">
		{#each companies as company}
				{#if constellation?.companies?.includes(company?.id || "")}
 					<a id={`${company?.nameShort}`}
						 href={`/konsulentselskap/${company?.nameShort?.toLowerCase()}`}
						 class="flex justify-center items-center min-h-[90px] md:last:col-start-3 md:[&:nth-last-child(2)]:col-start-2">
						<SVGImageRender svgString={company?.logo} styleClass="w-20" />
						<Popover class="w-64 text-sm font-normal " triggeredBy={`#${company?.nameShort}`}>Gå til offentlig presentasjon av selskap</Popover>
					</a>
				{/if}
		{/each}
	</div>

	<br/>

	<div class="rowDirection">
		<Button class="w-fit" href={`/${constellation.urlRef}`}>
			Gå til offentlig konstellasjon-side <ArrowRightOutline class="w-6 h-6 ms-2 " />
		</Button>

		<Button class="w-fit" on:click={() => handleCopyToClipboard(`${location.protocol}//${window.location.hostname}/${constellation.urlRef}`)}>
			<FileCopyOutline class="w-5 h-5 me-2" /> Kopier lenke
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
