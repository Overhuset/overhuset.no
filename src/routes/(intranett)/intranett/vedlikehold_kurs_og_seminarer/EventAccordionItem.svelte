<script lang="ts">
    import {
        getDateFormat,
        getDateTimeFormatForDatePicker,
        getTimeFormat
    } from "$lib/utils/dateUtils";
    import {AccordionItem} from "@skeletonlabs/skeleton";
    import {Button, Input, Textarea, Toggle, Select, Tooltip} from "flowbite-svelte";
    import type {AuthUser, Company, Event} from "$lib/types";
    import Label from "$lib/components/common/Label.svelte";
    import {getIsSameDomain} from "$lib/utils/domainUtils";
    import { Badge } from 'flowbite-svelte';
    import {AngleDownOutline, AngleUpOutline} from 'flowbite-svelte-icons';

    export let event: Event;
    export let companies: Company[];
    export let authUser: AuthUser | undefined;
    export let company: Company | undefined;
    export let onChange: (eventChanged: Event) => void;
    export let onDelete: (id: string) => void;
    export let onRevert: () => void;

    // @ts-ignore
    const companiesOptions: {value: string, name: string}[] = companies.map(company => ({ value: company.id || "", name: company.nameShort || ""}));

    const getEventWithDatePickerFormat = (event: Event) => {
        return {
            ...event,
            time: getDateTimeFormatForDatePicker(event?.time),
            timeEnd: getDateTimeFormatForDatePicker(event?.timeEnd)
        }
    };

    let eventToChange: Event = getEventWithDatePickerFormat(event);

    const getIsDirty = (eventToChange: Event, event: Event) => {
        const compareEvent = getEventWithDatePickerFormat(event);
        return JSON.stringify(eventToChange) !== JSON.stringify(compareEvent);
    }

    const changeAllowed = authUser?.admin || getIsSameDomain(authUser?.email, event.createdBy);

    const handleSave = () => {
        onChange(eventToChange);
    }

    const handleDelete = () => {
        if (confirm("Bekreft sletting") == true) {
            if (event?.id) {
                onDelete(event.id);
            }
        }
    }

    const handleRevert = () => {
        eventToChange = {...event};
        onRevert();
    }

</script>

