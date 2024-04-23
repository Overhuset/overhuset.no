<script lang="ts">
 	import VacantCard from "./VacantCard.svelte";
	import collapse from 'svelte-collapse';
 	import CvFileUpload from "../vedlikehold_ledig/CvFileUpload.svelte";
	import {Button, Input, P, Textarea} from "flowbite-svelte";
	let open = false

	export let data;
</script>




<div class="prose prose-xl mx-auto p-4 md:py-20" style="max-width:140ch">
	<div class="layout">
		<P size="3xl" color="dark">ledige konsulenter</P>
		<div>
			<br/>
			<br/>

			<div class="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
				{#each data.vacantList as vacant (vacant.id)}
					<VacantCard vacant={vacant} email={data.email} />
				{/each}

				{#if data.vacantList.length === 0}
					Ingen ledige konsulenter! :D
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	input {
		border: 1px solid #ababab;
		border-radius: 0.3rem;
		padding: 0.2rem 0.4rem;
		margin-bottom: 0.4rem;
	}
	input[type="text"]{
		width: 70%;
	}
	label {
		margin-top: 0.3rem;
		margin-right: 2rem;
	}
	.layout {
		width: 100%;
		max-width: 70rem;
	}
	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.buttons-container {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}
</style>

