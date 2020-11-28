<script>
import { setContext } from 'svelte';
import {schemaKey, fieldsKey, submittedKey} from './key';
import {writable} from 'svelte/store';
export let submitHandler;
export let schema;
export let fields;
export let submitted;
let formSchema = writable(schema);
let formFields = writable(fields);
let formSubmitted = writable(submitted);
setContext(schemaKey, formSchema);
setContext(fieldsKey, formFields);
setContext(submittedKey, formSubmitted);
$: $formFields = fields;
$: $formSchema = schema;
$: $formSubmitted = submitted;
</script>

<form on:submit|preventDefault = {submitHandler} {...$$props}>
<slot></slot>
</form>