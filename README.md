# svelte-yup
![npm](https://img.shields.io/npm/v/svelte-yup) ![NPM](https://img.shields.io/npm/l/svelte-yup) ![GitHub top language](https://img.shields.io/github/languages/top/KamyarLajani/SVELTE-YUP) ![npm](https://img.shields.io/npm/dm/svelte-yup)


Svelte component library using [Yup](https://www.npmjs.com/package/yup) for form validation.

### Installation

```sh
$ npm i svelte-yup --save-dev
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
    import {Form, Message} from 'svelte-yup';
    let schema = yup.object().shape({
        name: yup.string().required().max(30).label("Name"),
        email: yup.string().required().email().label("Email address"),
    });
    let fields = {email: "", name: ""};
    let submitted = false;
    let isValid;
    function formSubmit(){
        submitted = true;
        isValid = schema.isValidSync(fields);
        if(isValid){
            alert('Everything is validated!');
        }
    }
</script>

<Form class="form" {schema} {fields} submitHandler={formSubmit} {submitted}>
    <input type="text" bind:value={fields.name} placeholder="Name">
    <Message name="name" />
    <input type="text" bind:value={fields.email} placeholder="Email address">
    <Message name="email" />
    <button type="submit">Submit</button>
</Form>


```
### Add isInvalid for making input border style.
Example:

```html
<script>
...
import {Message, isInvalid} from 'svelte-yup';
...
$: invalid = (name)=>{
    if(submitted){
        return isInvalid(schema, name, fields);
    }
    return false;
}
...
</script>

```

```html
<input type="text" class:invalid={invalid("name")} bind:value={fields.name} placeholder="Name">
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
<AllMessages />
```
### Custom Message color
```html
<Form ... color="#b00020">
```
### Components

| name | props | description |
| ------ | ------ | ------------- |
| `Form` | `schema`, `fields`, `submitHandler`, `submitted` and `color` |  |
| `Message` | `name` | Error message of a field name by `name` prop. name should be the schema field name (no label name)
| `AllMessages` |  | Puts all field messages in one place |

### Functions

`isInvalid(schema:Object, name:String, fields:Object)` 

### Example disable button until everything is validated

```js
...
let btnDisabled = false;
$: if(submitted){
    btnDisabled = true;
    isValid = schema.isValidSync(fields);
    if(isValid){
        btnDisabled = false;
    }
}
...
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

