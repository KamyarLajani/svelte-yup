<script>
    export let schema;
    export let fields;
    export let name;
    export let submited;
</script>

{#await schema.validateAt(name, fields) then result}
<p></p>
{:catch error}
    {#if submited}
        <p class="invalid">{error.errors[0]}</p>
    {/if}
{/await}
  
<style>
p.invalid {
    color: red;
}
</style>
  