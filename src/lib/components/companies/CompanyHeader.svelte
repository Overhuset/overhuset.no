<script lang="ts">
	export let imgSrc: string;
	export let href: string;
</script>

<div>
	<button on:click={() => window.history.back()}>&larr; Tilbake</button>
	<h2>
		<a {href} target="_blank">
			<img src={imgSrc} alt="" class="w-24 m-0" />
		</a>
	</h2>
</div>
