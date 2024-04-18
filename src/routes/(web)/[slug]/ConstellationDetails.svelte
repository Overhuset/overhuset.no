<script lang="ts">
    import {P} from "flowbite-svelte";
    import SVGImageRender from "$lib/components/common/SVGImageRender.svelte";
    import Events from "$lib/components/common/events/Events.svelte";

    export let data;

    const constellation = data.constellation;
 </script>

<section class="max-w-6xl mx-auto md:w-5/5">

    <div class="prose mb-16 mt-8 mx-4" style="max-width:140ch">
        <div style="display: flex; justify-content: center ">
            <SVGImageRender svgString={constellation?.logo} styleClass="md:w-2/5 md:block" />
        </div>
        <P size="3xl" color="dark">{constellation.name}</P>
        <P lineHeight="0" size="2xl" color="dark" weight="thin" style="margin-top: -2.5rem">{constellation.description}</P>
        <div>
            <div class="grid xs: grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-12">
                {#each data.companiesListWithoutOverhuset as company (company.id)}
                    <a href={`/konsulentselskap/${company?.nameShort?.toLowerCase()}`}
                        class="flex justify-center items-center min-h-[160px] md:last:col-start-3 md:[&:nth-last-child(2)]:col-start-2">
                        <SVGImageRender svgString={company?.logo} styleClass="w-28" />
                    </a>
                {/each}
            </div>

            <br/>
            <br/>
            <br/>

            <P lineHeight="0" size="2xl" color="dark" weight="thin" style="margin-top: -3.5rem">
                {constellation.description2}
            </P>

            <Events data={data} />
        </div>
    </div>
</section>
