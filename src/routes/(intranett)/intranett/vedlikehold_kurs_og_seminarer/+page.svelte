<script lang="ts">
	import {Accordion} from "@skeletonlabs/skeleton";
	import EventAccordionItem from "./EventAccordionItem.svelte";
	import {invalidateAll} from "$app/navigation";
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Tooltip
	} from "flowbite-svelte";
	import type {Event} from "$lib/types";
	import { toasts, ToastContainer, FlatToast }  from "svelte-toasts";
	import {PlusOutline} from "flowbite-svelte-icons";

	const api = '/api/event';
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


	const handleNewEvent = async () => {
 		const body = JSON.stringify({
			title: `*NY*`,
			location: undefined,
			companyId: undefined,
			company: undefined,
			time: undefined,
			timeEnd: undefined,
			fullDay: false,
			externalsAllowed: false,
			physicalAttendance: false,
			onlineCourse: false,
			onlineStreaming: false,
			published: false,
			description: undefined,
			registration: undefined,
			createdBy: data.authUser?.email,
		});

		const response = await fetch(api, {method: 'POST', body, headers});

		if (response.status == 200) {
			onToast("success", "Arrangement opprettet");
		} else {
			onToast("error", "En feil oppstod ved opprett arrangement");
		}

		invalidateAll();
	}

	const handleChangeEvent = async (eventChanged: Event) => {
		if (eventChanged) {
			const body = JSON.stringify({...eventChanged});
			const response = await fetch(api, {method: 'PUT', body, headers});

			if (response.status == 200) {
				onToast("success", "Endringer lagret");
			} else {
				onToast("error", "En feil oppstod ved lagring");
			}

			invalidateAll();
		}
	}

	const handleRevertEvent = () => {
		onToast("info", "Endringer forkastet");
	}

	const handleDeleteEvent = async (id: string) => {
		if (id) {
			const body = JSON.stringify(id);
			const response = await fetch(api, {method: 'DELETE', body, headers});

			if (response.status == 200) {
				onToast("success", "Arrangement slettet");
			} else {
				onToast("error", "En feil oppstod ved sletting");
			}

			invalidateAll();
		}
	}

</script>

<div class="prose prose-xl mx-auto p-4 md:py-20" style="max-width:140ch">
	<h1>Administrer</h1>
	<h3>Seminarer, kurs og aktiviteter</h3>

	<div class="buttons-container">
		<Button id="new" on:click={handleNewEvent} size="md"><PlusOutline class="w-5 h-5 me-2" />Nytt arrangement</Button>
		<Tooltip type="light" placement="top" triggeredBy="[id='new']">Opprett nytt arrangement og fortsett redigering ved å velge det i listen nedenfor</Tooltip>
	</div>

	<Table>
		<TableHead>
			<TableHeadCell style="color: white">Arrangementer</TableHeadCell>
		</TableHead>
		<TableBody>
				{#each (data.eventList || []) as event (event.id)}
					<TableBodyRow>
						<TableBodyCell>
							<Accordion>
								<EventAccordionItem
										event={event}
										companies={data.companyList}
										authUser={data.authUser}
										onChange={handleChangeEvent}
										onDelete={handleDeleteEvent}
										onRevert={handleRevertEvent}
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

