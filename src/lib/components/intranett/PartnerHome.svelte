<script lang="ts">

	export let company;
	export let constellationList;

</script>

<div>
	{company.name} (partner : {company.Prtner ? "ja" : "nei"})
	<br/>

	Del av konstellasjoner:
	<br/>
	{#each constellationList as constellation (constellation.id)}
		<div>
			{constellation.id}
			{constellation.name}
		</div>
	{/each}
</div>

