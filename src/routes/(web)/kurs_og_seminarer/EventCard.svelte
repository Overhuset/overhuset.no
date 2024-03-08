<script lang="ts">
    import type {Event} from "$lib/types";
    import {getDateFormat, getTimeFormat} from "$lib/utils/dateUtils";
    import {getLogoFromCompanyName} from "$lib/components/companies";

    export let event: Event;
    const logo = getLogoFromCompanyName(event.company);
</script>


<div class="card upcoming">
    <div class="cardHeader">
        <div class="logoTitle">
            <img src={logo} alt="" class="w-20" />
            <div>
                <div class="prose">
                    <h1>{event.title}</h1>
                </div>
                <div>{getDateFormat(event.time)} kl {getTimeFormat(event.time)}</div>
                <div>Sted: {event.location}</div>
            </div>
        </div>



        <div>
            <div>Presentert av {event.company}</div>
            <div> {#if event?.externalsAllowed}✔ Åpen for eksterne {:else} Kun for interne {/if} </div>

            <div>
                {#if event?.physicalAttendance} <div>✔ Fysisk oppmøte</div>{/if}
                {#if event?.onlineStreaming} <div>✔ Online streaming</div> {/if}
            </div>
        </div>
    </div>

    <div class="divider"></div>

    <div class="description">
        {event.description}
        <br/>
        {event.registration}
    </div>

</div>



<style>
    .card {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 1rem;
        background-color: #fcfcfc;
        border-radius: 0.5rem;
    }
    .logoTitle {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        gap: 2rem;
        margin-bottom: 1rem;
    }
    .upcoming {
        border-left: 7px solid rgb(115, 66, 13);
    }
    .past {
        border-left: 7px solid #ababab;
    }
    .cardHeader {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0 0.4rem;
        gap: 2rem;
    }
    .divider {
        width: 100%;
        border-bottom: 1px solid #d3d3d3;
        margin: 0.4rem 0;
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
