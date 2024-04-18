<script lang="ts">
    import type {Company} from "$lib/types.js";
    import type {Event} from "$lib/types.js";
    import {daysBetween, getDateFormat, getIsPassed, getTimeFormat} from "$lib/utils/dateUtils.js";
    import {CalendarMonthSolid, MapPinAltSolid} from "flowbite-svelte-icons";
    import SVGImageRender from "$lib/components/common/SVGImageRender.svelte";
    import {Badge, Indicator, P} from "flowbite-svelte";

    export let event: Event | undefined | null;
    export let company: Company | undefined | null;

    const isPassed = getIsPassed(event?.time);
</script>

<div>

    <div style="margin-top: -1.5rem; height: 4.5rem;" class="spaceBetween">
        <SVGImageRender svgString={company?.logo} styleClass="w-16" />
        {#if !isPassed}
            <Badge color="green" rounded style="padding: 0.4rem 0.5rem;" >
                <Indicator color="green" size="lg" class="me-1" /> Om {daysBetween(event?.time, new Date())} dager
            </Badge>
        {/if}
    </div>

    <div style="margin-top: -1em">
        <P size="xl"  weight="medium">
            {event?.title}
        </P>
    </div>

    <div style="margin-top: -2rem">
        <div class="rowDirection">
            <P size="lg" color="dark" weight="light">
                ✔ {#if event?.externalsAllowed} Åpent for eksterne {:else} Kun for interne {/if}
            </P>

            {#if event?.onlineCourse}
                <P size="lg" color="dark" weight="light">
                    ✔ Online-kurs
                </P>
            {:else}
                {#if event?.physicalAttendance}
                    <P size="lg" color="dark" weight="light">
                        ✔ Fysisk oppmøte
                    </P>
                {/if}

                {#if event?.onlineStreaming}
                    <P size="lg" color="dark" weight="light">
                        ✔ Online streaming
                    </P>
                {/if}
            {/if}
        </div>
    </div>

    <div style="margin-top: -2rem">
        {#if event?.time}
            <div class="rowDirection">
                <CalendarMonthSolid size="lg" weight="thin" color={isPassed ? "silver" : "dark"}/>
                <P size="lg"
                   weight={isPassed ? "thin" : "medium"}
                   color={isPassed ? "silver" : "dark"}>
                    <span>{getDateFormat(event?.time)} </span>
                    {#if !event?.fullDay}<span> kl {getTimeFormat(event?.time)}</span>{/if}
                </P>

                {#if event?.timeEnd}
                    <P size="lg" weight="light" color={isPassed ? "silver" : "dark"}>
                        ( <span>Varer til {getDateFormat(event?.timeEnd)} </span>
                        {#if !event?.fullDay}<span> kl {getTimeFormat(event?.timeEnd)}</span>{/if}
                        )
                    </P>
                {/if}

            </div>
        {/if}
    </div>

    <div style="margin-top: -2.5rem">
        <div class="rowDirection">
            <MapPinAltSolid size="lg" color={isPassed ? "silver" : "dark"}/>
            <P size="lg"
               weight={isPassed ? "thin" : "medium"}
               color={isPassed ? "silver" : "dark"}>
                {#if event?.location}<span>{event?.location}</span>{:else}<span>Ikke angitt</span>{/if}
            </P>
        </div>
    </div>

</div>


<style>
    .rowDirection {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
        flex-wrap: no-wrap;
    }
    .spaceBetween {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        flex-wrap: no-wrap;
    }
</style>