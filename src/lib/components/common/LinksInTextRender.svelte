<script lang="ts">
    export let text: string | undefined;
    export let linkTitle: string | undefined;
    export let emailTitle: string | undefined;

    const getLinkTitle = (possibleLink: string, fallbackTitle?: string) => {
        console.log("possibleLink: ", possibleLink);
        console.log("fallbackTitle: ", fallbackTitle);

        if (possibleLink.includes("|")) {
            const title = possibleLink.split("|")[1];
            console.log("title: ", title);

            console.log("*: ",title );
            if (title.length > 0) {

                return title;
            }

            if (fallbackTitle) {

                console.log("**: ",fallbackTitle );

                return fallbackTitle;
            }

            return possibleLink;
        }
    }

    console.log(text?.split(" "));
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

            {:else if possibleLink === "[break]"}
                {@html  "<br/><br/>"  + possibleLink.replace("[break]", "")}

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
