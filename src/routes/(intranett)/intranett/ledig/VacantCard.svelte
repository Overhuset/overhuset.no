<script lang="ts">
	import type {Vacant} from "$lib/types";
	import {overhusetDomains} from "$lib/config/constellations";
	import CvFileUpload from "./CvFileUpload.svelte";
	import {getDateFormat, getDateFormatDatePicker, getIsPassed} from "$lib/utils/dateUtils";
	import {getIsSameDomain} from "$lib/utils/domainUtils";
	import Divider from "$lib/components/common/Divider.svelte";

	export let vacant: Vacant;
	export let email: string | undefined;
	export let form: any;
 	export let onDelete: (id: string) => void;
 	export let onChange: (vacant: Vacant) => void;
 	export let onChangeToggle: () => void;

	let cvLoading = false;
	let changeVacant: Vacant | undefined;
	const currentlyVacant = getIsPassed(vacant?.vacantFrom);


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
		changeVacant = changeVacant ? undefined : {...vacant, vacantFrom: getDateFormatDatePicker(vacant?.vacantFrom)};
		onChangeToggle();
	}

	const handleFileUploaded = (path: string) => {
		changeVacant = {...changeVacant, cv: path};
	}

	const handleLoadingStateChange = (loading: boolean) => {
		cvLoading = loading;
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

	<Divider />

	{#if changeVacant}
		<textarea
			bind:value={changeVacant.comment}
			class="cardComment"
			style="min-height: 10rem"
		/>
		<CvFileUpload
			form={form}
			id={vacant.id}
			onChange={handleFileUploaded}
			onLoadingStateChange={handleLoadingStateChange}
		/>
	{:else}
		<div class="cardComment">
			{vacant.comment || "" }
		</div>
	{/if}

	<div class="CardButtonsContainer">
		{#if changeVacant}
			<button class="cardButton" on:click={handleChangeModeToggle}>Avbryt</button>
			<button class="cardButton" on:click={handleSaveChanges} disabled={cvLoading}>Lagre</button>
		{:else}
			{#if (vacant?.cv?.length || 0) > 5}
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
