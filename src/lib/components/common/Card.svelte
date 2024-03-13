<script lang="ts">
    export let variant: "primary" | "secondary" | "none";
    export let onClick: () => void;

    const handleOnClick = () =>  onClick();

</script>


<button class={`card ${variant} ${!!onClick && "clickable"}`} on:click={handleOnClick}>
    <slot />
</button>



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
</style>
