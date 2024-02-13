<script lang="ts">
 	import Vacant from "./VacantRow.svelte";
	import {invalidateAll} from "$app/navigation";
 	const api = '/api/vacant';
	const headers = {'content-type': 'application/json'};
  	export let data;
 	let newVacant: Vacant | undefined = undefined;
	const handleToggleNewForm = () => {
		newVacant = !!newVacant ? undefined : { createdBy: data?.user?.userId };
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
			const body = JSON.stringify( newVacant );
			const response = await fetch(api, {method: 'POST', body, headers});
			if (response.status !== 200) {
				alert("Legge til feilet");
			}
			newVacant = undefined;
			invalidateAll();
		}
	}
</script>


<div class="w-full my-40 grid justify-center text-center gap-20">
	<h1 class="text-5xl">Ledige konsulenter</h1>

	<dialog open={!!newVacant} class="dialog">
		<h1 class="text-2xl">Registrer ledig konsulent</h1>
		<br/>

		{#if !!newVacant}
			<form on:submit|preventDefault={handleNewEntry}>
				<div class="row">
					<label for="first_name">Fornavn</label>
					<input type="text" bind:value={newVacant.firstName}   />
				</div>
				<div class="row">
					<label for="last_name">Etternavn</label>
					<input name="last_name" id="last_name" type="text" bind:value={newVacant.lastName}  />
				</div>
				<div class="row">
					<label for="">E-post</label>
					<input name="email" id="email" type="email" bind:value={newVacant.email}  />
				</div>
				<div class="row">
					<label for="from">Ledig fra</label>
					<input name="from" id="from" type="date" bind:value={newVacant.vacantFrom}  />
				</div>
				<div class="row">
					<label for="comment">Kommentar</label>
					<input type="text" bind:value={newVacant.comment}  />
				</div>
				<br/>
				<div class="buttons-container">
					<button class="secondaryButton" on:click={handleToggleNewForm} > Avbryt </button>
					<button
						class="primaryButton"
						disabled={
							!newVacant.firstName ||
							!newVacant.lastName ||
							!newVacant.email ||
							!newVacant.vacantFrom
						}
					> Legg til </button>
				</div>
			</form>
		{/if}

	</dialog>
	<div>
		<div class="buttons-container">
			<button on:click={handleToggleNewForm} class="cursor-pointer rounded-lg bg-white px-2 py-1"> Registrer ny </button>
		</div>
		<br/>

		<table>
			<tr>
				<th>Navn</th>
				<th>E-post</th>
				<th>Ledig fra</th>
				<th>kommentar</th>
				<th></th>
			</tr>
			{#each data.vacantList as vacant}
				<Vacant vacant={vacant} authUser={data.authUser} onDelete={handleDeleteEntry} />
			{/each}
		</table>
	</div>

</div>

<style>
	th {
		padding: 0 1rem;
		text-align: left;
	}
	input {
		border: 1px solid #ababab;
		border-radius: 0.3rem;
		padding: 0.2rem 0.4rem;
	}
	button {
		padding: 0.2rem 0.8rem;
		border-radius: 0.5rem;
	}
	.primaryButton {
		color: white;
		background-color: rgb(115, 66, 13);
	}
	.primaryButton:disabled {
		opacity: 0.4;
	}
	.secondaryButton {
		color: #4d4d4d;
	}
	label {
		min-width: 6rem;
		text-align: left;
	}
	.row {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.7rem;
	}
	.buttons-container {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		gap: 2rem;
	}
	dialog {
		padding: 1.5rem;
		border-radius:0.5rem;
	}
</style>

