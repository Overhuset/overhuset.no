<script lang="ts">
	import { Button, Card, P } from 'flowbite-svelte';
	import { ArrowRightOutline, FileCopyOutline } from 'flowbite-svelte-icons';
	import { FlatToast, ToastContainer, toasts } from 'svelte-toasts';

	export let company;
	export let constellationList;

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

<div>
	<P size="3xl" color="dark">	{company.name}</P>
	<P lineHeight="0" size="3xl" color="dark" weight="thin" style="margin-bottom:0.5rem">
		Del av følgende konstellasjoner
	</P>

	{#each constellationList as constellation (constellation.id)}
			<Card size="xl" style="width: 100%; margin-bottom: 1.5rem">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{constellation.name}
				</h5>

				<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight" style="margin-top:-0.4rem">
					{constellation.description || "Beskrivelse Mangler"}
				</p>

				<div class="spaceBetween">
					<Button class="w-fit" on:click={() => handleCopyToClipboard(`${location.protocol}//${window.location.hostname}/${constellation.urlRef}`)}>
						<FileCopyOutline class="w-5 h-5 me-2" /> Kopier link
					</Button>

					<Button class="w-fit" href={`/${constellation.urlRef}`}>
						Gå til detaljer <ArrowRightOutline class="w-6 h-6 ms-2 " />
					</Button>
				</div>

			</Card>
	{/each}

	<ToastContainer placement="bottom-right" let:data={data}>
		<FlatToast {data} />
	</ToastContainer>
</div>

<style>
    .spaceBetween {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1.5rem;
    }
</style>
