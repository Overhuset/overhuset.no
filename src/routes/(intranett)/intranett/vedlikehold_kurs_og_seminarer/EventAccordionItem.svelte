<script lang="ts">
    import {getDateFormat, getDateFormatDatePicker, getTimeFormat} from "$lib/utils/dateUtils";
    import {AccordionItem} from "@skeletonlabs/skeleton";
    import {Button, Input, Textarea, Toggle, Select} from "flowbite-svelte";
    import type {Company, Event} from "$lib/types";
    import Label from "$lib/components/common/Label.svelte";

    export let event: Event;
    export let companies: Company[];

    const companiesOptions: {value?: string, name: string}[] = companies.map(company => ({ value: company.id || "", name: company.nameShort || ""}));

    let eventToChange: Event = {
        ...event,
        time: getDateFormatDatePicker(event?.time),
        timeEnd: getDateFormatDatePicker(event?.timeEnd)
    };

    export let onChange: (eventChanged: Event) => void;
    export let onDelete: (id: string) => void;

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
    }

</script>

<AccordionItem>
    <span slot="lead">
        <b>{eventToChange.title} </b>
        {#if eventToChange.time}
            <span> - {getDateFormat(eventToChange.time)} kl {getTimeFormat(eventToChange.time)} ({eventToChange.location})</span>
            {#if eventToChange.timeEnd}
                <span> - {getDateFormat(event.timeEnd)} </span> {#if !event?.fullDay} <span> kl {getTimeFormat(event.timeEnd)}</span> {/if}
            {/if}
        {/if}
    </span>

    <span slot="summary"/>

    <span slot="content">
        <div class="inputs-container">
            <Label label="Tittel">
                <Input
                    name="title"
                    type="text"
                    placeholder="Tittel på arrangement"
                    bind:value={eventToChange.title}
                    style="min-width: 25rem"
                />
            </Label>
            <Label label="Sted">
                <Input
                    name="title"
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
                    type={eventToChange.fullDay ? "date" : "datetime-local" }
                    bind:value={eventToChange.time}
                    style="min-width: 12rem"
                />
            </Label>
            <Label label="Tidspunkt slutt">
                <Input
                   type={eventToChange.fullDay ? "date" : "datetime-local" }
                   bind:value={eventToChange.timeEnd}
                   style="min-width: 12rem"
                />
            </Label>
            <Label label="Skjul klokkeslett">
                <Toggle
                        checked={eventToChange.fullDay}
                        on:change={() => eventToChange.fullDay = !eventToChange.fullDay}
                        color="purple"
                />
            </Label>
                    <Label label="Åpent for eksterne">
                <Toggle
                        checked={eventToChange.externalsAllowed}
                        on:change={() => eventToChange.externalsAllowed = !eventToChange.externalsAllowed}
                        color="purple"
                />
            </Label>
            <Label label="Fysisk oppmøte">
                <Toggle
                        checked={eventToChange.physicalAttendance}
                        on:change={() => eventToChange.physicalAttendance = !eventToChange.physicalAttendance}
                        color="purple"
                />
            </Label>
                 <Label label="Online-kurs">
                <Toggle
                        checked={eventToChange.onlineCourse}
                        on:change={() => eventToChange.onlineCourse = !eventToChange.onlineCourse}
                        color="purple"
                />
            </Label>
            <Label label="Publisert">
                <Toggle
                        checked={eventToChange.published}
                        on:change={() => eventToChange.published = !eventToChange.published}
                        color="purple"
                />
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
</style>
