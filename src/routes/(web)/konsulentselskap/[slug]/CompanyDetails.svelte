<script lang="ts">
     import {  P} from "flowbite-svelte";
     import HtmlRender from "$lib/components/common/HtmlRender.svelte";
     import SVGImageRender from "$lib/components/common/SVGImageRender.svelte";

    export let data;

    const company = data.company;
 </script>

<section class="max-w-6xl mx-auto md:w-5/5">

    <div class="prose mb-16 mt-8 mx-4" style="max-width:140ch">
        <button on:click={() => window.history.back()}>&larr; Tilbake</button>
        <div style="display: flex; justify-content: center; max-height: 11rem">
            <SVGImageRender svgString={company?.logo} styleClass={undefined} />
        </div>

        <P size="3xl" color="dark" weight="bold">{company.title}</P>
        <P size="2xl" color="dark" weight="medium">{company.ingress}</P>
        <P size="2xl" color="dark" weight="thin">
            <HtmlRender htmlText={company?.description} />
        </P>

    </div>
</section>
