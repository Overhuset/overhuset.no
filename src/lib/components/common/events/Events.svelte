<script lang="ts">
    import { Button, ButtonGroup, P } from 'flowbite-svelte';
    import EventCard from "$lib/components/common/events/EventCard.svelte";
    import { getIsPassed } from '$lib/utils/dateUtils';

    export let data;

    const companies = data.companiesList;
    const upcoming = ((data.eventList || []).filter(event => !event.onlineCourse && !getIsPassed(event?.time)));
    const historic = ((data.eventList || []).filter(event => !event.onlineCourse && getIsPassed(event?.time)));
    const online = ((data.eventList || []).filter(event => event.onlineCourse));

    let filterMode: "upcoming" | "historic" | "online" = upcoming.length === 0 ? "historic" : "upcoming";
</script>

<div class="container">
    <ButtonGroup>
        <Button
                size="xl"
                on:click={() => filterMode = "upcoming"}
                checked={filterMode === "upcoming"}>
            Kommende ({upcoming?.length || 0})
        </Button>
        <Button
                size="xl"
                on:click={() => filterMode = "historic"}
                checked={filterMode === "historic"}
        >
            Tidligere ({historic?.length || 0})
        </Button>
    </ButtonGroup>

    {#if online?.length > 0}
        <ButtonGroup>
            <Button
                    size="xl"
                    on:click={() => filterMode = "online"}
                    checked={filterMode === "online"}>
                Online kurs ({online?.length || 0})
            </Button>
        </ButtonGroup>
    {/if}
</div>

<br/>
<br/>

<div class="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
    {#if (filterMode === "upcoming" ? upcoming : (filterMode === "online" ? online : historic)).length === 0 }
        <P size="xl" color="dark" weight="light">
            Ingen arrangementer funnet.
        </P>
    {/if}

    {#each ((filterMode === "upcoming" ? upcoming : (filterMode === "online" ? online : historic))) as event (event.id)}
        <EventCard event={event} companies={companies}/>
    {/each}


</div>

<style>
    .container {
        display: flex;
        justify-content: flex-start;
        gap: 1.5rem;
        flex-wrap: wrap;
    }
</style>
