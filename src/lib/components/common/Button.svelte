<script lang="ts">
    export let variant: "primary" | "secondary" | "none";
    export let disabled: boolean = false;
    export let onClick: (() => void) | undefined;

    const handleOnClick = () =>  { onClick && onClick() }
</script>


<button
    on:click={handleOnClick}
    class={`${variant} ${disabled ? "disabled" : "enabled"}`}
>
    <slot />
</button>


<style>
    button {
        padding: 0.2rem 0.8rem;
        border-radius: 0.5rem;
    }
    .primary {
        color: white;
        background-color: rgb(115, 66, 13);
        border: 1px solid rgb(115, 66, 13);;
    }
    .secondary {
        color: white;
        background-color: rgb(16, 115, 13);
        border: 1px solid rgb(16, 115, 13);
    }
    .none {
        border: 1px solid silver;
    }
    .disabled {
        opacity: 0.5;
    }
    .enabled {
        cursor: pointer;
    }
</style>
