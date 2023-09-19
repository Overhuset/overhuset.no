<script lang="ts">
	import { get } from 'radash';
	import type { PageData } from './$types';
	import { type CompanyWithComponent, companiesAsObject } from '$lib/components/companies';

	export let data: PageData;

	const companyComponent = get<CompanyWithComponent>(companiesAsObject, data.company);
</script>

<div class="flex flex-col items-center gap-y-12 mx-8 mb-16 md:mb-24">
	<svelte:component this={companyComponent.component} {...companyComponent} />
</div>
