<script>
import * as yup from 'yup';
import {validate, isValid, isInvalid, Message} from 'svelte-yup';
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
$: invalid = (name)=>{
    if(submited){
        return isInvalid(errors, name);
    }
    return false;
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
    <Textfield label="Name" invalid={invalid("Name") ? true : false} type="text" bind:value={fields.name} />
    <Message errors={errors} name="Name"/>
    <Textfield label="Email address" invalid={invalid("Email address") ? true : false} type="email" bind:value={fields.email}/>
    <Message errors={errors} name="Email address"/>
    <Textfield label="Age" invalid={invalid("Age") ? true : false} type="number" bind:value={fields.age}/>
    <Message errors={errors} name="Age"/>
    <div class="form-group">
        <p>Gender</p>
        <div class="form-check">
            <div class="radio">
                <label><input type="radio" value="male" bind:group={fields.gender}> Male</label>
            </div>
            <div class="radio">
                <label><input type="radio" value="female" bind:group={fields.gender}> Female</label>
            </div>
            <Message errors={errors} name="Gender"/>
        </div>
    </div>
    <Textfield label="Answer 3+3 = " invalid={invalid("Answer") ? true : false} type="number" bind:value={fields.answer}/>
    <Message errors={errors} name="Answer"/>
    <Button letiant="raised" class="button">Submit</Button>
</form>