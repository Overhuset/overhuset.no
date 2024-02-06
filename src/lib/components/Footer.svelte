<script lang="ts">
	import { page } from "$app/stores";
</script>

{#if $page?.url?.pathname !== "/kino"}
<footer id="kontakt" class="bg-[#6e9a8f] p-12 md:p-20 mt-auto">
	<div class="max-w-8xl mx-auto flex flex-col gap-8">
		<h2 class="text-6xl text-white" style="text-shadow: black 1px 1px">KONTAKT</h2>
		<a href="/" title="Hjem">
			<!-- TODO: Replace with local asset -->
			<img src="/companies/overhuset_logo.svg" class="w-44" alt="" />
		</a>
		<span class="flex flex-col gap-2">
			<a
				href="https://www.google.no/maps/place/Munkedamsveien+3B,+0161+Oslo/@59.9144348,10.7292813,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e7e111e7bb7:0x33191f0728977b46!8m2!3d59.9144348!4d10.7314753"
				target="map"
				class="font-bold"
			>
				Munkedamsveien 3b, 0161 OSLO
			</a>
			<a href="tel:+4792036802">+47 920 36 802</a>
			<a href="mailto:ars.johnsen@overhuset.no">lars.johnsen@overhuset.no</a>
		</span>

		<p class="md:text-right">
			All rights reserved.<br />
			© 2023 Overhuset
		</p>
	</div>
</footer>
{/if}

