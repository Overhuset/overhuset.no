<script lang="ts">
    import { enhance } from '$app/forms';
    import {Button, Spinner} from "flowbite-svelte";
    export let form: any;
    export let id: string | undefined;
    export let onChange: (fileName: string) => void;
    export let onLoadingStateChange: (loading: boolean) => void | undefined;

    let fileSelect: string | undefined = undefined;
    let isUploadingCV: boolean = false;
    const fileInputContainerId = "file_input_id_"+id;
    const fileInputFormId = "file_input_form_id_"+id;

    const getCvShortName = () => {
        if (fileSelect) {
            // @ts-ignore
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
        return true;
    }

    const handleBrowseClick = () => {
        const fileInput =  document.getElementById(fileInputContainerId)?.firstChild;
        if (fileInput) {
            // @ts-ignore
            fileInput.click();
        }
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
    <form id={fileInputFormId} on:submit={handleUploadStart} use:enhance action="?/upload" method="POST" enctype="multipart/form-data">
        <label>CV - filen kan være på maks 4.5mb</label>
        <div id={fileInputContainerId}>
            <input
                type="file"
                name="cv"
                id="cv"
                class="cvInput"
                bind:value={fileSelect}
                required
            />
        </div>
        <div class="file-upload-container">
            <Button color="dark" on:click={handleBrowseClick} style="min-width: 8rem">Velg en fil</Button>
            <div class="file-select-container">
                {#if fileSelect}
                    <span>{getCvShortName()}</span>
                    {#if !form?.uploaded}
                        <Button color="purple" style="margin-left: 1rem" type="submit">
                            {#if isUploadingCV}<Spinner size="6" />{:else}Last opp{/if}
                        </Button>
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
    label {
        margin-top: 0.3rem;
        margin-right: 2rem;
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

