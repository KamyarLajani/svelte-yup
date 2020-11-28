<script>
    import * as yup from 'yup';
    import {Form, Message, isInvalid} from 'svelte-yup';
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
    let submitted = false;
    let isValid;
    function formSubmit(){
        submitted = true;
        isValid = schema.isValidSync(fields);
        if(isValid){
            alert('Everything is validated!');
        }
    }
    $: invalid = (name)=>{
        if(submitted){
            return isInvalid(schema, name, fields);
        }
        return false;
    }
</script>
        
<Form class="form" {schema} {fields} submitHandler={formSubmit} {submitted} color="#b00020">
    <Textfield label="Name" type="text" bind:value={fields.name} invalid={invalid("name")}/>
    <Message name="name"/>
    <Textfield label="Email address" type="email" bind:value={fields.email} invalid={invalid("email")}/>
    <Message name="email"/>
    <Textfield label="Age" type="number" bind:value={fields.age} invalid={invalid("age")}/>
    <Message name="age"/>
    <div class="form-group">
        <p>Gender</p>
        <div class="form-check">
            <div class="radio">
                <label><input type="radio" value="male" bind:group={fields.gender}> Male</label>
            </div>
            <div class="radio">
                <label><input type="radio" value="female" bind:group={fields.gender}> Female</label>
            </div>
            <Message name="gender"/>
        </div>
    </div>
    <Textfield label="Answer 3+3 = " type="number" bind:value={fields.answer} invalid={invalid("answer")}/>
    <Message name="answer"/>
    <Button letiant="raised" class="button">Submit</Button>
</Form>