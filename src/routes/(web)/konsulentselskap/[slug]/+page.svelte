<script lang="ts">
	import CompanyDetails from "./CompanyDetails.svelte";

	export let data;
</script>

<section class="max-w-6xl mx-auto md:w-5/5">
	{#if data.company}
		<CompanyDetails data={data}/>
	{/if}
</section>

