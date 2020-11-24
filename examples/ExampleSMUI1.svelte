<script>
import * as yup from 'yup';
import Message from './Message.svelte';
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
let submited = false;
const formSubmit = ()=> {
    submited = true;
    if(schema.isValidSync(fields)){
        alert('Everything is validated!');
    }
}
</script>
    
<form class="form" on:submit|preventDefault="{formSubmit}">
    <Textfield label="Name" type="text" bind:value={fields.name} />
    <Message schema={schema} fields={fields} name="name" submited={submited}/>
    <Textfield label="email" type="email" bind:value={fields.email}/>
    <Message schema={schema} fields={fields} name="email" submited={submited}/>
    <Textfield label="Age" type="number" bind:value={fields.age}/>
    <Message schema={schema} fields={fields} name="age" submited={submited}/>
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
    <Textfield label="Answer 3+3 = " type="number" bind:value={fields.answer}/>
    <Message schema={schema} fields={fields} name="answer" submited={submited}/>
    <Message schema={schema} fields={fields} name="gender" submited={submited}/>
    <Button letiant="raised" class="button">Sign in</Button>
</form>