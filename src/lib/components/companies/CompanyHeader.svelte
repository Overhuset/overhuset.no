<script lang="ts">
	export let imgSrc: string;
	export let handleClose: () => void;
	export let href: string;
</script>

<div class="relative">
	<h3 class="about-company-header relative">
		<a {href} target="_blank">
			<img src={imgSrc} alt="" class="w-24 m-0" />
		</a>
	</h3>
	<button class="absolute -right-4 -top-4" on:click={handleClose}>X</button>
</div>
