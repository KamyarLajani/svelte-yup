export let isValid = (schema, fields)=>{
    let bool = schema.isValidSync(fields);
    return bool;
}

export let isInvalid = (schema, name, fields)=>{
    let bool = false;
    try {
        schema.validateSyncAt(name, fields);
    }
    catch(error){
        bool = true;
    }
    return bool;
}
