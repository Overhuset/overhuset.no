<script lang="ts">
    export let variant: "primary" | "secondary" | "none";
    export let onClick: () => void | undefined;
    const handleOnClick = () =>  onClick && onClick();
</script>



<div class={`card ${variant} ${onClick !== undefined ? "clickable" : ""}`}>
    {#if !!onClick}
        <button on:click={handleOnClick} class="fullWidth" >
            <slot />
        </button>
    {:else}
        <slot class="fullWidth" />
    {/if}
</div>




<style>
    .card {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 1rem;
        background-color: #fcfcfc;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        width: 100%;
    }
    .primary {
        border-left: 7px solid rgb(115, 66, 13);
    }
    .secondary {
        border-left: 7px solid #ababab;
    }
    .clickable {
        cursor: pointer;
    }
    .clickable:hover {
        background-color: #f6f6f6;
    }
    .fullWidth {
        width: 100%;
    }
</style>
