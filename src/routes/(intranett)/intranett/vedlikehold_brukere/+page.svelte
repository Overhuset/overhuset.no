<script lang="ts">
	import {invalidateAll} from "$app/navigation";
	import collapse from 'svelte-collapse';
	import {
		Badge,
		Button,
		Input,
		P,
		Radio,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		Textarea,
		Tooltip
	} from 'flowbite-svelte';
 	import { toasts, ToastContainer, FlatToast }  from "svelte-toasts";
	import {PlusOutline} from "flowbite-svelte-icons";
	import {sortUsers} from "./utils";
	import { getDateFormat, getTimeFormat } from '$lib/utils/dateUtils';
	import type { UserInvite } from '$lib/types';

	let open = false
	const authUserApi = '/api/auth_user';
	const api = '/api/user_invite';
	const headers = {'content-type': 'application/json'};

	export let data;

	let sort:"name" | "createdAt" = 'name';
	let newInvite = {

	};

	const onToast = (type: "success" | "info" | "error", message: string) => {
		toasts.add({
			description: message,
			duration: 3000,
			placement: 'bottom-right',
			type: type,
			theme: 'light',
		});
	}

	const handleNewInvite = async () => {
		invalidateAll();
		onToast("success", "ny invitasjon kan ikke sendes enda")
	}

	const handleToggleNewForm = () => {
		if (open) {
			open = false;
		} else {
			open = true;
		}
	}

	const handleNewUserInvite = async (email: string, companyId: string, createdBy: string) => {
		const userInvite: UserInvite = { email, companyId, createdBy };
		const body = JSON.stringify(userInvite);
		const response = await fetch(api, {method: 'POST', body, headers});

		if (response.status == 200) {
			onToast("success", "Invitasjon opprettet");
			sort = "createdAt";
		} else {
			onToast("error", "En feil oppstod ved opprett Invitasjon");
		}

		invalidateAll();
	}

	const handleDeleteInvite = async (id?: string) => {
		if (confirm("Bekreft sletting") == true) {
			if (id) {
				const body = JSON.stringify(id);
				const response = await fetch(api, {method: 'DELETE', body, headers});

				if (response.status == 200) {
					onToast("success", "invitasjon slettet");
				} else {
					onToast("error", "En feil oppstod ved sletting");
				}
				invalidateAll();
			}
		}
	}

	const handleDeleteAuthUser = async (id?: string) => {
		if (confirm("Bekreft sletting") == true) {
			if (id) {
				const body = JSON.stringify(id);
				const response = await fetch(authUserApi, {method: 'DELETE', body, headers});

				if (response.status == 200) {
					onToast("success", "invitasjon slettet");
				} else {
					onToast("error", "En feil oppstod ved sletting");
				}
				invalidateAll();
			}
		}
	}

</script>

<div class="prose prose-xl mx-auto p-4 md:py-20" style="max-width:140ch">
	<div class="title">
		<P lineHeight="0" size="3xl" color="dark" weight="thin">Administrer</P>
		<P size="3xl" color="dark">Brukere</P>
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
			<Button pill={true} id="new" on:click={handleToggleNewForm} class="!p-2"><PlusOutline class="w-8 h-8" /></Button>
			<Tooltip type="light" placement="top" triggeredBy="[id='new']">Opprett invitasjon</Tooltip>
		{/if}
	</div>

	{#key open}
		<div use:collapse={{open}}>

				<h3>Send invitasjon</h3>

				<form on:submit|preventDefault={handleNewUserInvite}>
					<label for="name" color="dark">Navn *</label>
					<Input clor="base" name="name" id="name" type="text" bind:value={newInvite.email}/>
					<label for="from">Ledig fra *</label>
					<Input name="from" id="from" type="date" bind:value={newInvite.companyId}/>

					<div class="buttons-container">
						<Button color="primary" on:click={handleToggleNewForm}>Avbryt</Button>
						<Button type="submit" color="primary" disabled={false}>Registrer konsulent</Button>
					</div>
				</form>

		</div>
	{/key}

	{#key sort}
		<Table hoverable={true}>
			<TableBody>
				{#each data.inviteList as invite (invite.id)}
					<TableBodyRow>
						<TableBodyCell>
							<div class="space-between">
								<div class="flex-start">
									<div>
										<P style="margin-top:-0.5rem" lineHeight="0" size="xl" color="dark" weight="normal">*NY*</P>
										<P style="margin-top:-1.7rem; margin-bottom: -0.5rem" lineHeight="0" size="lg" color="dark" weight="thin">{invite.email}</P>
									</div>
									<Badge color="green">Invitert av {invite.createdBy} </Badge>
								</div>

								<div class="flex-end">
									<Badge rounded color="dark" style="margin-top: 0.4rem">
										Invitert {getDateFormat(invite.createdAt)}, {getTimeFormat(invite.createdAt)}
									</Badge>
									<Button pill on:click={() => handleDeleteInvite(invite.id)}>Slett</Button>
								</div>

							</div>
						</TableBodyCell>
					</TableBodyRow>
				{/each}

				{#each sortUsers(data.authUserList, sort) as authUser (authUser.id)}
					<TableBodyRow>
						<TableBodyCell>
							<div class="space-between">
								<div class="flex-start">
									 <div>
										 <P style="margin-top:-0.5rem" lineHeight="0" size="xl" color="dark" weight="normal">{authUser.username}</P>
										 <P style="margin-top:-1.7rem; margin-bottom: -0.5rem" lineHeight="0" size="lg" color="dark" weight="thin">{authUser.email}</P>
									 </div>
									 {#if authUser.admin} <Badge color="yellow">Admin</Badge> {/if}
							  </div>

								<div class="flex-end">
									<Badge rounded color="dark" style="margin-top: 0.4rem">
										Opprettet {getDateFormat(authUser.createdAt)}, {getTimeFormat(authUser.createdAt)}
									</Badge>
									<Button pill on:click={() => handleDeleteAuthUser(authUser.id)}>Slett</Button>
								</div>
							</div>
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
 	.space-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
	}
  .flex-start {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
  }
  .flex-end {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
  }
  .buttons-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      gap:1rem;
  }
</style>

