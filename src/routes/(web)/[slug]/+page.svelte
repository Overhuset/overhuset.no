<script lang="ts">
	export let data;

	const constellation = data.constellation;
	const companiesList = data.companiesList;
	const eventList = data.eventList;

</script>

<div class="prose mx-auto py-4 md:py-20 px-4">
	<div>{constellation.name}</div>
	<div>{constellation.description}</div>
	<div>{constellation.urlRef}</div>
	<div>{constellation.logoRef}</div>

	<div>{companiesList}</div>
	<div>{eventList}</div>
</div>
