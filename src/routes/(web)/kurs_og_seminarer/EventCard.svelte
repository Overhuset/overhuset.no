<script lang="ts">
    import type {Event} from "$lib/types";
    import collapse from 'svelte-collapse';
    import {getDateFormat, getIsPassed, getTimeFormat} from "$lib/utils/dateUtils";
    import {getLogoFromCompanyName} from "$lib/components/companies";
    import Card from "$lib/components/common/Card.svelte";
    import Divider from "$lib/components/common/Divider.svelte";
    import LinksInTextRender from "$lib/components/common/LinksInTextRender.svelte";
    import {Button} from "flowbite-svelte";
    import type {Company} from "$lib/types.js";
    import {CalendarMonthSolid, MapPinAltSolid} from "flowbite-svelte-icons";

    export let event: Event;
    export let companies: Company[];

    const company = event.companyId ? [...companies].find(company => company.id === event.companyId) : null;
    const logo = company ? company.logoRef :  getLogoFromCompanyName(event?.company); // hack until all refs are from database.
    const companyName = (company ? company.nameShort : event.company) || "Overhuset"; // hack until all refs are from database.
    let open = false;
    const isPassed = getIsPassed(event?.time);

    const handleToggleOpen = () => {open = !open};
</script>


<Card variant={isPassed ? "secondary" : "primary"} onClick={handleToggleOpen}>
    <div class="spaceBetween">
        <div class="title">
            <div class="prose">
                <h2>{event.title}</h2>
            </div>

            <div class="iconLabel">
                <CalendarMonthSolid />
                {#if event.time}
                    {#if event.timeEnd}<span>Fra </span>{/if}

                    <span>{getDateFormat(event.time)} </span>
                    {#if !event?.fullDay}<span> kl {getTimeFormat(event.time)}</span>{/if}

                    {#if event.timeEnd}
                        <span> til </span>
                        <span>{getDateFormat(event.timeEnd)} </span>
                        {#if !event?.fullDay}<span> kl {getTimeFormat(event.timeEnd)}</span>{/if}
                    {/if}
                {:else}
                    <span>Ikke angitt</span>
                {/if}
            </div>
            <div class="iconLabel">
                <MapPinAltSolid size="md"/>
                {#if event.location}<span>{event.location}</span>{:else}<span>Ikke angitt</span>{/if}
            </div>
        </div>
        <div>
            <img src={logo} alt="" class="w-16" />
        </div>
    </div>

    <div class="spaceBetween2">
        <div class="rowDirection">
            <div>
                Av {companyName}
            </div>
            <div>✔ {#if event?.externalsAllowed} Åpent for eksterne {:else} Kun for interne {/if}</div>
            {#if event?.onlineCourse}
                <div>✔ Online-kurs</div>
            {/if}

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
    .iconLabel {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
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
