<script lang="ts">
    import { enhance } from '$app/forms';
    export let form: any;
    export let onChange: (fileName: string) => void;
    export let onLoadingStateChange: (loading: boolean) => void | undefined;

    let fileSelect: string | undefined = undefined;
    let isUploadingCV: boolean = false;

    const getCvShortName = () => {
        if (fileSelect) {
            const split = fileSelect.split("\\");
            return split[split.length-1];
        }
        return null;
    }

    const handleUploadStart = () => {
        isUploadingCV = true;

        if (onLoadingStateChange) {
            onLoadingStateChange(true);
        }
    }

    const handleBrowseClick = () => {
        document.getElementById(`cv`)?.click();
    }

     $: {
         if (form?.uploaded !== undefined) {
             isUploadingCV = false;
             onChange(form?.uploaded);

             if (onLoadingStateChange) {
                 onLoadingStateChange(false);
             }
         }
     }

</script>



<div>
    <form use:enhance action="?/upload" method="POST" enctype="multipart/form-data">
        <label>CV - filen kan være på maks 4.5mb</label>
        <input type="file" bind:value={fileSelect} required name="cv" id="cv" class="cvInput"/>

        <div class="file-upload-container">
            <button class="secondaryButton" on:click={handleBrowseClick} style="min-width: 8rem">Velg en fil</button>
            <div class="file-select-container">
                {#if fileSelect}
                    <span>{getCvShortName()}</span>
                    {#if !form?.uploaded}
                        <button class="primaryButton" style="margin-left: 1rem" on:click={handleUploadStart}>
                            {#if isUploadingCV}laster...{:else}Last opp{/if}
                        </button>
                    {:else}
                        <span> (lastet opp)</span>
                    {/if}
                {/if}
            </div>
        </div>
    </form>
    <br/>
</div>


<style>
    input {
        border: 1px solid #ababab;
        border-radius: 0.3rem;
        padding: 0.2rem 0.4rem;
        margin-bottom: 0.4rem;
    }
    input[type="file"] {
        display:none;
    }
    input[type="text"]{
        width: 70%;
    }
    label {
        margin-top: 0.3rem;
        margin-right: 2rem;
    }
    textarea {
        border: 1px solid #ababab;
        border-radius: 0.3rem;
        width: 100%;
        min-height: 9rem;
        padding: 0.2rem 0.4rem;
    }
    button {
        padding: 0.2rem 0.8rem;
        border-radius: 0.5rem;
    }
    .primaryButton {
        color: white;
        background-color: rgb(115, 66, 13);
    }
    .primaryButton:disabled {
        opacity: 0.4;
    }
    .secondaryButton {
        border: 1px solid silver;
        color: #4d4d4d;
    }
    .file-upload-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
    }
    .file-select-container {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .cvInput {
        background-color: white;
    }
</style>

