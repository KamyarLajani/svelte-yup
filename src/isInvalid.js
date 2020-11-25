
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