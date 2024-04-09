<script lang="ts">
    import {AccordionItem} from "@skeletonlabs/skeleton";
    import {Badge, Button, Input, Textarea, Toggle, Tooltip} from "flowbite-svelte";
    import type {AuthUser, Company} from "$lib/types";
    import Label from "$lib/components/common/Label.svelte";

    import {AngleDownOutline, AngleUpOutline} from 'flowbite-svelte-icons';
    export let company: Company;
    export let authUser: AuthUser | undefined;
    export let onChange: (companyChanged: Company) => void;
    export let onDelete: (id: string) => void;
    export let onRevert: () => void;


    const changeAllowed = authUser?.admin;

    let companyToChange: Company = {...company};

    const getIsDirty = (company1: Company, company2: Company) => {
        return JSON.stringify(company1) !== JSON.stringify(company2);
    }

    const handleSave = () => {
        if (companyToChange) {
            onChange(companyToChange);
        }
    }

    const handleDelete = () => {
        if (confirm("Bekreft sletting") == true) {
            if (company?.id) {
                onDelete(company.id);
            }
        }
    }

    const handleRevert = () => {
        companyToChange = {...company};
        onRevert();
    }

</script>

<AccordionItem disabled={!changeAllowed} hover="">

    <span slot="iconOpen">
        {#if changeAllowed}
            <AngleDownOutline size="md" />
        {/if}
    </span>

    <span slot="iconClosed">
        {#if changeAllowed}
            <AngleUpOutline size="md" />
        {/if}
    </span>

    <span slot="lead">
       <div class="title-container">
            <span class="leading-none text-lg dark:text-white">
                {companyToChange.name}
            </span>
            <Badge rounded color="dark"> {(companyToChange.createdBy || "ukjent")}</Badge>
       </div>
    </span>

    <span slot="summary"></span>

    <span slot="content">
        <div class="inputs-container">
            <Label label="Navn på selskap">
                <Input
                    type="text"
                    placeholder="Fullt navn på selskapet."
                    bind:value={companyToChange.name}
                    style="min-width: 25rem"
                />
            </Label>
            <Label label="Kort navn på selskap">
                <Input
                    type="text"
                    placeholder="Alternativt, forkortet navn på selskapet"
                    bind:value={companyToChange.nameShort}
                    style="min-width: 25rem"
                />
            </Label>
            <Label label="Partner">
                <div id="partner">
                     <Toggle
                         checked={companyToChange.partner}
                         on:change={() => companyToChange.partner = !companyToChange.partner}
                         color="purple"
                     />
                </div>
                <Tooltip type="light" placement="bottom" triggeredBy="[id='partner']">Huk på hvis selskapet er partner av Overhuset. Ikke huk på hvis selskapet kun er del av konstellasjon.</Tooltip>
            </Label>
            <Label label="Aktiv">
                <div id="active">
                     <Toggle
                         checked={companyToChange.active}
                         on:change={() => companyToChange.active = !companyToChange.active}
                         color="purple"
                     />
                </div>
                <Tooltip type="light" placement="bottom" triggeredBy="[id='partner']">Huk på hvis selskapet skal være synlig på Overhuset sine sider. Arrangementer osv knyttet til selskapet blir også påvirket av dette valget.</Tooltip>
            </Label>
        </div>

        <div class="inputs-container">
            <Label label="Nettside">
                <Input
                    type="text"
                    placeholder="Url til firmaets hjemmeside"
                    bind:value={companyToChange.url}
                    style="min-width: 25rem"
                />
            </Label>
            <Label label="Logo">
                <Input
                    type="text"
                    placeholder="Url til firmaets logo"
                    bind:value={companyToChange.logoRef}
                    style="min-width: 25rem"
                />
            </Label>

            <a href={`/konsulentselskap/${companyToChange?.nameShort?.toLowerCase()}`} class="flex justify-center items-center min-h-[160px] md:last:col-start-3 md:[&:nth-last-child(2)]:col-start-2">
                <img src={companyToChange.logoRef} alt={companyToChange.name} class="w-1/2 md:w-28" />
            </a>
        </div>

        <Label label="Beskrivelse">
            <div>
                 <Textarea
                     placeholder="Beskrivende tekst om selskapet"
                     rows="10"
                     name="description"
                     bind:value={companyToChange.description}
                 />
            </div>
        </Label>

        <div class="buttons-container">
            {#if changeAllowed}
                <Button pill on:click={handleDelete}>Slett</Button>
                <Button pill on:click={handleRevert} disabled={!getIsDirty(companyToChange, company)}>Forkast endringer</Button>
                <Button pill on:click={handleSave} disabled={!getIsDirty(companyToChange, company)}>Lagre</Button>
            {/if}
        </div>

    </span>
</AccordionItem>


<style>
    .title-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
    }
    .inputs-container {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 2rem;
        margin-bottom: 1rem;
        width: 100%;
    }
    .buttons-container {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

</style>
