<script lang="ts">
	import SVGImageRender from "$lib/components/common/SVGImageRender.svelte";
	export let companyList;
 </script>

<div class="grid sm:grid-cols-3 md:grid-cols-4 md:gap-12">
	{#each companyList as company}
		<div>
			<a href={`/konsulentselskap/${company.nameShort}`} class="flex justify-center items-center min-h-[160px] md:last:col-start-3 md:[&:nth-last-child(2)]:col-start-2">
				<SVGImageRender svgString={company?.logo} styleClass="w-1/2 md:w-28"/>
			</a>
		</div>
	{/each}
</div>
