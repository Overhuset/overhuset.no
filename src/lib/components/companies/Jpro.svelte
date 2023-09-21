<script lang="ts">
	import CompanyHeader from './CompanyHeader.svelte';

	export let imgSrc: string;
	export let href: string;
</script>

<div class="prose">
	<CompanyHeader {href} {imgSrc} />
	<p>
		JProfessionals - av og for utviklere!<br /><br />JProfessionals AS er et konsulentselskap med
		over 65 svært dyktige konsulenter. I gjennomsnitt har konsulentene våre over 18 års erfaring. Vi
		elsker teknologi og koding - og spesialiserer oss på å levere dyktige konsulenter til
		utviklings- og arkitekturoppgaver hos våre kunder.<br /><br />JPro er en
		fullstack-tjenesteleverandør som leverer tjenester på både frontend og backend. Våre konsulenter
		har lang fartstid i bransjen og en sterk CV, med god kjennskap til nye teknologier og erfaringen
		som trengs for å finne de beste løsningene på dine utfordringer. <br /><br />Med oss får du en
		leverandør som har knalltro på synergien mellom fornøyde ansatte, gode tekniske løsninger og
		fornøyde kunder.
	</p>
	<p>Les mer om oss her: <a {href}>{href}</a></p>
	<h3>Fagområder</h3>
	<p>
		<strong>
			Java, Kotlin, React, Angular, Javascript, Typescript, Docker, Kubernetes, AWS, Azure,
			Arkitektur, Systemutvikling og Integrasjon i tillegg til mye annet.
		</strong>
	</p>
</div>
