<script lang="ts">
    import type {Event} from "$lib/types";
    import type {Company} from "$lib/types.js";
    import {getIsPassed} from "$lib/utils/dateUtils";
    import {Button, Modal, P} from "flowbite-svelte";
    import { Card } from 'flowbite-svelte';
    import EventCardHeader from "$lib/components/common/events/EventCardHeader.svelte";
    import HtmlRender from "$lib/components/common/HtmlRender.svelte";

    export let event: Event;
    export let companies: Company[];

    const company = event.companyId ? [...companies].find(company => company.id === event.companyId) : null;
    const isPassed = getIsPassed(event?.time);
    let modalOpen = false;
</script>

<Card size="xl" color={isPassed ? "default" : "light"}>

    <div class="colDirection">
        <EventCardHeader event={event} company={company} />
        <Button
            on:click={() => (modalOpen = true)}
            autoclose
            size="xl"
            color={isPassed ? "light" : "dark"}
        >
            Les mer
        </Button>
    </div>

    <Modal bind:open={modalOpen} size="lg" autoclose={true}>
        <EventCardHeader event={event} company={company} />

        <P size="lg" color="dark" weight="light">
            <HtmlRender htmlText={event?.description} />
        </P>

        <svelte:fragment slot="footer">
            {#if event.registration}
                {#if isPassed}
                    Tiden har passert.
                {:else}
                    <HtmlRender htmlText={event.registration} />
                {/if}
            {:else}
                Informasjon om påmelding finnes ikke.
            {/if}
        </svelte:fragment>
    </Modal>
</Card>


<style>
    .colDirection {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
</style>
