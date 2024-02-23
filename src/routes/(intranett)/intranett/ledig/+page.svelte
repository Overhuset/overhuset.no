<script lang="ts">
	import type {Vacant} from "$lib/types.js";
	import {invalidateAll} from "$app/navigation";
	import VacantCard from "./VacantCard.svelte";
	import collapse from 'svelte-collapse'
 	import CvFileUpload from "./CvFileUpload.svelte";
	let open = false

	export let data;
	export let actions;
	export let form;

	const api = '/api/vacant';
	const headers = {'content-type': 'application/json'};
 	let newVacant: Vacant | undefined = undefined;
	let cvLoading = false;

	 const sortVacantList = (by: "firstName" | "vacantFrom" | "createdAt") => {
		 const clone = [...data.vacantList];
		 switch (by) {
			 case "firstName" : return clone.sort((v1: Vacant, v2: Vacant) =>  (v1.name || "").localeCompare(v2.name || ""));
			 case "vacantFrom" : return clone.sort((v1: Vacant, v2: Vacant) =>  (v1.vacantFrom || "").localeCompare(v2.vacantFrom || ""));
			 case "createdAt" : return clone.reverse();// created at, newest first
			 default: return clone;
		 }
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
			const body = JSON.stringify( id );
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




<div class="prose prose-xl mx-auto p-4 md:py-20">
	<div class="layout">
		<h1 class="text-5xl">Ledige konsulenter</h1>

		<div>
			{#if !open}
				<div class="buttons-container">
					<button on:click={handleToggleNewForm} class="cursor-pointer rounded-lg bg-white px-2 py-1"> Legg til konsulent</button>
				</div>
			{/if}

			<div use:collapse={{open}}>
				{#if !!newVacant}
					<h3>Registrer ledig konsulent</h3>

					<form on:submit|preventDefault={handleNewEntry}>
						<label for="name">Navn *</label>
						<input name="name" id="name" type="text" bind:value={newVacant.name}/>
						<label for="from">Ledig fra *</label>
						<input name="from" id="from" type="date" bind:value={newVacant.vacantFrom}/>
						<label for="comment">Beskrivelse / kompetanse</label>
						<textarea bind:value={newVacant.comment}/>
						<CvFileUpload
							form={form}
							onChange={handleFileUploaded}
							onLoadingStateChange={handleLoadingStateChange}
						/>

						<div class="buttons-container">
							<button class="secondaryButton" on:click={handleToggleNewForm}>Avbryt</button>
							<button class="primaryButton" disabled={
								!newVacant.name ||
								!newVacant.vacantFrom ||
								!newVacant.createdBy ||
								cvLoading
							}>Registrer konsulent</button>
						</div>
					</form>
				{/if}
			</div>

			<br/>
			<br/>

			<div class="list">
				{#each data.vacantList as vacant}
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
	input[type="file"] {
		display:none;
	}
	input[type="text"]{
		width: 70%;
	}
	label {
		margin-top: 0.3rem;
		margin-right: 2rem;
	}
	textarea {
		border: 1px solid #ababab;
		border-radius: 0.3rem;
		width: 100%;
		min-height: 9rem;
		padding: 0.2rem 0.4rem;
	}
	button {
		padding: 0.2rem 0.8rem;
		border-radius: 0.5rem;
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
	.primaryButton {
		color: white;
		background-color: rgb(115, 66, 13);
	}
	.primaryButton:disabled {
		opacity: 0.4;
	}
	.secondaryButton {
		border: 1px solid silver;
		color: #4d4d4d;
	}
	.buttons-container {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}
</style>

