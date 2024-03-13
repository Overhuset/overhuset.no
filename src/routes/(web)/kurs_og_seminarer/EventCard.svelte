<script lang="ts">
    import type {Event} from "$lib/types";
    import collapse from 'svelte-collapse';
    import {getDateFormat, getIsPassed, getTimeFormat} from "$lib/utils/dateUtils";
    import {getLogoFromCompanyName} from "$lib/components/companies";
    import Card from "$lib/components/common/Card.svelte";
    import Divider from "$lib/components/common/Divider.svelte";

    export let event: Event;
    const logo = getLogoFromCompanyName(event.company);
    let open = false;
    const isPassed = getIsPassed(event?.time);

    const toggleOpen = () => open = !open;
</script>

<Card variant={isPassed ? "secondary" : "primary"} onClick={toggleOpen}>
    <div class="spaceBetween">
        <div class="title">

                <div class="prose">
                    <h1>{event.title}</h1>
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

        <button  class="cursor-pointer rounded-lg bg-white px-2 py-1">
            {#if open}Lukk{:else}Les mer{/if}
        </button>
    </div>


    <div use:collapse={{open}} style="width:100%">

        <Divider/>

        <div class="description">
            {#if event.description}
                {#each (event.description?.split(" ") || []) as possibleLink}
                    {#if possibleLink.includes("https")}
                        <a href={possibleLink} target="_blank">{possibleLink}</a>
                    {:else}
                        {`${possibleLink} `}
                    {/if}
                {/each}
            {/if}

            {#if !isPassed}
                <br/>
                <br/>
                <div class="prose">
                    <h3>Påmelding</h3>
                </div>
                {#if event.registration}
                    {#each (event.registration?.split(" ") || []) as possibleLink}
                        {#if possibleLink.includes("https")}
                            <a href={possibleLink} target="_blank">Trykk her</a>
                        {:else if possibleLink.includes("@")}
                            <a href={"mailto:" + possibleLink}>Send e-post</a>
                        {:else}
                            {`${possibleLink} `}
                        {/if}
                    {/each}
                {:else}
                    Ikke nødvendig. Møt opp!
                {/if}
            {/if}
        </div>
    </div>

</Card>

<style>
    a {
        color: rgb(115, 66, 13);
        font-weight: bold;
    }
    button {
        padding: 0.2rem 0.8rem;
        border-radius: 0.5rem;
        color: white;
        background-color: rgb(115, 66, 13);
    }
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
