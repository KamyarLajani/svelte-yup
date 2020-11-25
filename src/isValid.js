export let isValid = (errors)=>{
    let valid = true;
    if(errors){
        if(errors.length > 0){
            valid = false;
        }
    }
    else {
        valid = true;
    }
    return valid;
}