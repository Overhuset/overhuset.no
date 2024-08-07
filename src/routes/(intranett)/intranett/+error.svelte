<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="dark w-full flex flex-col gap-8 items-center my-auto mt-20">
	<h1 class="h1 font-bold text-5xl">{$page.status}</h1>
	<p class="text-3xl">
		{$page.error?.message} <br/>
	</p>
	{#if $page.status === 403}
		<p class="text-3xl">Kontakt administrator</p>
	{/if}
	<p class="text-xl">
		<a class="underline" href="/intranett">Gå Hjem</a>
	</p>
</div>
