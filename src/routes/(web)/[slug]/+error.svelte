<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="dark w-full flex flex-col gap-8 items-center my-auto mt-20">
	<h1 class="h1 font-bold text-5xl">{$page.status}</h1>
	<p class="text-3xl">{$page.error?.message}</p>
</div>
