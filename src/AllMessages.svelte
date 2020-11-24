<script>
    export let schema;
    export let fields;
    export let submited;
  </script>
  
  
{#await schema.validate(fields, {abortEarly: false}) then result}
    <p></p>
    {:catch error}
        {#each error.inner as inner, i}
            {#if submited}
                <p class="invalid">{error.errors[i]}</p>
            {/if}
        {/each}

{/await}
  
<style>
  p.invalid {
      color: red;
      margin: 0px;
  }
</style>
  