<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<p>
		Hos Fink finner du en gjeng nerder som elsker det de gjør. Fink er laget av de ansatte, for de
		ansatte, eid av de ansatte. <br /><br />Fink ønsker å være kontrast til det som noen ganger kan
		oppfattes som en kald konsulentverden. Kjerneverdier er inkluderende, varme og nysgjerrig.
	</p>
	<p>Les mer om oss her: <a {href}>{href}</a></p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			Swift, iOS, Android, Flutter, Python, Java, JavaScript, UX, Tjenestedesign, Grafisk Design,
			NodeJS, React, Vue
		</strong>
	</p>
</div>
