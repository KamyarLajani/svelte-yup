<script>
    import * as yup from 'yup';
    import {Form, Message, isInvalid} from 'svelte-yup';
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
    
<Form class="form" {schema} {fields} submitHandler={formSubmit} {submitted}>
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" class="form-control" class:invalid={invalid("name")} bind:value={fields.name}>
        <Message name="name" />
    </div>
    <div class="form-group">
        <label for="email">Email address</label>
        <input id="email" type="text" class="form-control" class:invalid={invalid("email")} bind:value={fields.email}>
        <Message name="email" />
    </div>
    <div class="form-group">
        <label for="age">Age</label>
        <input type="text" id="age" class="form-control" class:invalid={invalid("age")} bind:value={fields.age}>
        <Message name="age" />
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
        </div>
        <Message name="gender" />
    </div>
    <div class="form-group">
        <label for="answer">Answer 3+3 = </label>
        <input type="text" id="answer" class="form-control" class:invalid={invalid("answer")} bind:value={fields.answer}>
        <Message name="answer" />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</Form>
<style>
    .invalid {
        border-color: red !important;
    }
</style>