<script lang="ts">
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
 	import { toasts, ToastContainer, FlatToast }  from "svelte-toasts";
	import {PlusOutline} from "flowbite-svelte-icons";
	import {sortUsers} from "./utils";
	import { getDateFormat, getTimeFormat } from '$lib/utils/dateUtils';

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

	const handleNewInvite = async () => {
		invalidateAll();
		onToast("success", "ny invitasjon kan ikke sendes enda")
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
			<Button pill={true} id="new" on:click={handleNewInvite} class="!p-2"><PlusOutline class="w-8 h-8" /></Button>
			<Tooltip type="light" placement="top" triggeredBy="[id='new']">Opprett ny bruker</Tooltip>
		{/if}
	</div>

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

								<Badge rounded color="dark" style="margin-top: 0.4rem">
									Invitert {getDateFormat(invite.createdAt)}, {getTimeFormat(invite.createdAt)}
								</Badge>
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
										 <P style="margin-top:-0.5rem" lineHeight="0" size="xl" color="dark" weight="normal">	{authUser.username}</P>
										 <P style="margin-top:-1.7rem; margin-bottom: -0.5rem" lineHeight="0" size="lg" color="dark" weight="thin">{authUser.email}</P>
									 </div>
									 {#if authUser.admin} <Badge color="yellow">Admin</Badge> {/if}
							  </div>

								<Badge rounded color="dark" style="margin-top: 0.4rem">
									Opprettet {getDateFormat(authUser.createdAt)}, {getTimeFormat(authUser.createdAt)}
								</Badge>
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
  .buttons-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      gap:1rem;
  }
</style>

