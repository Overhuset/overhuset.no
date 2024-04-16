<script lang="ts">
	import ConstellationDetails from "./ConstellationDetails.svelte";

	export let data;
</script>

<section class="max-w-6xl mx-auto md:w-5/5">
	{#if data.constellation}
		<ConstellationDetails data={data}/>
	{:else if data.company}
		<div> nothin here {data.company.id}</div>
	{/if}
</section>
