<script>
    export let errors;
    export let name;
</script>


{#if errors}
    {#if errors.length > 0}
        {#each errors as error}
            {#if error.path === name}
                <p class="invalid">{error.errors[0]}</p>
            {/if}
        {/each}
    {/if}
{/if}


<style>
p.invalid {
    color: red;
    font-size: 14px;
}
</style>
  