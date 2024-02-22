<script lang="ts">
	import type {Vacant} from "$lib/types";
	import {overhusetDomains} from "$lib/config/constellations";

	export let vacant: Vacant;
	export let email: string | undefined;
 	export let onDelete: (id: string) => void;
 	export let onChange: (vacant: Vacant) => void;

	const getIsCurrentlyVacant = () => {
		const d = vacant?.vacantFrom ? new Date(vacant?.vacantFrom) : new Date();
		const now = new Date();
		return d.getTime() < now.getTime();
	}

	let changeVacant: Vacant | undefined;
	const currentlyVacant = getIsCurrentlyVacant();



	const getDateFormat = (date?: string) => {
		if (date) {
			let d = new Date(date), month = `${d.getMonth() + 1}`, day = '' + d.getDate(), year = d.getFullYear();
			if (month.length < 2) month = `0${month}`;
			if (day.length < 2) day = `0${day}`;
			return [day, month, year, ].join('.');
		}
		return "";
	}

	const getDateFormatDatePicker = (date?: string) => {
		if (date) {
			let d = new Date(date), month = `${d.getMonth() + 1}`, day = '' + d.getDate(), year = d.getFullYear();
			if (month.length < 2) month = `0${month}`;
			if (day.length < 2) day = `0${day}`;
			return [year, month, day ].join('-');
		}
		return "";
	}

	const getCompanyName = () => {
		const domain = overhusetDomains.find(domain => vacant.createdBy?.includes(domain));
		return domain ? `${domain.split('.')[0]}` : "";
	}

	const getCvShortName = () => {
		if (vacant?.cv && vacant?.cv?.length > 5) {
			const split = vacant?.cv.split("/");
			return split[split.length-1];
		}
		return undefined;
	}

	const getIsSameDomain = (email1?: string, email2?: string) => {
		if (!email1 || !email2) {
			return false;
		}
		const getEmailDomain = (email: string) => {
			const splitted = email?.split('@') || undefined;
			return splitted ? splitted[1] : splitted;
		}
		return getEmailDomain(email1) === getEmailDomain(email2);
	};

	const getCanChange = () => {
		const isSameDomain = getIsSameDomain(email, vacant.createdBy);
		const isSameCreator = email === vacant.createdBy;
		return isSameDomain || isSameCreator;
	};

	const handleDelete = () => {
		if (vacant?.id) {
			if (confirm("Bekreft sletting") == true) {
				onDelete(vacant.id);
			}
		}
	}

	const handleMailTo = () => {
		location.href = `mailto:${vacant.createdBy}?subject=Ledig konsulent - ${vacant.name}`;
	}

	const handleOpenCV = () => {
		if (vacant?.cv) {
			window.open(vacant.cv,"_blank");
		}
	}

	const handleSaveChanges = () => {
		if (changeVacant?.id) {
			onChange(changeVacant);
			handleChangeModeToggle();
		}
	}

	const handleChangeModeToggle = () => {
		changeVacant = changeVacant ? undefined : {...vacant, vacantFrom: getDateFormatDatePicker(vacant?.vacantFrom)}
	}


</script>


<div class="card {currentlyVacant ? 'currentlyVacant' : 'toBeVacant'}">
	<div class="cardHeader">
 		<div>
			{#if changeVacant}
				<input
					name="name"
					id="name"
					type="text"
					bind:value={changeVacant.name}
				/>
			{:else}
				<span>{`${vacant.name} - ${getCompanyName()}`}</span>
			{/if}
		</div>

		<div>
			{#if changeVacant}
				<input name="from" id="from" type="date"  bind:value={changeVacant.vacantFrom}/>
			{:else}
				<span>{currentlyVacant ? "Ledig nå" : `fra ${getDateFormat(vacant.vacantFrom)}`}</span>
			{/if}
		</div>
	</div>

	<div class="divider"></div>

	{#if changeVacant}
		<textarea
			bind:value={changeVacant.comment}
			class="cardComment"
			style="min-height: 10rem"
		/>
	{:else}
		<div class="cardComment">
			{vacant.comment || "" }
		</div>
	{/if}

	<div class="CardButtonsContainer">
		{#if changeVacant}
			<button class="cardButton" on:click={handleChangeModeToggle}>Avbryt</button>
			<button class="cardButton" on:click={handleSaveChanges}>Lagre</button>
		{:else}
			{#if getCvShortName()}
				<button on:click={handleOpenCV} class="cardButton" title={getCvShortName()}>Gå til CV</button>
			{/if}
			<button class="cardButton" on:click={handleMailTo}>kontakt {vacant.createdBy}</button>
			{#if getCanChange()}
				<button class="cardButton" on:click={handleChangeModeToggle}>Endre</button>
				<button class="cardButton" on:click={handleDelete}>Slett</button>
			{/if}
		{/if}
	</div>
</div>



<style>
	input {
		border: 1px solid #ababab;
		border-radius: 0.3rem;
		padding: 0.2rem 0.4rem;
	}
	textarea {
		border: 1px solid #ababab;
		border-radius: 0.3rem;
		width: 100%;
		min-height: 9rem;
		padding: 0.2rem 0.4rem;
	}
	.card {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
 		padding: 1rem;
		background-color: #fcfcfc;
		border-radius: 0.5rem;
	}
	.currentlyVacant {
		border-left: 7px solid rgb(115, 66, 13);
	}
	.toBeVacant {
		border-left: 7px solid #ababab;
	}
	.cardHeader {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 0.4rem;
	}
	.divider {
		width: 100%;
		border-bottom: 1px solid #d3d3d3;
		margin: 0.4rem 0;
	}
	.cardComment {
		width: 100%;
		padding: 0 0.4rem;
		text-align: left;
		min-height: 5rem;
 		margin-top: 0.5rem;
 		margin-bottom: 1.5rem;
		max-height: 15rem;
		overflow-y: auto;
	}
	.CardButtonsContainer {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.cardButton {
		padding: 0.1rem 0.5rem;
		border-radius: 0.5rem;
 		border: 1px solid silver;
 	}
</style>
