<script lang="ts">
     import {  P} from "flowbite-svelte";
     import LinksInTextRender from "$lib/components/common/LinksInTextRender.svelte";

    export let data;

    const company = data.company;
 </script>

<section class="max-w-6xl mx-auto md:w-5/5">

    <div class="prose mb-16 mt-8 mx-4" style="max-width:140ch">
        <button on:click={() => window.history.back()}>&larr; Tilbake</button>
        <div style="display: flex; justify-content: center; max-height: 11rem">
            <img src={URL.createObjectURL(new Blob([company?.logo], { type: "image/svg+xml" }))} />
        </div>

        <P size="3xl" color="dark" weight="bold">{company.title}</P>
        <P size="2xl" color="dark" weight="medium">{company.ingress}</P>
        <P size="2xl" color="dark" weight="thin">
            <LinksInTextRender
                    text={company.description}}
                    linkTitle="Her"
                    emailTitle="Send e-post"
            />
        </P>

    </div>
</section>
