<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import {P} from 'flowbite-svelte';
</script>

<section class="max-w-6xl mx-auto md:w-5/5 mt-10">
	<MetaTags
			title='Overhuset - Kontakt'
			description='Kontaktinformasjon'
	/>

	<div class="prose mb-16 mt-8 mx-4" style="max-width:140ch">

		<P size="3xl" color="dark" weight="bold">
			Kontakt
		</P>

		<P size="2xl" color="dark" weight="medium">
			<a
					href="https://www.google.no/maps/place/Munkedamsveien+3B,+0161+Oslo/@59.9144348,10.7292813,17z/data=!3m1!4b1!4m5!3m4!1s0x46416e7e111e7bb7:0x33191f0728977b46!8m2!3d59.9144348!4d10.7314753"
					target="map"
					class="font-bold"
			>
				Munkedamsveien 3b, 0161 OSLO
			</a>
		</P>

		<P lineHeight="0" size="2xl" color="default" weight="light">
			<a href="tel:+4792036802">+47 920 36 802</a>
			<br/>
			<a href="mailto:lars.johnsen@overhuset.no">lars.johnsen@overhuset.no</a>
		</P>


		<br/>
		<br/>
		<br/>

	</div>
</section>
