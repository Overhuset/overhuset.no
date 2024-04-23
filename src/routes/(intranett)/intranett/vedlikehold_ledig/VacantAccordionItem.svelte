<script lang="ts">
	import {Badge, Button, Input, Textarea} from "flowbite-svelte";
	import Label from "$lib/components/common/Label.svelte";
	import type {Event, Vacant} from "$lib/types";
	import {getDateFormat} from "$lib/utils/dateUtils";
	import {getIsSameDomain} from "$lib/utils/domainUtils";
	import CvFileUpload from "../ledig/CvFileUpload.svelte";
	import {AngleDownOutline, AngleUpOutline} from "flowbite-svelte-icons";
	import {AccordionItem} from "@skeletonlabs/skeleton";

	export let vacant: Vacant;
	export let email: string | undefined;
	export let form: any;
 	export let onDelete: (id: string) => void;
 	export let onChange: (vacantToChange: Vacant) => void;

	let cvLoading = false;
	let vacantToChange: Vacant = {...vacant};

	const getIsDirty = (vacantToChange1: Vacant, vacantToChange2: Vacant, isCVLoading: boolean) => {
 		return isCVLoading || JSON.stringify(vacantToChange1) !== JSON.stringify(vacantToChange2);
	}


	const getCvShortName = () => {
		if (vacantToChange?.cv && vacantToChange?.cv?.length > 5) {
			const split = vacantToChange?.cv.split("/");
			return split[split.length-1];
		}
		return undefined;
	}

	const getCanChange = () => {
		const isSameDomain = getIsSameDomain(email, vacantToChange.createdBy);
		const isSameCreator = email === vacantToChange.createdBy;
		return isSameDomain || isSameCreator;
	};

	const handleDelete = () => {
		if (vacantToChange?.id) {
			if (confirm("Bekreft sletting") == true) {
				onDelete(vacantToChange.id);
			}
		}
	}

	const handleMailTo = () => {
		location.href = `mailto:${vacantToChange.createdBy}?subject=Ledig konsulent - ${vacantToChange.name}`;
	}

	const handleOpenCV = () => {
		if (vacantToChange?.cv) {
			window.open(vacantToChange.cv,"_blank");
		}
	}

	const handleSaveChanges = () => {
		if (vacantToChange?.id) {
			onChange(vacantToChange);
		}
	}

	const handleRevert = () => {
		vacantToChange = {...vacant};
	}

	const handleFileUploaded = (path: string) => {
		vacantToChange = {...vacantToChange, cv: path};
	}

	const handleLoadingStateChange = (loading: boolean) => {
		cvLoading = loading;
	}

	const changeAllowed = getCanChange();
</script>


<AccordionItem hover="" disabled={!changeAllowed}>

    <span slot="iconOpen">
        {#if changeAllowed}
            <AngleDownOutline size="md" />
        {/if}
    </span>

	<span slot="iconClosed">
        {#if changeAllowed}
            <AngleUpOutline size="md" />
        {/if}
    </span>

	<span slot="summary">
	</span>

	<span slot="lead">
        <div class="title-container">
            <span class="leading-none text-lg dark:text-white">
                {vacantToChange.name}
            </span>
            <span class="font-thin leading-none text-lg dark:text-white">
                {#if vacantToChange.vacantFrom}
					<span>{getDateFormat(vacantToChange.vacantFrom)} </span>
                {/if}
            </span>
        </div>

        <Badge rounded color="dark" style="margin-top: 0.4rem">
            Opprettet av {(vacantToChange.createdBy)}
        </Badge>
    </span>


	<span slot="content">
		<br/>
		<br/>

        <div class="inputs-container">
            <Label label="Navn på konsulent">
				<Input
					name="name"
					id="name"
					type="text"
					bind:value={vacantToChange.name}
					style="min-width: 25rem"
				/>
            </Label>
			   <Label label="Ledig fra">
				<Input
					name="from"
					id="from"
					type="date"
					bind:value={vacantToChange.vacantFrom}
					style="min-width: 25rem"
				/>
            </Label>
		</div>

		<div class="inputs-container">
            <Label label="Beskrivelse">
				<div>
					<Textarea
							bind:value={vacantToChange.comment}
							class="cardComment"
							rows="10"
							style="min-width: 52rem"
					/>
				</div>
            </Label>
		</div>

		<div>
			<CvFileUpload
					form={form}
					id={vacantToChange.id}
					onChange={handleFileUploaded}
					onLoadingStateChange={handleLoadingStateChange}
			/>
		</div>

		<div class="buttons-container">
			{#if (vacant?.cv?.length || 0) > 5}
				<Button color="purple" pill on:click={handleOpenCV} title={getCvShortName()}>Til CV</Button>
			{/if}
			<Button color="purple" pill on:click={handleMailTo}>kontakt {vacant.createdBy}</Button>
			{#if getCanChange()}
				<Button color="primary" pill on:click={handleDelete}>Slett</Button>
				<Button pill on:click={handleRevert} disabled={!getIsDirty(vacant, vacantToChange, cvLoading)}>Forkast endringer</Button>
				<Button pill on:click={handleSaveChanges} disabled={!getIsDirty(vacant, vacantToChange, cvLoading)}>Lagre</Button>
			{/if}
		</div>

    </span>

</AccordionItem>


<style>
	.title-container {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.inputs-container {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		gap: 2rem;
		margin-bottom: 1rem;
		width: 100%;
	}
	.buttons-container {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
</style>
