export let validate = (schema, fields)=>{
    try {
        schema.validateSync(fields, {abortEarly: false});
    }
    catch(error){
        return error.inner;
    }
    return [];
}

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


export let isInvalid = (errors, name)=>{
    let invalid = false;
    if(errors){
        if(errors.length > 0){
            for(let error of errors){
                if(error.path == name){
                    invalid = true;
                }
            }
        }
        else {
            invalid = false;
        }
    }
    else {
        invalid = false;
    }
    return invalid;
}