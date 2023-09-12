<script lang="ts">
	export let data;
</script>

{#if data.pets && data.pets.length}
	<ul>
		{#each data.pets as pet}
			<li>{pet.name}</li>
		{/each}
	</ul>
{:else}
	<p>No pets found.</p>
{/if}
