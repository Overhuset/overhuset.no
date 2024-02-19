<script lang="ts">
	import type {Vacant} from "$lib/types.js";
	import {invalidateAll} from "$app/navigation";
	import VacantRow from "./VacantCard.svelte";
	import collapse from 'svelte-collapse'
	import { enhance } from '$app/forms';
	let open = false

	export let data;
	export let actions;
	export let form;

	const api = '/api/vacant';
	const headers = {'content-type': 'application/json'};
 	let newVacant: Vacant | undefined = undefined;
	let fileSelect: string | undefined = undefined;
	let isUploadingCV: boolean = false;


	 const sortVacantList = (by: "firstName" | "vacantFrom" | "createdAt") => {
		 const clone = [...data.vacantList];
		 switch (by) {
			 case "firstName" : return clone.sort((v1: Vacant, v2: Vacant) =>  (v1.name || "").localeCompare(v2.name || ""));
			 case "vacantFrom" : return clone.sort((v1: Vacant, v2: Vacant) =>  (v1.vacantFrom || "").localeCompare(v2.vacantFrom || ""));
			 case "createdAt" : return clone.reverse();// created at, newest first
			 default: return clone;
		 }
	 }

	 const getCvShortName = () => {
		 if (fileSelect) {
			const split = fileSelect.split("\\");
 			return split[split.length-1];
		 }
		 return null;
	}

	const onCloseForm = () => {
		open = false;
		newVacant = undefined;
		fileSelect = undefined;
		isUploadingCV = false;
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


	const handleUploadStart = () => {
		isUploadingCV = true;
	}

	const handleNewEntry = async () => {
		if (newVacant) {
 			const body = JSON.stringify( {...newVacant, cv: form?.uploaded || null} );
			const response = await fetch(api, {method: 'POST', body, headers});
			if (response.status !== 200) alert("Legge til feilet");
			onCloseForm();
			invalidateAll();
		}
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
						<label for="comment">Kommentar</label>
						<textarea bind:value={newVacant.comment}/>

						<form use:enhance action="?/upload" method="POST" enctype="multipart/form-data">
							<label>CV - filen kan være på maks 4.5mb</label>
							<input type="file" bind:value={fileSelect} required name="cv" id="cv" class="cvInput"/>

							<div class="file-upload-container">
								<button class="secondaryButton" onClick="document.getElementById('cv').click();" style="min-width: 8rem">Velg en fil</button>
								<div class="file-select-container">
									{#if fileSelect}
										<span>{getCvShortName()}</span>
										{#if !form?.uploaded}
											<button class="primaryButton" style="margin-left: 1rem" on:click={handleUploadStart}>
												{#if isUploadingCV}laster...{:else}Last opp{/if}
											</button>
										{:else}
											(lastet opp)
										{/if}
									{/if}
								</div>
							</div>
						</form>

						<br/>

						<div class="buttons-container">
							<button class="secondaryButton" on:click={handleToggleNewForm}>Avbryt</button>
							<button class="primaryButton" disabled={
								!newVacant.name ||
								!newVacant.vacantFrom ||
								!newVacant.createdBy ||
								(fileSelect && !form?.uploaded)
							}>Registrer konsulent</button>
						</div>
					</form>
				{/if}
			</div>

			<br/>
			<br/>

			<div class="list">
				{#each data.vacantList as vacant}
					<VacantRow vacant={vacant} email={data.email} onDelete={handleDeleteEntry} />
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
	.file-upload-container {
		width: 100%;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}
	.file-select-container {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.cvInput {
		background-color: white;
	}
</style>

