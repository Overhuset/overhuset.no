<script lang="ts">
    import type {Event} from "$lib/types";
    import collapse from 'svelte-collapse';
    import {getDateFormat, getIsPassed, getTimeFormat} from "$lib/utils/dateUtils";
    import {getLogoFromCompanyName} from "$lib/components/companies";
    import Card from "$lib/components/common/Card.svelte";
    import Divider from "$lib/components/common/Divider.svelte";
    import LinksInTextRender from "$lib/components/common/LinksInTextRender.svelte";
    import {Button} from "flowbite-svelte";

    export let event: Event;
    const logo = getLogoFromCompanyName(event.company);
    let open = false;
    const isPassed = getIsPassed(event?.time);
    const variant = open ? "primary" : "none";
    const handleToggleOpen = () => {open = !open};
</script>


<Card variant={isPassed ? "secondary" : "primary"} onClick={handleToggleOpen}>
    <div class="spaceBetween">
        <div class="title">
            <div class="prose">
                <h2>{event.title}</h2>
            </div>
            <div>Tid: {getDateFormat(event.time)} kl {getTimeFormat(event.time)}</div>
            <div>Sted: {event.location}</div>
        </div>
        <div>
            <img src={logo} alt="" class="w-16" />
        </div>
    </div>

    <div class="spaceBetween2">
        <div class="rowDirection">
            <div>
                {#if event?.externalsAllowed}
                    ✔ Åpen for eksterne
                {:else}
                    Kun for interne
                {/if}
            </div>

            {#if event?.physicalAttendance}
                <div>✔ Fysisk oppmøte</div>
            {/if}

            {#if event?.onlineStreaming}
                <div>✔ Online streaming</div>
            {/if}
        </div>

        <Button pill color={open ? "primary" : "light"}>
            {#if open}Lukk{:else}Les mer{/if}
        </Button>
    </div>

    <div use:collapse={{open}} style="width:100%">
        <Divider/>

        <div class="description">
            {#if event.description}
                <LinksInTextRender
                    text={event?.description}
                    linkTitle={undefined}
                    emailTitle={undefined}
                />
            {/if}

            {#if !isPassed}
                <br/>
                <br/>
                <div class="prose">
                    <h3>Påmelding</h3>
                </div>
                {#if event.registration}
                    <LinksInTextRender
                        text={event.registration}
                        linkTitle="Trykk her"
                        emailTitle="Send e-post"
                    />
                {:else}
                    Ikke nødvendig. Møt opp!
                {/if}
            {/if}
        </div>
    </div>
</Card>


<style>
    .title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex-wrap: wrap;
        margin-bottom: 1rem;
    }
    .rowDirection {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 2rem;
        flex-wrap: wrap;
    }
    .spaceBetween {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 0.4rem;
        gap: 2rem;
    }
    .spaceBetween2 {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 0.4rem;
        gap: 2rem;
    }
    .description {
        width: 100%;
        padding: 0 0.4rem;
        text-align: left;
        min-height: 5rem;
        margin-top: 0.5rem;
        margin-bottom: 1.5rem;
        white-space: pre-line;
    }
</style>
