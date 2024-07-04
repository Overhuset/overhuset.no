<script lang="ts">
	import { page } from '$app/stores';
	import { getTree, isLinkItem, type TreeItem } from '$lib/config/intranettNavigation';
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Button,
		Dropdown,
		DropdownItem,
		Avatar
	} from 'flowbite-svelte';
	import {ChevronDownOutline} from "flowbite-svelte-icons";

	let tree: TreeItem[] = [];
	export let loggedIn: boolean = false;
	export let partner: boolean = false;
	export let admin: boolean = false;
	export let companyName: string = "";
	export let userName: string = "";

	$: activeUrl = $page.url.pathname;

	onMount(() => {
		if (loggedIn) tree = getTree(!dev);
		else tree = [];
	});
</script>

{#key activeUrl}
	<Navbar style="background-color: rgb(38, 33, 29);">
		<NavBrand href="/">
			<img src="/companies/overhuset_logo_white.svg" class="me-3 h-6 sm:h-9" alt="Overhuset Logo"/>
			<span class="self-center whitespace-nowrap text-sm font-normal dark:text-white">Intranett</span>
		</NavBrand>

		<NavHamburger />

		<NavUl {activeUrl} class="order-1">
			{#each tree as item}
				{#if isLinkItem(item)}
					<NavLi href={`/intranett/${item.slug}`}>{item.title}</NavLi>
				{:else}
					{item.title}
				{/if}
			{/each}

			{#if loggedIn}
				<NavLi href={`/intranett/ledig`}>Ledige konsulenter</NavLi>
				<NavLi class="cursor-pointer">
					Administrer<ChevronDownOutline class="w-3 h-3 ms-2 text-primary-800 dark:text-white inline" />
				</NavLi>
				<Dropdown class="w-44 z-20">
					<DropdownItem href="/intranett/vedlikehold_kurs_og_seminarer">Arrangementer</DropdownItem>
					{#if admin}
						<DropdownItem href="/intranett/vedlikehold_brukere">Brukere</DropdownItem>
					{/if}
					{#if partner}
						<DropdownItem href="/intranett/vedlikehold_selskaper">Selskaper</DropdownItem>
						<DropdownItem href="/intranett/vedlikehold_konstellasjoner">Konstellasjoner</DropdownItem>
						<DropdownItem href="/intranett/vedlikehold_ledig">Ledige konsulenter</DropdownItem>
					{/if}
				</Dropdown>
			{/if}
		</NavUl>

		{#if loggedIn}
			<NavUl {activeUrl} class="order-2">
				<NavLi>
					<div class="flex items-center space-x-4 rtl:space-x-reverse">
						<Avatar size="sm"
										data-name={userName}
										dot={{ placement: 'top-right', color: loggedIn ? 'green' : 'grey' }} />
						<div class="space-y-0 font-medium dark:text-white">
							<div>{userName}</div>
							<div class="text-sm text-gray-500 dark:text-gray-400">
								{companyName} {#if admin} (Admin) {/if}
							</div>
						</div>
					</div>
					<Dropdown class="w-44 z-20">
						<DropdownItem>
							<form method="post" action="/intranett?/logout" use:enhance>
								<Button type="submit" color="none" size="sm">
									Logg ut
								</Button>
							</form>
						</DropdownItem>
					</Dropdown>
				</NavLi>
			</NavUl>
		{/if}


	</Navbar>
{/key}

