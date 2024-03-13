<script lang="ts">
    export let text: string | undefined;
    export let linkTitle: string | undefined;
    export let emailTitle: string | undefined;

</script>

<span>
    {#if text}
        {#each (text?.split(" ") || []) as possibleLink}
            {#if possibleLink.includes("https")}
                <a href={possibleLink} target="_blank">
                    {linkTitle || possibleLink}
                </a>
            {:else if possibleLink.includes("@")}
                <a href={"mailto:" + possibleLink}>
                   {emailTitle || possibleLink}
                </a>
            {:else}
                {`${possibleLink} `}
            {/if}
        {/each}
    {/if}
</span>




<style>
    a {
        color: rgb(115, 66, 13);
        font-weight: bold;
    }
</style>
