<script>
    import {getContext} from 'svelte';
    import {schemaKey, fieldsKey, submittedKey} from './key';
    export let name;
    let schema = getContext(schemaKey);
    let fields = getContext(fieldsKey);
    let submitted = getContext(submittedKey);
    
</script>

{#if $submitted}
    {#await $schema.validateAt(name, $fields) then result}
        <p class="valid"></p>
        {:catch error}
            <p class="invalid">{error.errors[0]}</p>
    {/await}
{/if}

<style>
p.invalid {
    color: red;
    font-size: 14px;
}
p.valid {
    display: inline;
}
</style>
  