<script lang="ts">
	import '../../../app.css';
	import { AppShell, Drawer, initializeStores } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/intranett/Sidebar.svelte';
	import IntranettHeader from '$lib/components/intranett/IntranettHeader.svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	initializeStores();

	export let data: LayoutData;

	const partnerOnlyPaths = [
		"/intranett/vedlikehold_selskaper",
		"/intranett/vedlikehold_konstellasjoner",
		"/intranett/vedlikehold_ledig",
	];
 // 		<p>Current URL: {$page.url.pathname}</p>
	onMount(() => {
		document.body.setAttribute('data-theme', 'vintage');
		document.body.setAttribute('class', 'dark');
	});

	onDestroy(() => {
		if (browser) {
			document.body.removeAttribute('data-theme');
			document.body.removeAttribute('class');
		}
	});

</script>

<Drawer>
	<Sidebar loggedIn={data.loggedIn} />
</Drawer>

<AppShell>
	<svelte:fragment slot="header">
		<IntranettHeader
			loggedIn={data.loggedIn}
			admin={data.admin}
			partner={data.partner}
			companyName={data.companyName}
			userName={data.userName}
		/>

	</svelte:fragment>
	<slot />
</AppShell>
