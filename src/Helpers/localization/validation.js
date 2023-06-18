// Make The Variables Global
let errorBag = {};
let errorExist = false;
let payload;

function validation(data,rules) {
    let rulesKeys = Object.keys(rules);
    let errors = [];
    payload = data;
    console.log(payload)
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

        if ( ! errorBag.hasOwnProperty(name) ) {
            errorBag[name] = [];
        }   
        console.log(value);
        if ( condition == 'required' && ! value) {
            errorBag[name].push(`${name} is required value`);
            errorExist = true;
        }

        if ( value != null ) {
            if ( condition == 'integer' && typeof value != 'number' ) {
                errorBag[name].push(`${name} must be a number`);
                errorExist = true;
            }
    
            if ( condition.indexOf('min') == 0 ) {
                let split = condition.split(':');

                if ( value.length < split[1] ) {
                    errorBag[name].push( `${name} must be at least ${split[1]} letters`);
                    errorExist = true;
                }
            }

            if ( condition == 'email' && ! value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
                errorBag[name].push(`${name} must be a valid email address`);
                errorExist = true;
            }

            if (condition == 'confirm') {
                if (  payload[name]  !=  payload[`${name}_confirm`]  ) {
                    errorBag[name].push(`${name} and ${name} confirmation doesn't match`);
                    errorExist = true;
                }
            }
        }
    }
    if ( Object.keys(errorBag.length > 0 ))  {
        console.log(errorBag)
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

export default validation;