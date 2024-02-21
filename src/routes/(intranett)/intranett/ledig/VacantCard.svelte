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
			const d = vacant?.vacantFrom ? new Date(vacant?.vacantFrom) : new Date();
			const now = new Date();
			return d.getTime() < now.getTime();
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

	const getDeleteAllowed = () => {
		const isSameDomain = getIsSameDomain(email, vacant.createdBy);
		const isSameCreator = email === vacant.createdBy;
		return isSameDomain || isSameCreator;
	};

	const getCompanyName = (createdBy?: string) => {
		const domain = overhusetDomains.find(domain => createdBy?.includes(domain));
		return domain ? `${domain.split('.')[0]}` : "";
	}

	const getCompanyIcon = () => {

		const companies = [
			 {
			href: 'https://www.advansia.no/',
					imgSrc: '/companies/advansia_logo.svg',
					name: 'Advansia',
		},
	 {
			href: 'https://afry.com/no-no',
					imgSrc: '/companies/afry_logo.png',
					name: 'Afry',
		},
	 {
			href: 'https://www.arktekk.no',
					imgSrc: '/companies/arktekk_logo.png',
					name: 'Arktekk',
		},
		 {
			href: 'https://boitano.no',
					imgSrc: '/companies/boitano_logo.svg',
					name: 'Boitano',
		},
		{
			href: 'https://www.edisys.no/',
					imgSrc: '/companies/edisys_logo.png',
					name: 'Edisys',
		},
		{
			href: 'https://www.fink.no/',
					imgSrc: '/companies/fink_logo.png',
					name: 'Fink',
		},
		{
			href: 'https://www.forse.no/',
					imgSrc: '/companies/forse_logo.svg',
					name: 'Forse',
		},
		 {
			href: 'https://www.jpro.no/',
					imgSrc: '/companies/jpro_logo.png',
					name: 'Jpro',
		},
		 {
			href: 'https://www.kodemaker.no/',
					imgSrc: '/companies/kodemaker_logo.png',
					name: 'Kodemaker',
		},
		{
			href: 'https://www.redpill-linpro.com/no',
					imgSrc: '/companies/redpill_logo.svg',
					name: 'Redpill Linpro',
		},
		 {
			href: 'https://www.sannsyn.com/no',
					imgSrc: '/companies/sannsyn_logo.png',
					name: 'Sannsyn',
		},
		 {
			href: 'https://www.techfolk.no/',
					imgSrc: '/companies/techfolk_logo.svg',
					name: 'Techfolk',
		},
	{
			href: 'https://www.uptimeconsulting.no/',
					imgSrc: '/companies/uptime_logo.png',
					name: 'Uptime',
		},
	{
			href: 'https://www.variant.no/',
					imgSrc: '/companies/variant_logo.svg',
					name: 'Variant',
		},
		 {
			href: 'https://www.zenior.no/',
					imgSrc: '/companies/zenior_logo.png',
					name: 'Zenior',
		}
		]

		const companyName = getCompanyName(vacant?.createdBy);
		const company = companies?.find(company => company.name.toLowerCase().includes(companyName.toLowerCase()));
		return company?.imgSrc;
	}

	const handleDelete = () => {
		if (vacant?.id) {
			if (confirm("Bekreft sletting") == true) {
				onDelete(vacant.id);
			}
		}
	}

	const handleMailTo = () => {
		location.href = "mailto:"+vacant.createdBy+'?subject=Ledig konsulent - '+vacant.name;
	}

	const handleOpenCV = () => {
		if (vacant?.cv) {
			window.open(vacant.cv,"_blank");
		}
	}

	const isVacant = getIsCurrentlyVacant();

</script>


<div class="card {isVacant ? 'currentlyVacant' : 'toBeVacant'}">
	<div class="cardHeader">
 		<div class="nameCompany">
			<span style="float:left">{vacant.name}</span> <img src={getCompanyIcon()} class="w-10"/>
		</div>
		<div>
			{#if isVacant}
				Ledig nå
			{:else}
				fra {getDateFormat(vacant.vacantFrom)}
			{/if}
		</div>

	</div>

	<div class="divider"></div>
	<div class="cardComment">{vacant.comment || "" }</div>
	<div class="CardButtonsContainer">
		{#if getCvShortName()}
			<button on:click={handleOpenCV} class="cardButton" title={"CV: " + getCvShortName()}>Gå til CV</button>
		{/if}
		<button class="cardButton" on:click={handleMailTo}>kontakt {vacant.createdBy}</button>
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
	.nameCompany {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.cardButton {
		padding: 0.1rem 0.5rem;
		border-radius: 0.5rem;
 		border: 1px solid silver;
 	}
</style>
