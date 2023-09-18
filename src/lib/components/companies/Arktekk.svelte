<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<p>
		Arktekk er "Scala-sjappa" i Norge. Hos oss finner du eksperter på Scala og funksjonell
		programmering. Vårt fokus er fag. Vi dyrker et fagmiljø som alltid vil være med på lasset inn
		til alle våre kunder.<br /><br />Hvert år arrangerer vi den internasjonalt anerkjente
		konferansen flatpMap(Oslo), som gjester entusiaster for funksjonell programmering fra hele
		verden.<br /><br />
	</p>
	<h3>Fagområder</h3>
	<p>
		<strong> Scala og funksjonell programmering. </strong>
	</p>
</div>
