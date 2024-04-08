<script lang="ts">
    import {AccordionItem} from "@skeletonlabs/skeleton";
    import {Badge, Button, Input, Textarea, Toggle, Tooltip} from "flowbite-svelte";
    import type {AuthUser, Constellation} from "$lib/types";
    import Label from "$lib/components/common/Label.svelte";

    import {AngleDownOutline, AngleUpOutline} from 'flowbite-svelte-icons';
    export let constellation: Constellation;
    export let authUser: AuthUser | undefined;
    export let onChange: (constellationChanged: Constellation) => void;
    export let onDelete: (id: string) => void;
    export let onRevert: () => void;


    const changeAllowed = authUser?.admin;

    let constellationToChange: Constellation = {...constellation};

    const getIsDirty = (constellation1: Constellation, constellation2: Constellation) => {
        return JSON.stringify(constellation1) !== JSON.stringify(constellation2);
    }

    const handleSave = () => {
        if (constellationToChange) {
            onChange(constellationToChange);
        }
    }

    const handleDelete = () => {
        if (confirm("Bekreft sletting") == true) {
            if (constellation?.id) {
                onDelete(constellation.id);
            }
        }
    }

    const handleRevert = () => {
        constellationToChange = {...constellation};
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
                {constellationToChange.name}
            </span>
             <Badge rounded color="dark"> {(constellationToChange.createdBy || "ukjent")}</Badge>
       </div>
    </span>

    <span slot="summary"></span>

    <span slot="content">
        <div class="inputs-container">
            <Label label="Navn på konstellasjon">
                <Input
                    type="text"
                    placeholder="Gi konstellasjonen et navn"
                    bind:value={constellationToChange.name}
                    style="min-width: 25rem"
                />
            </Label>
            <Label label="Selskaper i konstellasjonen">
                <Input
                    type="text"
                    placeholder="Legg til ett eller flere selskaper"
                    bind:value={constellationToChange.companies}
                    style="min-width: 25rem"
                />
            </Label>
            <Label label="Aktiv">
                <div id="active">
                     <Toggle
                         checked={constellationToChange.active}
                         on:change={() => constellationToChange.active = !constellationToChange.active}
                         color="purple"
                     />
                </div>
                <Tooltip type="light" placement="bottom" triggeredBy="[id='partner']">Huk på hvis selskapet skal være synlig på Overhuset sine sider. Arrangementer osv knyttet til selskapet blir også påvirket av dette valget.</Tooltip>
            </Label>
        </div>
        <div class="inputs-container">
            <Label label="Logo">
                <Input
                    type="text"
                    placeholder="Url til konstellasjonens logo"
                    bind:value={constellationToChange.logoRef}
                    style="min-width: 25rem"
                />
            </Label>
            <Label label="Url-referanse">
                <div id="urlRef">
                    <Input
                        type="text"
                        placeholder="Legg til en referanse til url for denne konstellasjonen"
                        bind:value={constellationToChange.urlRef}
                        style="min-width: 25rem"
                    />
                    <Tooltip type="light" placement="bottom" triggeredBy="[id='urlRef']">Url til denne konstellasjonen vil bli www.overhuset.no/konstellasjon?ref=url-referanse</Tooltip>
                </div>
            </Label>
        </div>
        <Label label="Beskrivelse">
            <div>
                 <Textarea
                     placeholder="Beskrivende tekst om selskapet"
                     rows="10"
                     name="description"
                     bind:value={constellationToChange.description}
                 />
            </div>
        </Label>

        <div class="buttons-container">
            {#if changeAllowed}
                <Button pill on:click={handleDelete}>Slett</Button>
                <Button pill on:click={handleRevert} disabled={!getIsDirty(constellationToChange, constellation)}>Forkast endringer</Button>
                <Button pill on:click={handleSave} disabled={!getIsDirty(constellationToChange, constellation)}>Lagre</Button>
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
