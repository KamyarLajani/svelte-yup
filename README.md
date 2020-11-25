# svelte-yup

Svelte component library for [Yup](https://www.npmjs.com/package/yup) for form validation.

### Installation

```sh
$ npm i --save-dev svelte-yup
```
```sh
$ npm i yup
```
![GIF demo](https://raw.githubusercontent.com/KamyarLajani/svelte-yup/master/demo1.gif)

## See all [demos](https://svelte-yup.netlify.app/)


### Sample code

```html
<script>
import * as yup from 'yup';
import {Message, validate, isValid} from 'svelte-yup';


let schema = yup.object().shape({
    name: yup.string().required().max(30).label("Name"),
    email: yup.string().required().email().label("Email address"),
});
let fields = {email: "", name: ""};
let errors;
let submited = false;
$: invalid = (name)=>{
    if(submited){
        return isInvalid(errors, name);
    }
    return false;
}
$: if(submited){
    errors = validate(schema, fields);
}
const formSubmit = ()=> {
    submited = true;
    errors = validate(schema, fields);
    if(isValid(errors)){
        alert('Everything is validated!');
    }
}
</script> 
<form class="form" on:submit|preventDefault="{formSubmit}">
    <input type="text" class="{invalid("Name") ? 'invalid' : ''}" placeholder="Name" bind:value={fields.name}>
    <Message errors={errors} name="Name" />
    <input type="text" class="{invalid("Email address") ? 'invalid' : ''}" placeholder="Email address" bind:value={fields.email}>
    <Message errors={errors} name="Email address" />
    <button type="submit">Submit</button>
</form>

```
### Add isInvalid for making border styles.
Example:

```html
<script>
...
import {Message, isInvalid} from 'svelte-yup';
...
let submited = false;
$: invalid = (name)=>{
    if(submited){
        return isInvalid(errors, name);
    }
    return false;
}
...
</script>

```


```html
<input type="text" class="{invalid("Name") ? 'invalid' : ''}" placeholder="Name" bind:value={fields.name}>
<style>
.invalid {
    border-color: red !important;
}
</style>
```
### All messages in one place
Example below to put all messages in one place by `AllMessages` component.
```js
import {AllMessages} from 'svelte-yup';
```
```html
<AllMessages errors={errors} />
```

### Components

| name | props |
| ------ | ------ |
| `Message` | `errors` and `name` |
| `AllMessages` | `errors` |

### Functions

`validate(schema:Object, fields:Object)` 

`isValid(errors:Array)` 

`isInvalid(errors:Array, name:String)` 

### Example disable button until everything validated

```js
let btnDisabled = false;
$: if(submited){
    errors = validate(schema, fields);
    if(isValid(errors)){
        btnDisabled = false;
    }
    else {
        btnDisabled = true;
    }
}
```

```html
<button type="submit" disabled={btnDisabled}>Submit</button>
```
### Examples with source code
 - [ExampleBootstrap1](https://github.com/KamyarLajani/svelte-yup/blob/master/src/examples/ExampleBootstrap1.svelte)
 -  [ExampleBootstrap2](https://github.com/KamyarLajani/svelte-yup/blob/master/src/examples/ExampleBootstrap2.svelte)
 -  [ExampleBootstrap3](https://github.com/KamyarLajani/svelte-yup/blob/master/src/examples/ExampleBootstrap3.svelte)

 - [ExampleSMUI1](https://github.com/KamyarLajani/svelte-yup/blob/master/src/examples/ExampleSMUI1.svelte)
  - [ExampleSMUI2](https://github.com/KamyarLajani/svelte-yup/blob/master/src/examples/ExampleSMUI2.svelte)
  - [ExampleSMUI3](https://github.com/KamyarLajani/svelte-yup/blob/master/src/examples/ExampleSMUI3.svelte)

### Author
Kamyar Lajani

License
----

MIT

