<script lang="ts">
    import type {Event} from "$lib/types";
    import collapse from 'svelte-collapse';
    import {getDateFormat, getTimeFormat} from "$lib/utils/dateUtils";
    import {getLogoFromCompanyName} from "$lib/components/companies";

    export let event: Event;
    const logo = getLogoFromCompanyName(event.company);
    let open = false;

    const toggleOpen = () => {
       open = !open;
    }


</script>


<div class="card upcoming">
    <div class="spaceBetween">
        <div class="title">
            <div>

                <div class="prose">
                    <h1>{event.title}</h1>
                </div>
                <div>Tid: {getDateFormat(event.time)} kl {getTimeFormat(event.time)}</div>
                <div>Sted: {event.location}</div>
            </div>
        </div>

        <div>
            <img src={logo} alt="" class="w-16" />
        </div>
    </div>

    <div class="spaceBetween2">
        <div class="rowDirection">
            <div> {#if event?.externalsAllowed}✔ Åpen for eksterne {:else} Kun for interne {/if} </div>
            {#if event?.physicalAttendance} <div>✔ Fysisk oppmøte</div>{/if}
            {#if event?.onlineStreaming} <div>✔ Online streaming</div> {/if}
        </div>
        <button on:click={toggleOpen} class="cursor-pointer rounded-lg bg-white px-2 py-1">
            {#if open}Lukk{:else}Les mer{/if}
        </button>
    </div>


    <div use:collapse={{open}} style="width:100%">
        <div class="divider"></div>
        <div class="description">
            {#if event.description} <div>  {event.description}</div> {/if}
            <br/>
            {#if event.registration} <div>  {event.registration}</div> {/if}
        </div>
    </div>

</div>



<style>
    button {
        padding: 0.2rem 0.8rem;
        border-radius: 0.5rem;
        color: white;
        background-color: rgb(115, 66, 13);
    }
    .card {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 1rem;
        background-color: #fcfcfc;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }
    .title {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 2rem;
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
    .upcoming {
        border-left: 7px solid rgb(115, 66, 13);
    }
    .past {
        border-left: 7px solid #ababab;
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
    .divider {
        width: 100%;
        border-bottom: 1px solid #d3d3d3;
        margin: 0.5rem 0;
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
