<script>
import * as yup from 'yup';
import {Message, isInvalid} from 'svelte-yup';
let schema = yup.object().shape({
    name: yup.string().required().max(30).label("Name"),
    email: yup.string().required().email().label("Email address"),
    age: yup.number().required().min(18).label("Age").nullable(true).transform((v, o) => o === '' ? null : v),
    answer: yup.number().required().positive().oneOf([6], "Answer is wrong").label("Answer").nullable(true).transform((v, o) => o === '' ? null : v),
    gender: yup.string().required().label("Gender"),
});
let fields = {email: "", name: "", age:"", gender:"", answer: ""};
let submited = false;
$: invalid = (field)=>{
    if(submited){
        return isInvalid(schema, fields, field);
    }
    return false;
}
const formSubmit = ()=> {
    submited = true;
    if(schema.isValidSync(fields)){
        alert('Everything is validated!');
    }
}
</script>
    
<form class="form" on:submit|preventDefault="{formSubmit}">
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" class="form-control {invalid('name') ? 'invalid' : ''}" bind:value={fields.name}>
        <Message schema={schema} fields={fields} name="name" submited={submited}/>
    </div>
    <div class="form-group">
        <label for="email">Email address</label>
        <input id="email" type="text" class="form-control {invalid('email') ? 'invalid' : ''}" bind:value={fields.email}>
        <Message schema={schema} fields={fields} name="email" submited={submited}/>
    </div>
    <div class="form-group">
        <label for="age">Age</label>
        <input type="text" id="age" class="form-control {invalid('age') ? 'invalid' : ''}" bind:value={fields.age}>
        <Message schema={schema} fields={fields} name="age" submited={submited}/>
    </div>
    <div class="form-group">
        <p>Gender</p>
        <div class="form-check">
            <div class="radio">
                <label><input type="radio" value="male" bind:group={fields.gender}> Male</label>
            </div>
            <div class="radio">
                <label><input type="radio" value="female" bind:group={fields.gender}> Female</label>
            </div>
            <Message schema={schema} fields={fields} name="gender" submited={submited}/>
        </div>
    </div>
    <div class="form-group">
        <label for="answer">Answer 3+3 = </label>
        <input type="text" id="answer" class="form-control {invalid('answer') ? 'invalid' : ''}" bind:value={fields.answer}>
        <Message schema={schema} fields={fields} name="answer" submited={submited}/>
    </div>
        
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
<style>
    .invalid {
        border-color: red !important;
    }
</style>