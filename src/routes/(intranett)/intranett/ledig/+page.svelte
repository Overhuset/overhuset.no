<script lang="ts">
	import type {Vacant} from "$lib/types.js";
	import {invalidateAll} from "$app/navigation";
	import VacantCard from "./VacantCard.svelte";
	import collapse from 'svelte-collapse';
 	import CvFileUpload from "./CvFileUpload.svelte";
	import {Button, Input, Textarea} from "flowbite-svelte";
	let open = false

	export let data;
	export let actions;
	export let form;

	const api = '/api/vacant';
	const headers = {'content-type': 'application/json'};
 	let newVacant: Vacant | undefined = undefined;
	let cvLoading = false;

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
			if (response.status !== 200) alert("Sletting feilet");
			invalidateAll();
		}
	}

	const handleNewEntry = async () => {
		if (newVacant) {
 			const body = JSON.stringify( {...newVacant});
			const response = await fetch(api, {method: 'POST', body, headers});
			if (response.status !== 200) alert("Legge til feilet");
			onCloseForm();
			invalidateAll();
		}
	}

	const handleChangeEntry = async (changedVacant: Vacant) => {
		if (changedVacant) {
			const body = JSON.stringify({...changedVacant});
			const response = await fetch(api, {method: 'POST', body, headers});
			if (response.status !== 200) alert("Endre feilet");
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
	<div class="layout">
		<h1 class="text-5xl">Ledige konsulenter</h1>

		<div>
			{#if !open}
				<div class="buttons-container">
					<Button on:click={handleToggleNewForm}>Legg til konsulent</Button>
				</div>
			{/if}

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

			<br/>
			<br/>

			<div class="list">
				{#each data.vacantList as vacant (vacant.id)}
					<VacantCard
						vacant={vacant}
						email={data.email}
						form={form}
						onDelete={handleDeleteEntry}
						onChange={handleChangeEntry}
						onChangeToggle={handleChangeToggle}
					/>
				{/each}
				{#if data.vacantList.length === 0}
					Ingen ledige konsulenter! :D
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	input {
		border: 1px solid #ababab;
		border-radius: 0.3rem;
		padding: 0.2rem 0.4rem;
		margin-bottom: 0.4rem;
	}
	input[type="text"]{
		width: 70%;
	}
	label {
		margin-top: 0.3rem;
		margin-right: 2rem;
	}
	.layout {
		width: 100%;
		max-width: 70rem;
	}
	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.buttons-container {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}
</style>

