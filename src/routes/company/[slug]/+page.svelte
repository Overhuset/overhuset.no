<script lang="ts">
	import { get } from 'radash';
	import type { PageData } from './$types';
	import { type CompanyWithComponent, companiesAsObject } from '$lib/components/companies';

	export let data: PageData;

	const companyComponent = get<CompanyWithComponent>(companiesAsObject, data.company);
</script>

<div class="flex flex-col items-center gap-y-12">
	<svelte:component this={companyComponent.component} {...companyComponent} />
</div>
