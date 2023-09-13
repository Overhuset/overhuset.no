<script lang="ts">
	import {
		Modal,
		getModalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import { companies, type CompanyWithComponent } from './companies';

	const modalStore = getModalStore();

	const selectCompany = (company: CompanyWithComponent) => {
		const modal: ModalSettings = {
			type: 'component',
			component: company.name,
			backdropClasses: '!bg-white/70',
			modalClasses: '!bg-white !block shadow-lg rounded-lg px-8 py-4'
		};
		modalStore.trigger(modal);
	};

	const modalComponentRegistry: Record<string, ModalComponent> = companies.reduce((acc, curr) => {
		acc = {
			...acc,
			[curr.name]: {
				ref: curr.component,
				props: curr
			}
		};
		return acc;
	}, {});
</script>

<div class="grid sm:grid-cols-3 md:grid-cols-4 md:gap-32 my-12 md:my-24">
	{#each companies as company}
		<button
			on:click={() => selectCompany(company)}
			class="flex justify-center items-center min-h-[160px]"
		>
			<img src={company.imgSrc} alt={company.name} class="w-1/2 md:w-28" />
		</button>
	{/each}
</div>

<Modal components={modalComponentRegistry} />
