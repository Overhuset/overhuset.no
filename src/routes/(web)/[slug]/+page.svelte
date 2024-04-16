<script lang="ts">
	import ConstellationDetails from "./ConstellationDetails.svelte";
	export let data;
</script>

<section class="max-w-6xl mx-auto md:w-5/5">
	{#if data.constellation}
		<ConstellationDetails data={data}/>
	{/if}
</section>
