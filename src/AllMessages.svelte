<script>
export let errors;
</script>
  
{#if errors}
  {#if errors.length > 0}
      {#each errors as error}
            <p class="invalid">{error.errors[0]}</p>
      {/each}
  {/if}
{/if}
  
<style>
  p.invalid {
      color: red;
      margin: 0px;
      font-size: 14px;
  }
</style>
  