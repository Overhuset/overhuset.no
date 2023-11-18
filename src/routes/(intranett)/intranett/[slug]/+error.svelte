<script lang="ts">
	import { page } from '$app/stores';
	import Sidebar from '$lib/components/intranett/Sidebar.svelte';
	import { Drawer } from '@skeletonlabs/skeleton';
</script>

<div class="dark w-full flex flex-col gap-8 items-center my-auto mt-20">
	<h1 class="h1 font-bold text-5xl">404</h1>
	<p class="text-3xl">{$page.error?.message}</p>
	<p class="text-xl">
		Prøv en annen lenke, eller
		<a class=" underline" href="/intranett"> gå tilbake til start og prøv igjen</a>
	</p>
</div>

<Drawer>
	<Sidebar />
</Drawer>
