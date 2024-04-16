<script lang="ts">
    import EventCard from "$lib/components/common/EventCard.svelte";
    import {Button, ButtonGroup, P} from "flowbite-svelte";
    import {getIsPassed} from "$lib/utils/dateUtils";

    export let data;

    const constellation = data.constellation;
    const companiesList = data.companiesList;
    const all = (data.eventList || []);
    const upcoming = (all.filter(event => !event.onlineCourse && !getIsPassed(event?.time)));
    const historic = (all.filter(event => !event.onlineCourse && getIsPassed(event?.time)));
    const online = (all.filter(event => event.onlineCourse));
    const logoSrc = URL.createObjectURL(new Blob([constellation?.logo as BlobPart], { type: "image/svg+xml" }));
    let filterMode: "all" | "upcoming" | "historic" | "online" = "all";
</script>

<section class="max-w-6xl mx-auto md:w-5/5">

    <div class="prose mb-16 mt-8 mx-4" style="max-width:140ch">
        <div style="display: flex; justify-content: center ">
            <img src={logoSrc}  class="md:w-2/5 md:block" />
        </div>
        <P size="4xl" color="dark">{constellation.name}</P>
        <P lineHeight="0" size="3xl" color="dark" weight="thin" style="margin-top: -2.5rem">{constellation.description}</P>
        <div>
            <div class="grid sm:grid-cols-3 md:grid-cols-4 md:gap-12">
                {#each companiesList as company (company.id)}
                    <a href={`/konsulentselskap/${company?.nameShort?.toLowerCase()}`}
                        class="flex justify-center items-center min-h-[160px] md:last:col-start-3 md:[&:nth-last-child(2)]:col-start-2">
                        {#if company.logo}
                            <img src={URL.createObjectURL(new Blob([company.logo], { type: "image/svg+xml" }))} class="w-1/2 md:w-28" />
                        {/if}
                    </a>
                {/each}
            </div>

            <br/>
            <br/>
            <br/>

            <P lineHeight="0" size="3xl" color="dark" weight="thin" style="margin-top: -3.5rem">
                {constellation.description2}
            </P>

            <ButtonGroup>
                <Button
                        on:click={() => filterMode = "all"}
                        checked={filterMode === "all"}>
                    Alle ({data.eventList?.length || 0})
                </Button>
                <Button
                        on:click={() => filterMode = "upcoming"}
                        checked={filterMode === "upcoming"}>
                    Kommende ({upcoming?.length || 0})
                </Button>
                <Button
                        on:click={() => filterMode = "online"}
                        checked={filterMode === "online"}>
                    Online kurs ({online?.length || 0})
                </Button>
                <Button
                        on:click={() => filterMode = "historic"}
                        checked={filterMode === "historic"}>
                    Historiske ({historic?.length || 0})
                </Button>
            </ButtonGroup>

            <br/>
            <br/>

            {#each (
                filterMode === "all" ? data.eventList :
                    (filterMode === "upcoming" ? upcoming :
                        (filterMode === "online" ? online :
                            historic))) as event (event.id)}
                <EventCard event={event} companies={companiesList}/>
            {/each}
        </div>
    </div>
</section>
