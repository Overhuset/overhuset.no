<script lang="ts">
	import { page } from "$app/stores";
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
	} from 'flowbite-svelte';
console.log("$page.url.pathname: ", $page.url.pathname);
	$: activeUrl = $page.url.pathname;
</script>

{#if $page?.url?.pathname !== "/kino"}

	{#key activeUrl}
		<Navbar>
			<NavBrand href="/">
				<img src="/companies/overhuset_logo.svg" class="w-60" alt="" />
			</NavBrand>
			<NavHamburger />
			<NavUl {activeUrl} class="order-1">
				<NavLi href={`/`}>Om oss</NavLi>
				<NavLi href={"/kurs_og_seminarer"}>Kurs og Kompetanse</NavLi>
				<NavLi href={"/kontakt"}>Kontakt</NavLi>
				<NavLi href={"/intranett"}>Intranett</NavLi>
			</NavUl>
		</Navbar>
	{/key}
{/if}
