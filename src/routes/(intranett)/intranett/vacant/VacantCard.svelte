<script lang="ts">
	import type {Vacant} from "$lib/types";
	import {overhusetDomains} from "$lib/config/constellations";

	export let vacant: Vacant;
	export let email: string | undefined;
 	export let onDelete: (id: string) => void;



	const getDateFormat = (date?: string) => {
		if (date) {
			let d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
			if (month.length < 2) month = '0' + month;
			if (day.length < 2) day = '0' + day;
			return [day, month, year, ].join('.');
		}
		return "";
 	}

	const getIsCurrentlyVacant = () => {
			const d = new Date(vacant?.vacantFrom);
			const now = new Date();
			return d.getTime() < now.getTime();
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

	const getDeleteAllowed = () => {
		const isSameDomain = getIsSameDomain(email, vacant.createdBy);
		const isSameCreator = email === vacant.createdBy;
		return isSameDomain || isSameCreator;
	};

	const getCompanyName = (createdBy?: string) => {
		const domain = overhusetDomains.find(domain => createdBy?.includes(domain));
		return domain ? `(${domain.split('.')[0]})` : "";
	}

	const handleDelete = () => {
		if (vacant?.id) {
			if (confirm("Bekreft sletting") == true) {
				onDelete(vacant.id);
			}
		}
	}

	const handleOpenCV = () => {
		if (vacant?.cv) {
			window.open(vacant.cv,"_self");
		}
	}

	const isVacant = getIsCurrentlyVacant();

</script>


<div class="card {isVacant ? 'currentlyVacant' : 'toBeVacant'}">
	<div class="cardHeader">
 		<div>{vacant.name}
			{getCompanyName(vacant?.createdBy)}
		</div>
		<div>
			Ledig
			{#if isVacant} nå {:else} fra {getDateFormat(vacant.vacantFrom)} {/if}
		</div>
	</div>

	<div class="divider"></div>

	<div class="cardComment">{vacant.comment || "" }</div>

	<div class="CardButtonsContainer">
		<div>Kontakt: <a href="mailto: {vacant.createdBy}">{vacant.createdBy}</a></div>
		{#if vacant.cv}
			<button on:click={handleOpenCV} class="cardButton">CV</button>
		{/if}
		{#if getDeleteAllowed()}
			<button class="cardButton" on:click={handleDelete}>Slett</button>
		{/if}
	</div>


</div>



<style>
	.card {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
 		padding: 0.7rem;
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
 		margin-bottom: 1rem;
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
