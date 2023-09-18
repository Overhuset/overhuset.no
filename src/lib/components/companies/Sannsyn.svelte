<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<p>
		Sannsyn er et av Norges ledende fagmiljøer innen Data Science og maskinlæring. Vi hjelper privat
		og offentlig sektor å skape konkurransekraft med egne data.<br /><br /> Sannsyn ble etablert i
		2012, noe som gjør oss til et av Norges mest erfarne fagmiljøer innen maskinlæring og data
		science. Inntil 73 prosent av tilgjengelig data blir aldri brukt på en god strategisk måte og
		slik bør det ikke være.<br /><br /> Ved å hjelpe private og offentlige virksomheter å jobbe mer datadrevet,
		ønsker vi å forbedre situasjonen og hjelpe våre oppdragsgivere å skape konkurransefortrinn.
	</p>
	<p>Les mer om oss her: <a {href}>{href}</a></p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			Datavisualisering, datastrategi, dataarkitektur, foredrag, backend-utvikling, prediksjon &
			dataanalyse og personalisering.
		</strong>
	</p>
</div>
