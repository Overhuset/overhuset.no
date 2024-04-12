<script lang="ts">
	import {Accordion} from "@skeletonlabs/skeleton";
	import {invalidateAll} from "$app/navigation";
	import {
		Badge,
		Button, P, Radio,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		Tooltip
	} from "flowbite-svelte";
	import type {Company} from "$lib/types";
	import { toasts, ToastContainer, FlatToast }  from "svelte-toasts";
	import CompanyAccordionItem from "./CompanyAccordionItem.svelte";
	import {PlusOutline} from "flowbite-svelte-icons";
	import {sortCompanies} from "./utils";

	const api = '/api/company';
	const headers = {'content-type': 'application/json'};
	export let data;

	let sort:"name" | "createdAt" = 'name';

	const onToast = (type: "success" | "info" | "error", message: string) => {
		toasts.add({
			description: message,
			duration: 3000,
			placement: 'bottom-right',
			type: type,
			theme: 'light',
		});
	}

	const handleNewCompany = async () => {
		const company: Company = {
			name: `*NY*`,
			createdBy: data.authUser?.email,
		};

		const body = JSON.stringify(company);
		const response = await fetch(api, {method: 'POST', body, headers});

		if (response.status == 200) {
			onToast("success", "Selskap opprettet");
			sort = "createdAt";
		} else {
			onToast("error", "En feil oppstod ved opprett selskap");
		}
		invalidateAll();
	}

	const handleChangeCompany = async (companyChanged: Company) => {
		if (companyChanged) {
			const body = JSON.stringify({...companyChanged});
			const response = await fetch(api, {method: 'PUT', body, headers});

			if (response.status == 200) {
				onToast("success", "Endringer lagret");
			} else {
				onToast("error", "En feil oppstod ved lagring");
			}
			invalidateAll();
		}
	}

	const handleRevertCompany = () => {
		onToast("info", "Endringer forkastet");
	}

	const handleDeleteCompany = async (id: string) => {
		if (id) {
			const body = JSON.stringify(id);
			const response = await fetch(api, {method: 'DELETE', body, headers});

			if (response.status == 200) {
				onToast("success", "Selskap slettet");
			} else {
				onToast("error", "En feil oppstod ved sletting");
			}

			invalidateAll();
		}
	}
</script>

<div class="prose prose-xl mx-auto p-4 md:py-20" style="max-width:140ch">
	<div class="title">
		<P lineHeight="0" size="3xl" color="dark" weight="thin">Administrer</P>
		<P size="3xl" color="dark">Selskaper</P>
	</div>

	<div class="buttons-container">
		{#key sort}
			<Badge large rounded color="dark">
				<div class="flex gap-4 m-3">
					<div class="min-w-20"> Sortering:</div>
					<Radio bind:group={sort} value="name">Navn</Radio>
					<Radio bind:group={sort} value="createdAt">Opprettet</Radio>
				</div>
			</Badge>
		{/key}

		{#if data.authUser?.admin}
			<Button pill={true} id="new" on:click={handleNewCompany} class="!p-2"><PlusOutline class="w-8 h-8" /></Button>
			<Tooltip type="light" placement="top" triggeredBy="[id='new']">Opprett nytt selskap og fortsett redigering ved å velge det i listen nedenfor</Tooltip>
		{/if}
	</div>

	{#key sort}
		<Table hoverable={true}>
			<TableBody>
				{#each sortCompanies(data.companyList, sort) as company (company.id)}
					<TableBodyRow>
						<TableBodyCell>
							<Accordion>
								<CompanyAccordionItem
										company={company}
										authUser={data.authUser}
										onChange={handleChangeCompany}
										onDelete={handleDeleteCompany}
										onRevert={handleRevertCompany}
								/>
							</Accordion>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	{/key}

	<ToastContainer placement="bottom-right" let:data={data}>
		<FlatToast {data} />
	</ToastContainer>
</div>

<style>
	.title {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		gap:0.4rem;
	}
 	.buttons-container {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}
</style>

