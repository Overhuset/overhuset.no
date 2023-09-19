<script lang="ts">
	import { companies } from './companies';
</script>

<div class="grid sm:grid-cols-3 md:grid-cols-4 md:gap-12 my-12 md:my-24">
	{#each companies as company}
		<a
			href={`/company/${company.slug}`}
			class="flex justify-center items-center min-h-[160px] md:last:col-start-3 md:[&:nth-last-child(2)]:col-start-2"
		>
			<img src={company.imgSrc} alt={company.name} class="w-1/2 md:w-28" />
		</a>
	{/each}
</div>