<AccordionItem hover="" disabled={!changeAllowed}>

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
                {eventToChange.title}
            </span>
            <span class="font-thin leading-none text-lg dark:text-white">
                {#if event.time}
                    {#if event.timeEnd}<span>Fra </span>{/if}
                    <span>{getDateFormat(event.time)} </span>
                    {#if !event?.fullDay}<span> kl {getTimeFormat(event.time)}</span>{/if}

                    {#if event.timeEnd}
                        <span> til </span>
                        <span>{getDateFormat(event.timeEnd)} </span>
                        {#if !event?.fullDay}<span> kl {getTimeFormat(event.timeEnd)}</span>{/if}
                    {/if}
                {:else}
                    <span>Tid ikke angitt</span>
                {/if}

                {#if event.location}
                    <span> - {event.location}</span>
                {/if}
            </span>
        </div>

        <Badge rounded color="dark" style="margin-top: 0.4rem">
            Opprettet {getDateFormat(event.createdAt)} av {(event.createdBy)}
        </Badge>
    </span>

    <span slot="summary">

    </span>

    <span slot="content">
        <div class="inputs-container">
            <Label label="Tittel">
                <Input
                    type="text"
                    placeholder="Tittel på arrangement"
                    bind:value={eventToChange.title}
                    style="min-width: 25rem"
                />
            </Label>
            <Label label="Sted">
                <Input
                    type="text"
                    placeholder="Lokasjon for arrangement"
                    bind:value={eventToChange.location}
                    style="min-width: 25rem"
                />
            </Label>
            <Label label="Selskap">
                <Select
                    placeholder="Ikke valgt"
                    items={companiesOptions}
                    bind:value={eventToChange.companyId}
                    disabled={!company?.partner}
                    style="min-width: 25rem"
                />
            </Label>
        </div>

        <div class="inputs-container">
            <Label label="Tidspunkt">
                <Input
                    id="time"
                    type="datetime-local"
                    bind:value={eventToChange.time}
                    style="min-width: 12rem"
                />
                <Tooltip type="light" placement="bottom" triggeredBy="[id='time']">Ikke påkrevd. Feks ved online-kurs, kan det være nyttig å ikke sette denne.</Tooltip>
            </Label>

            <Label label="Tidspunkt slutt">
                <Input
                   id="timeEnd"
                   type="datetime-local"
                   bind:value={eventToChange.timeEnd}
                   style="min-width: 12rem"
                />
                 <Tooltip type="light" placement="bottom"  triggeredBy="[id='timeEnd']">Ikke påkrevd. Feks ved online-kurs eller heldags-arrangement osv, kan det være nyttig å ikke sette denne.</Tooltip>
            </Label>
            <Label label="Skjul klokkeslett">
                <div id="fullDay">
                     <Toggle
                         checked={eventToChange.fullDay}
                         on:change={() => eventToChange.fullDay = !eventToChange.fullDay}
                         color="purple"
                     />
                </div>
                <Tooltip type="light" placement="bottom" triggeredBy="[id='fullDay']">Viser kun dato, uten tidspunkt i oversikt over arrangement.</Tooltip>
            </Label>
        </div>

        <Label label="Beskrivelse">
            <div>
                <Textarea placeholder="Agenda og informasjon om arrangementet. Husk mellomrom foran og etter linker i teksten" rows="10" name="description" bind:value={eventToChange.description} />
            </div>
        </Label>

        <br/>

        <Label label="Registrering">
          <div>
              <Textarea placeholder="Forklar hvordan man melder seg på. Husk mellomrom foran og etter linker i teksten. La stå tom hvis man kan komme uanmeldt" rows="4" name="registration" bind:value={eventToChange.registration} />
          </div>
        </Label>

        <br/>

        <div class="inputs-container">
          <Label label="Åpent for eksterne">
                <div id="externalsAllowed">
                     <Toggle
                         checked={eventToChange.externalsAllowed}
                         on:change={() => eventToChange.externalsAllowed = !eventToChange.externalsAllowed}
                         color="purple"
                     />
                </div>
                <Tooltip type="light" placement="bottom"  triggeredBy="[id='externalsAllowed']">Markerer arrangement som åpent for eksterne.</Tooltip>
            </Label>
            <Label label="Fysisk oppmøte">
                <div id="physicalAttendance">
                    <Toggle
                        checked={eventToChange.physicalAttendance}
                        on:change={() => eventToChange.physicalAttendance = !eventToChange.physicalAttendance}
                        color="purple"
                    />
                </div>
                <Tooltip type="light" placement="bottom"  triggeredBy="[id='physicalAttendance']">Velg denne dersom arrangementet har et fysisk oppmøtested.</Tooltip>
            </Label>
            <Label label="Online streaming">
                <div id="onlineStreaming">
                     <Toggle
                         checked={eventToChange.onlineStreaming}
                         on:change={() => eventToChange.onlineStreaming = !eventToChange.onlineStreaming}
                         color="purple"
                     />
                </div>
                <Tooltip type="light" placement="bottom"  triggeredBy="[id='onlineStreaming']">Velg denne dersom arrangementet streames.</Tooltip>
            </Label>
            <Label label="Online-kurs">
                <div id="onlineCourse">
                    <Toggle
                        checked={eventToChange.onlineCourse}
                        on:change={() => eventToChange.onlineCourse = !eventToChange.onlineCourse}
                        color="purple"
                    />
                </div>
                <Tooltip type="light" placement="bottom" triggeredBy="[id='onlineCourse']">Velg denne dersom arrangementet er et online-kurs, kun på nett.</Tooltip>
            </Label>
            <Label label="Publisert">
                <div id="published">
                     <Toggle
                         checked={eventToChange.published}
                         on:change={() => eventToChange.published = !eventToChange.published}
                         color="purple"
                     />
                </div>
                <Tooltip type="light" placement="bottom" triggeredBy="[id='published']">Arrangementet er synlig i oversikten når denne er valgt.</Tooltip>
            </Label>
          </div>

        <div class="buttons-container">
            <Button pill on:click={handleDelete}>Slett</Button>
            <Button pill on:click={handleRevert} disabled={!getIsDirty(eventToChange, event)}>Forkast endringer</Button>
            <Button pill on:click={handleSave} disabled={!getIsDirty(eventToChange, event)}>Lagre</Button>
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
