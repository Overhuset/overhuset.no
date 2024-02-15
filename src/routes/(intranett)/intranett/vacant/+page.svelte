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

	 const sortVacantList = (by: "firstName" | "vacantFrom" | "createdAt") => {
		 const clone = [...data.vacantList];
		 switch (by) {
			 case "firstName" : return clone.sort((v1: Vacant, v2: Vacant) =>  (v1.firstName || "").localeCompare(v2.firstName || ""));
			 case "vacantFrom" : return clone.sort((v1: Vacant, v2: Vacant) =>  (v1.vacantFrom || "").localeCompare(v2.vacantFrom || ""));
			 case "createdAt" : return clone.reverse();// created at, newest first
			 default: return clone;
		 }
	 }

	const handleToggleNewForm = () => {
		if (!!newVacant) {
			open = false;
			newVacant = undefined;
			if (form?.uploaded) {
				form.uploaded = undefined;
			}
		} else {
			open = true;
			newVacant = { createdBy: data?.email};
		}
	}

	const handleDeleteEntry = async (id: string) => {
		if (id) {
			const body = JSON.stringify( id );
			const response = await fetch(api, {method: 'DELETE', body, headers});
			if (response.status !== 200) {
				alert("Sletting feilet");
			}
			invalidateAll();
		}
	}

	const handleNewEntry = async () => {
		if (newVacant) {
			console.log("form.uploaded: ", form?.uploaded)
			const body = JSON.stringify( {...newVacant, cv: form?.uploaded || null} );
			const response = await fetch(api, {method: 'POST', body, headers});
			if (response.status !== 200) {
				alert("Legge til feilet");
			}
			newVacant = undefined;
			form.uploaded = undefined;
			open = false;
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
					<button on:click={handleToggleNewForm} class="cursor-pointer rounded-lg bg-white px-2 py-1"> Legg til </button>
				</div>
			{/if}

			<div use:collapse={{open}}>
				{#if !!newVacant}
					<h3>Registrer ledig konsulent</h3>

					<form on:submit|preventDefault={handleNewEntry}>
						<table>
							<tr>
								<td><label for="first_name">Fornavn</label></td>
								<td><input name="first_name" id="first_name" type="text" bind:value={newVacant.firstName}/></td>
							</tr>
							<tr>
								<td><label for="last_name">Etternavn</label></td>
								<td><input name="last_name" id="last_name" type="text" bind:value={newVacant.lastName}  /></td>
							</tr>
							<tr>
								<td><label for="from">Ledig fra</label></td>
								<td><input name="from" id="from" type="date" bind:value={newVacant.vacantFrom}  /></td>
							</tr>
							<tr>
								<td><label for="comment">Kommentar</label></td>
								<td><textarea bind:value={newVacant.comment}  /></td>
							</tr>
							<tr>
								<td>
									<label for="cv">
										CV {#if form?.uploaded} (lastet inn){/if}
									</label>
								</td>
								<td>
									<form use:enhance action="?/upload" method="POST" enctype="multipart/form-data">
 										<input type="file" required name="cv" id="cv" class="cvInput"/>
										<button class="secondaryButton">Last opp</button>
									</form>
								</td>
							</tr>
							<tr>
								<td>
								</td>
								<td>

								</td>
							</tr>
						</table>


						<div class="buttons-container">
							<button class="secondaryButton" on:click={handleToggleNewForm} > Avbryt </button>
							<button class="primaryButton" disabled={
								!newVacant.firstName ||
								!newVacant.lastName ||
								!newVacant.vacantFrom ||
								!newVacant.createdBy
							}
							> Legg til </button>
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
	label {
		margin-right: 2rem;
	}
	textarea {
		border: 1px solid #ababab;
		border-radius: 0.3rem;
		width: 100%;
		min-height: 10rem;
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
	.cvInput {
		background-color: white;
	}
</style>

