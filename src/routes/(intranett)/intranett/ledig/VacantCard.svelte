<script lang="ts">
	import {Button, Input, Textarea} from "flowbite-svelte";
	import type {Vacant} from "$lib/types";
	import {overhusetDomains} from "$lib/config/constellations";
	import CvFileUpload from "./CvFileUpload.svelte";
	import {getDateFormat, getDateFormatForDatePicker, getIsPassed} from "$lib/utils/dateUtils";
	import {getIsSameDomain} from "$lib/utils/domainUtils";
	import Divider from "$lib/components/common/Divider.svelte";
	import Card from "$lib/components/common/Card.svelte";

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
		changeVacant = changeVacant ? undefined : {...vacant, vacantFrom: getDateFormatForDatePicker(vacant?.vacantFrom)};
		onChangeToggle();
	}

	const handleFileUploaded = (path: string) => {
		changeVacant = {...changeVacant, cv: path};
	}

	const handleLoadingStateChange = (loading: boolean) => {
		cvLoading = loading;
	}
</script>


<Card variant={currentlyVacant ? 'primary' : 'secondary'} onClick={undefined} >
	<div style="width: 100%">
		<div class="cardHeader">
			<div>
				{#if changeVacant}
					<Input
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
					<Input name="from" id="from" type="date"  bind:value={changeVacant.vacantFrom}/>
				{:else}
					<span>{currentlyVacant ? "Ledig nå" : `fra ${getDateFormat(vacant.vacantFrom)}`}</span>
				{/if}
			</div>
		</div>

		<Divider />

		{#if changeVacant}
			<Textarea
				bind:value={changeVacant.comment}
				class="cardComment"
				rows="10"
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

		<div class="cardButtonsContainer">
			{#if changeVacant}
				<Button color="dark" pill  on:click={handleChangeModeToggle}>Avbryt</Button>
				<Button color="primary" pill  on:click={handleSaveChanges} disabled={cvLoading}>Lagre</Button>
			{:else}
				{#if (vacant?.cv?.length || 0) > 5}
					<Button color="dark" pill on:click={handleOpenCV} title={getCvShortName()}>Gå til CV</Button>
				{/if}
				<Button color="dark" pill on:click={handleMailTo}>kontakt {vacant.createdBy}</Button>
				{#if getCanChange()}
					<Button color="primary" pill on:click={handleChangeModeToggle}>Endre</Button>
					<Button color="primary" pill on:click={handleDelete}>Slett</Button>
				{/if}
			{/if}
		</div>
	</div>
</Card>



<style>
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
	.cardButtonsContainer {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
</style>
