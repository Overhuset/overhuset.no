<script lang="ts">
	import {Accordion} from "@skeletonlabs/skeleton";
	import {invalidateAll} from "$app/navigation";
	import {
		Button,
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

	const api = '/api/company';
	const headers = {'content-type': 'application/json'};

	export let data;

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
			nameShort: undefined,
			logoRef: undefined,
			url: undefined,
			description: undefined,
			createdBy: data.authUser?.email,
		};

		const body = JSON.stringify(company);
		const response = await fetch(api, {method: 'POST', body, headers});

		if (response.status == 200) {
			onToast("success", "Selskap opprettet");
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
	<h1>Administrer</h1>
	<h3>Selskaper</h3>

	<div class="buttons-container">
		{#if data.authUser?.admin}
			<Button id="new" on:click={handleNewCompany} size="md"><PlusOutline class="w-5 h-5 me-2" />Nytt selskap</Button>
			<Tooltip type="light" placement="top" triggeredBy="[id='new']">Opprett nytt selskap og fortsett redigering ved å velge det i listen nedenfor</Tooltip>
		{/if}
	</div>

	<Table>
		<TableBody>
			{#each (data.companyList || []) as company (company.id)}
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

	<ToastContainer placement="bottom-right" let:data={data}>
		<FlatToast {data} />
	</ToastContainer>
</div>

<style>
 	.buttons-container {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1.5rem;
	}
</style>

