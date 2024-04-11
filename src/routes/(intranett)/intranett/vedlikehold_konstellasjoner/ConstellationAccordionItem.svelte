<script lang="ts">
    import {AccordionItem} from "@skeletonlabs/skeleton";
    import {Badge, Button, Input, MultiSelect, Select, Textarea, Toggle, Tooltip} from "flowbite-svelte";
    import type {AuthUser, Company, Constellation} from "$lib/types";
    import Label from "$lib/components/common/Label.svelte";

    import {AngleDownOutline, AngleUpOutline} from 'flowbite-svelte-icons';
    import FileUpload from "./FileUpload.svelte";
    import {getDateFormat} from "$lib/utils/dateUtils";
    export let constellation: Constellation;
    export let authUser: AuthUser | undefined;
    export let companies: Company[];
    export let onChange: (constellationChanged: Constellation) => void;
    export let onDelete: (id: string) => void;
    export let onRevert: () => void;


    const changeAllowed = authUser?.admin;
    const companiesOptions: {value: string, name: string}[] = companies.map(company => ({ value: company.id || "", name: company.nameShort || ""}));

    let constellationToChange: Constellation = {...constellation};
    let selectedCompanies = constellation.companies?.split(";");
    let loading = false;

    const getIsDirty = (constellation1: Constellation, constellation2: Constellation, companies: string[]) => {
         const companiesChanged = companies?.join(";") !== constellation1.companies;
        return (JSON.stringify(constellation1) !== JSON.stringify(constellation2)) || companiesChanged;
    }

    const handleSave = () => {
        if (constellationToChange) {
            onChange({
                ...constellationToChange,
                companies: selectedCompanies?.join(";")
            });
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
        selectedCompanies = constellation.companies?.split(";");
        onRevert();
    }

    const handleFileUploaded = (path: string) => {
        constellationToChange = {...constellationToChange, logoRef: path};
    }

    const handleLoadingStateChange = (loading: boolean) => {
        loading = loading;
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
       </div>
        <Badge rounded color="dark" style="margin-top: 0.4rem">
            Opprettet {getDateFormat(constellationToChange.createdAt)} av {(constellationToChange.createdBy)}
        </Badge>
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

            <Label label="Url-referanse">
                <div id="urlRef">
                    <Input
                        type="text"
                        placeholder="Legg til en referanse for denne konstellasjonen"
                        bind:value={constellationToChange.urlRef}
                        style="min-width: 25rem"
                    />
                    <Tooltip type="light" placement="bottom" triggeredBy="[id='urlRef']">Url til denne konstellasjonen vil bli www.overhuset.no/{constellationToChange.urlRef || "referanse"}</Tooltip>
                </div>
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
                <div id="logo">
                     <Textarea
                             placeholder="klipp og lim inn logo i svg-format her"
                             rows="7"
                             name="logo"
                             bind:value={constellationToChange.logoRef}
                             style="min-width: 25rem"
                     />
                </div>
                <Tooltip type="light" placement="bottom" triggeredBy="[id='logo']">Her skal grafikk for log inn i svg-format. Klipp og lim innholdet inn her.</Tooltip>
            </Label>
                <Label label="Logo (forhåndsvisning)">
                <div  style="max-height: 10rem; max-width: 25rem; overflow:auto;">
                    {@html constellationToChange.logoRef}
                </div>
            </Label>
        </div>

        <div class="inputs-container">
           <Label label="Selskaper i konstellasjonen">
                <div id="companies">
                    <MultiSelect
                        items={companiesOptions}
                        bind:value={selectedCompanies}
                        class="mb-2"
                        size="lg"
                        placeholder="Ingen selskaper valgt"
                    />
                </div>
                <Tooltip type="light" placement="bottom" triggeredBy="[id='companies']">Velg ett, eller flere selskaper.</Tooltip>
            </Label>
        </div>

        <Label label="Beskrivelse">
            <div>
                 <Textarea
                     placeholder="Beskrivende tekst om konstelasjone, del 1"
                     rows="7"
                     name="description"
                     bind:value={constellationToChange.description}
                 />
            </div>
        </Label>

        <div class="inputs-container">
            {#each companies as company (company.id)}
                {#if selectedCompanies?.includes(company?.id || "")}
                    <a href={`/konsulentselskap/${company?.nameShort?.toLowerCase()}`} >
                        <img src={company.logoRef} alt={company.name} class="h-10"/>
                    </a>
                {/if}
            {/each}
        </div>

        <Label label="Beskrivelse - fortsettelse etter selskapslogoer">
            <div>
                 <Textarea
                     placeholder="Beskrivende tekst om konstelasjonen, del 2"
                     rows="7"
                     name="description2"
                     bind:value={constellationToChange.description2}
                 />
            </div>
        </Label>

        <div class="buttons-container">
            {#if changeAllowed}
                <Button pill on:click={handleDelete}>Slett</Button>
                <Button pill on:click={handleRevert} disabled={!getIsDirty(constellationToChange, constellation, selectedCompanies)}>Forkast endringer</Button>
                <Button pill on:click={handleSave} disabled={!getIsDirty(constellationToChange, constellation, selectedCompanies)}>Lagre</Button>
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
