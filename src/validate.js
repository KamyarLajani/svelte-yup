export let validate = (schema, fields)=>{
    try {
        schema.validateSync(fields, {abortEarly: false});
    }
    catch(error){
        return error.inner;
    }
    return [];
}