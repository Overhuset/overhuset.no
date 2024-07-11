<script lang="ts">
	import '../../../app.css';
	import { AppShell, initializeStores } from '@skeletonlabs/skeleton';
 	import { onDestroy, onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { browser } from '$app/environment';
	import Header from '$lib/components/intranett/header/Header.svelte';


	initializeStores();

	export let data: LayoutData;

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

<AppShell>
	<svelte:fragment slot="header">
		<Header
			loggedIn={data.loggedIn}
			admin={data.admin}
			companyName={data.companyName}
			userName={data.userName}
			slugTreeItems={data.slugTreeItems}
			headerLinkItems={data.headerLinkItems}
			adminLinkItems={data.adminLinkItems}
		/>
	</svelte:fragment>
	<slot />
</AppShell>
