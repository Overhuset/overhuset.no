<script lang="ts">
    import { Badge, P } from 'flowbite-svelte';
    import type { Constellation } from '$lib/types';

    export let constellation: Constellation | undefined | null;
</script>

<div class="header">
    <P size="xl" color="" weight="medium">
        {constellation?.name}
    </P>

    {#if constellation?.active}
        <Badge color="green" rounded style="padding: 0.4rem 0.5rem;">
           Aktiv
        </Badge>
    {:else}
        <Badge color="dark" rounded style="padding: 0.4rem 0.5rem;">
            Ikke aktiv
        </Badge>
    {/if}
</div>



<style>
    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        flex-wrap: no-wrap;
        margin-top: -1.5rem;
        height: 4.5rem;
    }
</style>