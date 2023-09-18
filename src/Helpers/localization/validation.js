// Make The Variables Global
let errorBag = {};
let errorExist = false;
let payload;
let custom_messages;

function validation(data,rules,messages) {
    let rulesKeys = Object.keys(rules);
    let errors = [];
    payload = data;
    custom_messages = messages;

    // Reset the bag and condition
    errorBag = {};
    errorExist = false;
    
    // Remove Old Errors
    removeOldErrors();

    // Start Tracking Errors
    for (var i = 0; i < rulesKeys.length; i++) {
        let conditions = rules[rulesKeys[i]];
        isValidValue(conditions,payload[rulesKeys[i]],rulesKeys[i]);
    }

    return {
        'errorBag' : errorBag,
        'errorsExist': errorExist
    };
}

function isValidValue(conditions,value,name) {    
    for (var x = 0; x < conditions.length; x++) {
        let condition = conditions[x];
        let error_default;

        if ( ! errorBag.hasOwnProperty(name) ) {
            errorBag[name] = [];
        }   

        if ( condition == 'required' && ! value) {
            error_default = `${name} is required value`;
            errorExist = true;
        }

        if ( value != null ) {
            if ( condition == 'integer' && typeof value != 'number' ) {
                error_default = `${name} must be a number`;
                errorExist = true;
            }
            
            if ( condition.indexOf('min') == 0 ) {
                let split = condition.split(':');

                if ( value.length < split[1] ) {
                    error_default = `${name} must be at least ${split[1]} letters`;
                    errorExist = true;
                }
            }

            if ( condition == 'email' && ! value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
                error_default = `${name} must be a valid email address`;
                errorExist = true;
            }

            if (condition == 'confirm') {
                if (  payload[name]  !=  payload[`${name}_confirm`]  ) {
                    error_default = `${name} and ${name} confirmation doesn't match`;
                    errorExist = true;
                }
            }
        }

        if ( error_default   )
            errorBag[name].push(errorPhares(name,condition) ?? error_default);
    }

    if ( Object.keys(errorBag.length > 0 ))  {
        displayErrors(errorBag);
    }
} 


function removeOldErrors() 
{
    let errors_holder = document.querySelectorAll('.error');
    
    errors_holder.forEach((holder) => {
        holder.innerHTML = '';
    });
}

function displayErrors(errors) {
    let keys = Object.keys(errors);

    for ( var i = 0; i < keys.length; i++ ) {
        document.querySelector(`.error_${keys[i]}`).innerHTML = '';
        document.querySelector(`.error_${keys[i]}`).innerHTML = errors[keys[i]].join("<br>");
    }
}

function errorPhares(name,condition) {
   let rule = condition.split(':')[0];
   return (custom_messages[name+'.'+rule]) ? custom_messages[name+'.'+rule]  : null;
}

export default validation;