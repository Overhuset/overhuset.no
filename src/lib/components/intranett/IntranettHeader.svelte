<script lang="ts">
	import { AppBar, getDrawerStore } from '@skeletonlabs/skeleton';
	import { drawerSettings } from '$lib/config/drawerSettings';
	const drawerStore = getDrawerStore();
</script>

<AppBar
	gridColumns="grid-cols-3 "
	slotLead="text-4xl"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
>
	<svelte:fragment slot="lead">
		<button on:click={() => drawerStore.open(drawerSettings)}>🍔</button>
	</svelte:fragment>
	Overhusets Intranett
	<svelte:fragment slot="trail">Logg inn</svelte:fragment>
</AppBar>
