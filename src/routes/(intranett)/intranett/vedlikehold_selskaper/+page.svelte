<script lang="ts">
	import {Accordion} from "@skeletonlabs/skeleton";
	import {invalidateAll} from "$app/navigation";
	import {Tooltip} from "flowbite-svelte";
	import type {Company} from "$lib/types";
	import { toasts, ToastContainer, FlatToast }  from "svelte-toasts";
	import CompanyAccordionItem from "./CompanyAccordionItem.svelte";

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



</script>

<div class="prose prose-xl mx-auto p-4 md:py-20" style="max-width:140ch">
	<h1>Administrer</h1>
	<h3>Selskaper</h3>

	<div class="buttons-container">

		<Tooltip type="light" placement="top" triggeredBy="[id='new']">Opprett nytt selskap og fortsett redigering ved å velge det i listen nedenfor</Tooltip>
	</div>

	<Accordion>
		{#each (data.companyList || []) as company (company.id)}
			<CompanyAccordionItem
				company={company}
				authUser={data.authUser}
				onChange={handleChangeCompany}
 				onRevert={handleRevertCompany}
			/>
		{/each}
	</Accordion>

	<ToastContainer placement="bottom-right" let:data={data}>
		<FlatToast {data} /> <!-- Provider template for your toasts -->
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

