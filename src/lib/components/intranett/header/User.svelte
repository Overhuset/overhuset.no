<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import {
		NavLi,
		NavUl,
		Button,
		Dropdown,
		DropdownItem,
		Avatar
	} from 'flowbite-svelte';

	export let loggedIn: boolean = false;
	export let admin: boolean = false;
	export let companyName: string = "";
	export let userName: string = "";

	$: activeUrl = $page.url.pathname;


</script>

{#key activeUrl}
		{#if loggedIn}
			<NavUl {activeUrl} class="order-2">
				<NavLi>
					<div style="cursor: pointer" class="flex items-center space-x-4 rtl:space-x-reverse">
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
{/key}