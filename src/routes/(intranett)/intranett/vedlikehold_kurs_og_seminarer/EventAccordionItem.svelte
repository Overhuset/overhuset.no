<script lang="ts">
    import {getDateFormat, getTimeFormat} from "$lib/utils/dateUtils";
    import {AccordionItem} from "@skeletonlabs/skeleton";
    import {Button, Input, Textarea, Toggle} from "flowbite-svelte";
    import type {Event} from "$lib/types";
    import Label from "$lib/components/common/Label.svelte";

    export let event: Event;

    let eventToChange = {...event};
    export let onChange: (eventChanged: Event) => void;

    const handleSave = () => {
        console.log("handleSave");
        onChange(eventToChange);
    }

    const handleDelete = () => {
        console.log("handleDelete");
    }

    const handleRevert = () => {
        console.log("handleRevert");
        eventToChange = {...event};
    }

</script>

<AccordionItem>
    <span slot="lead">
        <b>{eventToChange.title}</b>
    </span>

    <span slot="summary">
        {getDateFormat(eventToChange.time)} kl {getTimeFormat(eventToChange.time)} - {eventToChange.location}
    </span>

    <span slot="content">
        <div class="inputs-container">
            <Label label="Tittel*">
                <Input name="title" type="text" bind:value={eventToChange.title} style="min-width: 25rem"/>
            </Label>
            <Label label="Tidspunkt*">
                <Input name="time" type="date" bind:value={eventToChange.time}/>
            </Label>
            <Label label="Tidspunkt slutt">
                <Input name="time" type="date" bind:value={eventToChange.time}/>
            </Label>
            <Label label="Heldags">
                <Toggle checked={false} color="purple"/>
            </Label>
        </div>

        <div class="inputs-container">
            <Label label="Åpent for eksterne">
                <Toggle checked={eventToChange.externalsAllowed} color="purple"/>
            </Label>
            <Label label="Fysisk oppmøte">
                <Toggle checked={eventToChange.physicalAttendance} color="purple"/>
            </Label>
            <Label label="Publisert">
                Publisert
                <Toggle checked={eventToChange.published} color="purple"/>
            </Label>
        </div>

        <Label label="Beskrivelse">
            <Textarea placeholder="Beskrivelse" rows="10" name="description" bind:value={eventToChange.description} />
        </Label>
        <Label label="Registrering">
            <Textarea placeholder="Registrering" rows="4" name="registration" bind:value={eventToChange.registration} />
        </Label>

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
