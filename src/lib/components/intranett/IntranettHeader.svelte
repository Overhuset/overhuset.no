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
		DropdownItem
	} from 'flowbite-svelte';
	import {ArrowRightOutline, ChevronDownOutline} from "flowbite-svelte-icons";

	let tree: TreeItem[] = [];
	export let loggedIn: boolean = false;

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
					<DropdownItem href="/intranett/vedlikehold_selskaper">Selskaper</DropdownItem>
					<DropdownItem href="/intranett/vedlikehold_konstellasjoner">Konstellasjoner</DropdownItem>
					<DropdownItem href="/intranett/vedlikehold_ledig">Ledige konsulenter</DropdownItem>
				</Dropdown>
			{/if}
		</NavUl>

		{#if loggedIn}
			<NavUl {activeUrl} class="order-2">
				<NavLi>
					<form method="post" action="/intranett?/logout" use:enhance>
						<Button type="submit" size="xs">
							Logg ut <ArrowRightOutline />
						</Button>
					</form>
				</NavLi>
			</NavUl>
		{/if}
	</Navbar>
{/key}

