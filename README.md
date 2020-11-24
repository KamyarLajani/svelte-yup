# svelte-validoz

svelte-validoz is [Validoz](https://www.npmjs.com/package/validoz) for Svelte for `form validation`.

### Installation

```sh
$ npm install svelte-validoz
```

![GIF demo](https://raw.githubusercontent.com/KamyarLajani/svelte-validoz/main/demo1.gif)


### Sample code

```html
<script>
import {validoz, isValid, Message} from 'svelte-validoz';
import {fields} from './form.js';
let result;
let submited = false;
$: if(submited){
    result = validoz(fields);
}
let formSubmit = () =>{
    submited = true;
    result = validoz(fields);
    // if everything validated
    if(isValid(result)){
        alert('Everything is validated!');
    }
}
</script>
```
```html
<form on:submit|preventDefault="{formSubmit}">
    <h4>Form</h4>
    <input type="text" placeholder="Enter email" bind:value="{fields[0].value}"><br>
    <Message result={result} name="Email address"/>
    <input type="number" placeholder="Age" bind:value="{fields[1].value}"><br>
    <Message result={result} name="Age"/>
    <button type="submit">Submit</button>
</form>
```
```js
// form.js file
export let fields = [
    {
        name: "Email address",
        type: "email",
        value: '',
        // you can pass your custom properties
    },
    {
        name: "Age",
        type: "number",
        value: 12,
        min: 18
    },
];
```
Remove those lines below if you want to revalidate only after submits.

```js
let submited = false;
$: if(submited){
    result = validoz(fields);
}
```
#### All messages in one place
Example below to put all messages in one place by `AllMessages` component
```html
<script>
import {validoz, isValid, AllMessages} from 'svelte-validoz';
import {fields} from './form.js';
let result;
let submited = false;
$: if(submited){
    result = validoz(fields);
}
let formSubmit = () =>{
    submited = true;
    result = validoz(fields);
    // if everything validated
    if(isValid(result)){
        alert('Everything is validated!');
    }
}
</script>
```
```html
<form on:submit|preventDefault="{formSubmit}">
    <h4>Form</h4>
    <input type="text" placeholder="Enter email" bind:value="{fields[0].value}"><br>
    <input type="number" placeholder="Age" bind:value="{fields[1].value}"><br>
    <AllMessages result={result}/> // add it once
    <button type="submit">Submit</button>
</form>
```

### Date example
```js
import {validoz, isValid, isValidByName} from 'validoz';
let field = [
{
    name: "Date",
    type: "date",
    value: '24/05/2020',
    dateFormat: 'dd/mm/yyyy',
    startDate: '08/02/2020',
    endDate: '24/05/2020',
}
];

let result = validoz(field);
console.log(result); // { field: 'Date', message: '' }
isValid(result); // true
isValidByName(result, 'Date'); // true
```

### Types

| name | Description |
| ------ | ------ |
| `text` | Any characters |
| `password` | String must contain at least one numberic, one upper case, one lower case characters and the length at least 6 characters |
| `fullname` | String should contain at least 2 words with 3 characters for each of the words and separated by space. It can contain more than one word.|
| `username` | Like Instagram username. |
| `word` | Alphabet characters. |
| `number` | An integer number |
| `date` | Example `21/03/2020` string. |
| `time` | Example `05:12` string. |

### Field properties

| name | Description |
| ------------- | ------ |
| `name` | Field name |
| `value` | Field value |
| `type` | Field type |
| `required` | `Boolean`. default: `true` |
| `min` and `max` | Minumum and Maximum of type number. Each of them can be passed alone. |
| `minDigits` and `maxDigits` | Minumum and Maximum digits of type number. Each of them can be passed alone. |
| `minLength` and `maxLength` | Minimum and Maximum length of the string types. |
| `dateFormat` | String values of `mm/dd/yyyy`, `mm-dd-yyyy`, `dd/mm/yyyy`, `dd-mm-yyyy`, `yyyy/mm/dd` and `yyyy-mm-dd` |
| `equal` | A field value and equal value to be equal. |
| `notEqual` | A field value and equal value not to be equal. |


### Other example

```js
let {validoz, isValid, isValidByName} = require('validoz');

let {field} = require('./form.js');
let result = validoz(field);
console.log(result); 
/*
Returns: 
[
  { field: 'Full name', message: '' },
  { field: 'Email address', message: 'Email address is invalid' },
  { field: 'Age', message: 'Age must be between 18 and 60' },
  { field: 'Best friend', message: 'Best friend value is wrong' },
  {
    field: 'Password',
    message: 'Password must contain at least one numberic, one upper case, one lower case characters and the length at least 6 characters'
  }
]
*/
isValid(result); // false
isValid(result); // false
isValid(result[0]); // "Full name", true
isValidByName(result, 'Full name'); // true
isValidByName(result, 'Email address'); // false
isValidByName(result, 'Password'); // false
```


```js
// form.js file
export let field = [
    {
        name: "Full name",
        type: "text",
        value: 'Hello world',
        minLength: 6
    },
    {
        name: "Email address",
        type: "email",
        value: 'example@.com'
    },
    {
        name: "Age",
        type: "number",
        value: 12,
        min: 18,
        max: 60,
    },
    {
        name: "Best friend",
        type: "text",
        value: 'Doe',
        equal: 'John' // value must be John
    },
    {
        name: "Password",
        type: "password", // you can also pass text if you don't want regex pattern to be conditioned
        value: '123456',
        minLength: 6,
        maxLength: 30,
    }
];
```

### Other Examples with source code
 - [Example1](https://github.com/KamyarLajani/svelte-validoz/blob/main/src/Example1.svelte)
 - [Example2](https://github.com/KamyarLajani/svelte-validoz/blob/main/src/Example2.svelte)
 - [Integerating with Svelte Material UI (SMUI)](https://github.com/KamyarLajani/svelte-validoz/blob/main/src/ExampleSMUI.svelte)

### Author
Kamyar Lajani

License
----

MIT

