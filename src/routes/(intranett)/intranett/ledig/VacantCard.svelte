<script lang="ts">
	import {Badge, Button, Card, P} from "flowbite-svelte";
	import type {Vacant} from "$lib/types";
	import {overhusetDomains} from "$lib/config/constellations";
	import { getDateFormat, getIsPassed} from "$lib/utils/dateUtils";
	import HtmlRender from "$lib/components/common/HtmlRender.svelte";

	export let vacant: Vacant;
	export let email: string | undefined;

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

	const handleMailTo = () => {
		location.href = `mailto:${vacant.createdBy}?subject=Ledig konsulent - ${vacant.name}`;
	}

	const handleOpenCV = () => {
		if (vacant?.cv) {
			window.open(vacant.cv,"_blank");
		}
	}
</script>

<Card size="xl" color="none">
	<div class="colDirection">
		<div>
			<div class="cardHeader">
				<P size="xl" weight="medium" color="dark">
					{`${vacant.name} - ${getCompanyName()}`}
				</P>
				<Badge color={currentlyVacant ? "green" : "yellow"} >
					{currentlyVacant ? "Ledig nå" : `Ledig fra ${getDateFormat(vacant.vacantFrom)}`}
				</Badge>
			</div>

			<div class="cardComment">
				<P size="lg" color="dark" weight="light">
					<HtmlRender htmlText={vacant.comment} />
				</P>
			</div>
		</div>

		<div class="cardButtonsContainer">
			{#if (vacant?.cv?.length || 0) > 5}
				<Button color="dark" pill on:click={handleOpenCV} title={getCvShortName()}>Gå til CV</Button>
			{/if}
			<Button color="dark" pill on:click={handleMailTo}>kontakt {vacant.createdBy}</Button>
		</div>
	</div>
 </Card>



<style>
	.cardHeader {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		padding: 0 0.4rem;
		margin-top: -2rem;
	}
	.cardComment {
		width: 100%;
		padding: 0 0.4rem;
		text-align: left;
		min-height: 5rem;
 		margin-bottom: 1.5rem;
		max-height: 20rem;
		overflow-y: auto;
		margin-top: -1rem;
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
	.colDirection {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
</style>
