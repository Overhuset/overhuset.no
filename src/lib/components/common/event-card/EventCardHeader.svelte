<script lang="ts">
    import type {Company} from "$lib/types.js";
    import type {Event} from "$lib/types.js";
    import {getDateFormat, getTimeFormat} from "$lib/utils/dateUtils.js";
    import {CalendarMonthSolid, MapPinAltSolid} from "flowbite-svelte-icons";
    import SVGImageRender from "$lib/components/common/SVGImageRender.svelte";
    import {P} from "flowbite-svelte";

    export let event: Event | undefined | null;
    export let company: Company | undefined | null;
</script>

<div>

    <div class="minusMargin">
        <SVGImageRender svgString={company?.logo} styleClass="w-16" />
    </div>

    <div class="">
        <P size="2xl"  weight="medium">
            {event?.title}
        </P>
    </div>

    <div style="margin-top: -2.5rem">
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

    <div style="margin-top: -1rem">
        {#if event?.time}
            <div class="rowDirection">
                <P size="lg" weight="medium">
                    <CalendarMonthSolid size="lg"/>
                </P>
                <P size="lg" weight="medium">
                    <span>{getDateFormat(event?.time)} </span>
                    {#if !event?.fullDay}<span> kl {getTimeFormat(event?.time)}</span>{/if}
                </P>

                {#if event?.timeEnd}
                    <P size="lg" weight="light">
                        ( <span>Varer til {getDateFormat(event?.timeEnd)} </span>
                        {#if !event?.fullDay}<span> kl {getTimeFormat(event?.timeEnd)}</span>{/if}
                        )
                    </P>
                {/if}
            </div>
        {/if}
    </div>

    <div class="minusMargin">
        <div class="rowDirection">
            <P size="lg" weight="medium">
                <MapPinAltSolid size="lg"/>
            </P>
            <P size="lg" weight="medium">
                {#if event?.location}<span>{event?.location}</span>{:else}<span>Ikke angitt</span>{/if}
            </P>
        </div>
    </div>

</div>


<style>
    .minusMargin {
        margin-top: -2rem;
    }
    .rowDirection {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
        flex-wrap: no-wrap;
    }
</style>