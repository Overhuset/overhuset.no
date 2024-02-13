<script lang="ts">
	import type {AuthUser, Vacant} from "$lib/types";

	export let vacant: Vacant;
	export let authUser: AuthUser | undefined;
 	export let onDelete: (id: string) => void;


	const getDateFormat = (date?: string) => {
		if (date) {
			let d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
			if (month.length < 2) month = '0' + month;
			if (day.length < 2) day = '0' + day;
			return [day, month, year, ].join('-');
		}
		return "";
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
		const isSameDomain = getIsSameDomain(authUser?.email,  vacant.email);
		const isSameCreator = authUser?.id === vacant.createdBy;
		return isSameDomain || isSameCreator;
	};

	const handleDelete = () => {
		if (vacant?.id) {
			if (confirm("Bekreft sletting") == true) {
				onDelete(vacant.id);
			}
		}
	}

</script>

<tr>
	<td class="leftAlign">{vacant.firstName} {vacant.lastName}</td>
	<td class="leftAlign">{vacant.email}</td>
	<td class="leftAlign">{getDateFormat(vacant.vacantFrom)}</td>
	<td class="leftAlign">{vacant.comment || "" }</td>
	<td class="rightAlign">
		{#if getDeleteAllowed()}
			<input type="button" value="Slett" class="cursor-pointer rounded-lg bg-white px-2 py-1" on:click={handleDelete}/>
		{/if}
	</td>
</tr>

<style>
	.leftAlign {
		padding: 0.3rem 1rem ;
		text-align: left;
	}
	.rightAlign {
		padding: 0.3rem 0 0.3rem 1rem;
		text-align: right;
	}
</style>
