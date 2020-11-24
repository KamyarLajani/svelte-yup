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
import {Message} from 'svelte-yup';
let schema = yup.object().shape({
    name: yup.string().required().max(30).label("Name"),
    email: yup.string().required().email().label("Email address"),
});
let fields = {email: "", name: ""};
let submited = false;
const formSubmit = ()=> {
    submited = true;
    if(schema.isValidSync(fields)){
        alert('Everything is validated!');
    }
}
</script>
<form class="form" on:submit|preventDefault="{formSubmit}">
    <input type="text" placeholder="Name" bind:value={fields.name}>
    <Message schema={schema} fields={fields} name="name" submited={submited}/>
    <input type="text" placeholder="Email address" bind:value={fields.email}>
    <Message schema={schema} fields={fields} name="email" submited={submited}/>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
<style>
.invalid {
    border-color: red !important;
}
</style>
```
### Add isInvalid for making border styles.
Example:

```html
<script>
...
import {Message, isInvalid} from 'svelte-yup';
...
let submited = false;
$: invalid = (field)=>{
    if(submited){
        return isInvalid(schema, fields, field);
    }
    return false;
}
...
</script>

```
```html
<input type="text" class="{invalid('name') ? 'invalid' : ''}" placeholder="Name" bind:value={fields.name}>
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
<AllMessages schema={schema} fields={fields} submited={submited}/>
```

### Components

| name | props |
| ------ | ------ |
| `Message` | `schema`, `fields`, `name` and `submited` |
| `AllMessages` | `schema`, `fields` and `submited` |

### Functions
`isInvalid(schema:object, fields:object, field:string)`

### Examples with source code
 - [ExampleBootstrap1](https://github.com/KamyarLajani/svelte-validoz/blob/main/examples/ExampleBootstrap1.svelte)
 -  [ExampleBootstrap2](https://github.com/KamyarLajani/svelte-validoz/blob/main/examples/ExampleBootstrap2.svelte)
 -  [ExampleBootstrap3](https://github.com/KamyarLajani/svelte-validoz/blob/main/examples/ExampleBootstrap3.svelte)

 - [ExampleSMUI1](https://github.com/KamyarLajani/svelte-validoz/blob/main/examples/ExampleSMUI1.svelte)
  - [ExampleSMUI2](https://github.com/KamyarLajani/svelte-validoz/blob/main/examples/ExampleSMUI2.svelte)
  - [ExampleSMUI3](https://github.com/KamyarLajani/svelte-validoz/blob/main/examples/ExampleSMUI3.svelte)

### Author
Kamyar Lajani

License
----

MIT

