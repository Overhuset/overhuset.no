<script lang="ts">
    import {Label} from "flowbite-svelte";

    export let label: string;
</script>

<Label color="black">
    {label}
    <slot/>
</Label>