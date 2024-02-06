<script lang="ts">
	import { page } from "$app/stores";
</script>

{#if $page?.url?.pathname !== "/kino"}
<header
	class="flex md:flex-row flex-col justify-between items-center gap-6 md:items-end mt-16 md:mt-24 mb-12 mx-auto max-w-8xl w-full md:px-12"
>
	<a href="/" title="Hjem">
		<img src="/companies/overhuset_logo.svg" class="w-60" alt="" />
	</a>
	<nav>
		<ul class="flex gap-4 md:items-end text-sm md:text-lg font-light">
			<li><a href="/">Hjem</a></li>
			<li><a href="/#selskapene">Selskapene</a></li>
			<li><a href="/#om_oss">Om oss</a></li>
			<li><a href="/kurs_og_seminarer">Kurs og Kompetanse</a></li>
			<li><a href="/#kontakt">Kontakt</a></li>
			<li><a href="/intranett">Intranett</a></li>
		</ul>
	</nav>
</header>
{/if}
