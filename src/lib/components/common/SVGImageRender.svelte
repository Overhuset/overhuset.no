<script lang="ts">
    export let svgString: BlobPart | string | undefined;
    export let styleClass: string | undefined;
</script>

{#if svgString} <img src={URL.createObjectURL(new Blob([svgString], { type: "image/svg+xml" }))} class={styleClass} /> {/if}

