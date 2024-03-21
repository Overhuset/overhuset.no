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
    import {AngleDownOutline, AngleUpOutline, CalendarMonthSolid, CalendarWeekSolid} from 'flowbite-svelte-icons';

    export let event: Event;
    export let companies: Company[];
    export let authUser: AuthUser | undefined;
    export let onChange: (eventChanged: Event) => void;
    export let onDelete: (id: string) => void;
    export let onRevert: () => void;

    const companiesOptions: {value: string, name: string}[] = companies.map(company => ({ value: company.id || "", name: company.nameShort || ""}));

    let eventToChange: Event = {
        ...event,
        time: getDateTimeFormatForDatePicker(event?.time),
        timeEnd: getDateTimeFormatForDatePicker(event?.timeEnd)
    };

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

<AccordionItem disabled={!changeAllowed}>

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
        <b>{eventToChange.title} </b>
           <span> - </span>
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

    <span slot="summary" class="author">
        av {event.createdBy}
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
                    placeholder="Overhuset"
                    items={companiesOptions}
                    bind:value={eventToChange.companyId}
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

        <Label label="Beskrivelse">
            <Textarea placeholder="Agenda og informasjon om arrangementet. Husk mellomrom foran og etter linker i teksten" rows="10" name="description" bind:value={eventToChange.description} />
        </Label>
        <Label label="Registrering">
            <Textarea placeholder="Forklar hvordan man melder seg på. Husk mellomrom foran og etter linker i teksten. La stå tom hvis man kan komme uanmeldt" rows="4" name="registration" bind:value={eventToChange.registration} />
        </Label>
        <Label label={`Opprettet av ${event.createdBy} ${getDateFormat(event.createdAt)} kl ${getTimeFormat(event.createdAt)}`}/>

        <div class="buttons-container">
            <Button pill on:click={handleRevert}>Forkast endringer</Button>
            <Button pill on:click={handleDelete}>Slett</Button>
            <Button pill on:click={handleSave}>Lagre</Button>
        </div>

    </span>
</AccordionItem>


<style>
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
    .author {
        color: #A5371B
    }
    .iconLabel {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
    }
</style>
