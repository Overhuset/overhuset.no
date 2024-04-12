<script lang="ts">
	import {Accordion} from "@skeletonlabs/skeleton";
	import {invalidateAll} from "$app/navigation";
	import {
		Badge,
		Button,
		P,
		Radio,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		Tooltip,
	} from "flowbite-svelte";
	import type {Constellation} from "$lib/types";
	import { toasts, ToastContainer, FlatToast }  from "svelte-toasts";
 	import {PlusOutline} from "flowbite-svelte-icons";
	import ConstellationAccordionItem from "./ConstellationAccordionItem.svelte";
	import {sortConstellations} from "./utils";

	const api = '/api/constellation';
	const headers = {'content-type': 'application/json'};

	export let data;
	export let actions;

	let sort:"name" | "createdAt" = 'name';

	const onToast = (type: "success" | "info" | "error", message: string) => {
		toasts.add({
			description: message,
			duration: 3000,
			placement: 'bottom-right',
			type: type,
			theme: 'light',
		});
	}

	const handleNewConstellation = async () => {
		const constellation: Constellation = {
			name: `*NY*`,
			createdBy: data.authUser?.email,
		};

		const body = JSON.stringify(constellation);
		const response = await fetch(api, {method: 'POST', body, headers});

		if (response.status == 200) {
			onToast("success", "Konstellasjon opprettet");
			sort = "createdAt";
		} else {
			onToast("error", "En feil oppstod ved opprett konstellasjon");
		}

		invalidateAll();
	}

	const handleChangeConstellation = async (constellationChanged: Constellation) => {
		if (constellationChanged) {
			const body = JSON.stringify({...constellationChanged});
			const response = await fetch(api, {method: 'PUT', body, headers});

			if (response.status == 200) {
				onToast("success", "Endringer lagret");
			} else {
				onToast("error", "En feil oppstod ved lagring");
			}

			invalidateAll();
		}
	}

	const handleRevertConstellation = () => {
		onToast("info", "Endringer forkastet");
	}

	const handleDeleteConstellation = async (id: string) => {
		if (id) {
			const body = JSON.stringify(id);
			const response = await fetch(api, {method: 'DELETE', body, headers});

			if (response.status == 200) {
				onToast("success", "Konstellasjon slettet");
			} else {
				onToast("error", "En feil oppstod ved sletting");
			}

			invalidateAll();
		}
	}
</script>

<div class="prose prose-xl mx-auto p-4 md:py-20" style="max-width:140ch">
	<div class="title">
		<P lineHeight="0" size="3xl" color="dark" weight="thin">Administrer</P>
		<P size="3xl" color="dark">Konstellasjoner</P>
	</div>

	<div class="buttons-container">
		{#key sort}
			<Badge large rounded color="dark">
				<div class="flex gap-4 m-3">
					<div class="min-w-20"> Sortering:</div>
					<Radio bind:group={sort} value="name">Navn</Radio>
					<Radio bind:group={sort} value="createdAt">Opprettet</Radio>
				</div>
			</Badge>
		{/key}

		{#if data.authUser?.admin}
			<Button pill={true} id="new" on:click={handleNewConstellation} class="!p-2"><PlusOutline class="w-8 h-8" /></Button>
			<Tooltip type="light" placement="top" triggeredBy="[id='new']">Opprett en ny konstellasjon og fortsett redigering ved å velge den i listen nedenfor</Tooltip>
		{/if}
	</div>

	{#key sort}
		<Table hoverable={true}>
			<TableBody>
				{#each sortConstellations(data.constellationList, sort) as constellation (constellation.id)}
					<TableBodyRow>
						<TableBodyCell>
							<Accordion>
								<ConstellationAccordionItem
									constellation={constellation}
									authUser={data.authUser}
									companies={data.companyList}
									onChange={handleChangeConstellation}
									onDelete={handleDeleteConstellation}
									onRevert={handleRevertConstellation}
								/>
							</Accordion>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	{/key}

	<ToastContainer placement="bottom-right" let:data={data}>
		<FlatToast {data} />
	</ToastContainer>
</div>

<style>
	.title {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		gap:0.4rem;
	}
 	.buttons-container {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}
</style>

