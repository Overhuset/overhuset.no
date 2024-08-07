<script lang="ts">
	import {Accordion} from "@skeletonlabs/skeleton";
	import EventAccordionItem from "./EventAccordionItem.svelte";
	import {invalidateAll} from "$app/navigation";
	import {
		Button,
		P,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		Tooltip,
		Radio, Badge
	} from "flowbite-svelte";
	import type {Event} from "$lib/types";
	import { toasts, ToastContainer, FlatToast }  from "svelte-toasts";
	import { PlusOutline } from "flowbite-svelte-icons";
	import {sortEvents} from "./utils";

	const api = '/api/event';
	const headers = {'content-type': 'application/json'};

	export let data;

	let sort:"title" | "createdAt" | "time" = 'title';

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
			fullDay: false,
			externalsAllowed: false,
			physicalAttendance: false,
			onlineCourse: false,
			onlineStreaming: false,
			published: false,
			createdBy: data.authUser?.email,
			companyId: data.authUser?.companyId
		});

		const response = await fetch(api, {method: 'POST', body, headers});

		if (response.status == 200) {
			onToast("success", "Arrangement opprettet");
			sort = "createdAt";
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
	<div class="title">
		<P lineHeight="0" size="3xl" color="dark" weight="thin">Administrer</P>
		<P size="3xl" color="dark">Arrangementer</P>
	</div>

	<div class="buttons-container">
		{#key sort}
			<Badge large rounded color="dark">
				<div class="flex gap-4 m-3">
					<div class="min-w-20"> Sortering:</div>
					<Radio bind:group={sort} value="title">Tittel</Radio>
					<Radio bind:group={sort} value="createdAt">Opprettet</Radio>
					<Radio bind:group={sort} value="time">Tidspunkt</Radio>
				</div>
			</Badge>
		{/key}

		<Button pill={true} id="new" on:click={handleNewEvent} class="!p-2"><PlusOutline class="w-8 h-8" /></Button>
		<Tooltip type="light" placement="top" triggeredBy="[id='new']">Opprett nytt arrangement og fortsett redigering ved å velge det i listen nedenfor</Tooltip>
	</div>

	{#if data.eventList?.length === 0}
		<P size="xl" color="dark" weight="light">
			Ingen arrangementer funnet.
		</P>
	{/if}

	{#key sort}
		<Table hoverable={true}>
			<TableBody>
				{#each sortEvents(data.eventList, sort) as event (event.id)}
					<TableBodyRow >
						<TableBodyCell>
							<Accordion>
								<EventAccordionItem
										event={event}
										companies={data.companyList}
										authUser={data.authUser}
										company={data.company}
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

