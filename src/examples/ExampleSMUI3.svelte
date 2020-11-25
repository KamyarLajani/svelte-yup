<script>
import * as yup from 'yup';
import {validate, isValid, AllMessages} from 'svelte-yup';
import Textfield from '@smui/textfield';
import Button from '@smui/button';
let schema = yup.object().shape({
    name: yup.string().required().max(30).label("Name"),
    email: yup.string().required().email().label("Email address"),
    age: yup.number().required().min(18).label("Age").nullable(true).transform((v, o) => o === '' ? null : v),
    answer: yup.number().required().positive().oneOf([6], "Answer is wrong").label("Answer").nullable(true).transform((v, o) => o === '' ? null : v),
    gender: yup.string().required().label("Gender"),
});
let fields = {email: "", name: "", age:"", gender:"", answer: ""};
let errors;
let submited = false;
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
    <Textfield label="Name" type="text" bind:value={fields.name} />
    <Textfield label="Email address" type="email" bind:value={fields.email}/>
    <Textfield label="Age" type="number" bind:value={fields.age}/>
    <div class="form-group">
        <p>Gender</p>
        <div class="form-check">
            <div class="radio">
                <label><input type="radio" value="male" bind:group={fields.gender}> Male</label>
            </div>
            <div class="radio">
                <label><input type="radio" value="female" bind:group={fields.gender}> Female</label>
            </div>
        </div>
    </div>
    <Textfield label="Answer 3+3 = " type="number" bind:value={fields.answer}/>
    <AllMessages errors={errors} />
    <Button letiant="raised" class="button">Submit</Button>
</form>