<script>
    import {getContext} from 'svelte';
    import {schemaKey, fieldsKey, submittedKey, colorKey} from './key';
    export let name;
    let schema = getContext(schemaKey);
    let fields = getContext(fieldsKey);
    let submitted = getContext(submittedKey);
    let color = getContext(colorKey);
    
</script>

{#if $submitted}
    {#await $schema.validateAt(name, $fields) then result}
        <slot name="valid">
            <p class="valid"></p>
        </slot>
        {:catch error}
            <slot error={error.errors[0]}>
                <p class="invalid" style="color:{$color}">{error.errors[0]}</p>
            </slot>
    {/await}
{/if}

<style>
p.invalid {
    font-size: 14px;
}
p.valid {
    display: inline;
}
</style>
