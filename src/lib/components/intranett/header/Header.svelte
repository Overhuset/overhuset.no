<script lang="ts">
	import { page } from '$app/stores';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
	} from 'flowbite-svelte';
	import {ChevronDownOutline} from "flowbite-svelte-icons";
	import type { LinkItem, SlugTreeItem } from '$lib/types';
	import User from './User.svelte';
	import { isLinkItem } from '$lib/config/intranett/routes';

	export let slugTreeItems: SlugTreeItem[] = [];
	export let headerLinkItems: LinkItem[] = [];
	export let adminLinkItems: LinkItem[] = [];
	export let loggedIn: boolean = false;
	export let admin: boolean = false;
	export let companyName: string = "";
	export let userName: string = "";

	$: activeUrl = $page.url.pathname;


</script>

{#key activeUrl}
	<Navbar style="background-color: rgb(38, 33, 29);">
		<NavBrand href="/intranett">
			<img src="/companies/overhuset_logo_white.svg" class="me-3 h-6 sm:h-9" alt="Overhuset Logo"/>
			<span class="self-center whitespace-nowrap text-sm font-normal dark:text-white">Intranett</span>
		</NavBrand>

		<NavHamburger />

		<NavUl {activeUrl} class="order-1">
			{#each headerLinkItems as item}
				<NavLi href={item.href}>{item.title}</NavLi>
			{/each}

			{#if loggedIn}
				<NavLi class="cursor-pointer">
					Administrer<ChevronDownOutline class="w-3 h-3 ms-2 text-primary-800 dark:text-white inline" />
				</NavLi>
				<Dropdown class="w-44 z-20">
					{#each adminLinkItems as item}
						<DropdownItem href={item.href}>{item.title}</DropdownItem>
					{/each}
				</Dropdown>
			{/if}
		</NavUl>

		<User
			loggedIn={loggedIn}
			admin={admin}
			companyName={companyName}
			userName={userName}
		/>

	</Navbar>
{/key}

