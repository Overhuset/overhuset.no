<script lang="ts">
	import type {Vacant} from "$lib/types.js";
	import {invalidateAll} from "$app/navigation";
	import collapse from 'svelte-collapse';
	import {
		Button,
		Input,
		P,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		Textarea,
		Tooltip,
	} from "flowbite-svelte";
	import {FlatToast, ToastContainer, toasts} from "svelte-toasts";
	import {PlusOutline} from "flowbite-svelte-icons";
	import CvFileUpload from "./CvFileUpload.svelte";
	import VacantAccordionItem from "./VacantAccordionItem.svelte";
	import {Accordion} from "@skeletonlabs/skeleton";
	let open = false

	export let data;
	export let actions;
	export let form;

	const api = '/api/vacant';
	const headers = {'content-type': 'application/json'};
	let newVacant: Vacant | undefined = undefined;
	let cvLoading = false;

	const onToast = (type: "success" | "info" | "error", message: string) => {
		toasts.add({
			description: message,
			duration: 3000,
			placement: 'bottom-right',
			type: type,
			theme: 'light',
		});
	}


	const onCloseForm = () => {
		open = false;
		newVacant = undefined;

		if (form) {
			form.uploaded = "";
		}
	}

	const onOpenForm = () => {
		open = true;
		newVacant = { createdBy: data?.email};
	}

	const handleToggleNewForm = () => {
		if (!!newVacant) {
			onCloseForm();
		} else {
			onOpenForm();
		}
	}

	const handleDeleteEntry = async (id: string) => {
		if (id) {
			const body = JSON.stringify(id);
			const response = await fetch(api, {method: 'DELETE', body, headers});
			if (response.status !== 200) {
				onToast("error", "Sletting feilet");
			} else {
				onToast("success", "Sletting utført");
			}

			invalidateAll();
		}
	}

	const handleNewEntry = async () => {
		if (newVacant) {
			const body = JSON.stringify( {...newVacant});
			const response = await fetch(api, {method: 'POST', body, headers});

			if (response.status !== 200) {
				onToast("error", "Legge til feilet");
			} else {
				onToast("success", "Lagt til");
			}

			onCloseForm();
			invalidateAll();
		}
	}

	const handleChangeEntry = async (changedVacant: Vacant) => {
		if (changedVacant) {
			const body = JSON.stringify({...changedVacant});
			const response = await fetch(api, {method: 'POST', body, headers});
			if (response.status !== 200) alert("Endre feilet");

			if (response.status !== 200) {
				onToast("error", "Endre feilet");
			} else {
				onToast("success", "Endret til");
			}

			invalidateAll();
		}
	}

	const handleChangeToggle = () => {
		onCloseForm();
	}

	const handleFileUploaded = (path: string) => {
		newVacant = {...newVacant, cv: path};
	}

	const handleLoadingStateChange = (loading: boolean) => {
		cvLoading = loading;
	}

</script>


<div class="prose prose-xl mx-auto p-4 md:py-20" style="max-width:140ch">
	<div class="title">
		<P lineHeight="0" size="3xl" color="dark" weight="thin">Administrer</P>
		<P size="3xl" color="dark">ledige konsulenter</P>
	</div>

	<div class="buttons-container">
		<Button pill={true} id="new" on:click={handleToggleNewForm} class="!p-2"><PlusOutline class="w-8 h-8" /></Button>
		<Tooltip type="light" placement="top" triggeredBy="[id='new']">Registrer ledig konsulent</Tooltip>
	</div>

	<div use:collapse={{open}}>
		{#if !!newVacant}
			<h3>Registrer ledig konsulent</h3>

			<form on:submit|preventDefault={handleNewEntry}>
				<label for="name" color="dark">Navn *</label>
				<Input clor="base" name="name" id="name" type="text" bind:value={newVacant.name}/>
				<label for="from">Ledig fra *</label>
				<Input name="from" id="from" type="date" bind:value={newVacant.vacantFrom}/>
				<label for="comment">Beskrivelse / kompetanse</label>
				<Textarea bind:value={newVacant.comment} rows="10"/>
				<CvFileUpload
						form={form}
						id="new"
						onChange={handleFileUploaded}
						onLoadingStateChange={handleLoadingStateChange}
				/>

				<div class="buttons-container">
					<Button color="primary" on:click={handleToggleNewForm}>Avbryt</Button>
					<Button type="submit" color="primary" disabled={
								!newVacant.name ||
								!newVacant.vacantFrom ||
								!newVacant.createdBy ||
								cvLoading
							}>Registrer konsulent</Button>
				</div>
			</form>
		{/if}
	</div>


		<Table hoverable={true}>
			<TableBody>
				{#each (data.vacantList) as vacant (vacant.id)}
					<TableBodyRow>
						<TableBodyCell>
							<Accordion>
							<VacantAccordionItem
								vacant={vacant}
								email={data.email}
								form={form}
								onDelete={handleDeleteEntry}
								onChange={handleChangeEntry}
							/>
							</Accordion>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>

		{#if data.vacantList.length === 0}
			Ingen ledige konsulenter! :D
		{/if}


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
		justify-content: flex-end;
		margin-bottom: 1.5rem;
		gap:1rem;
	}
</style>

