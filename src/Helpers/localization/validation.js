let errorBag = {};

function validation(payload,rules) {
    let rulesKeys = Object.keys(rules);
    let errors = [];

    for (var i = 0; i < rulesKeys.length; i++) {
        let ruleArray = rules[rulesKeys[i]];
        isValidValue(ruleArray,payload[rulesKeys[i]],rulesKeys[i]);
    }

    return errorBag;
}

function isValidValue(conditions,value,name) {

    for (var x = 0; x < conditions.length; x++) {
        let condition = conditions[x];

        if ( ! errorBag.hasOwnProperty(name) ) {
            errorBag[name] = [];
        }   

        if ( condition == 'required' && value == null) {
            errorBag[name].push(`${name} is required value`);
        }
        
        if ( condition == 'integer' && typeof value != 'number' ) {
            errorBag[name].push(`${name} must be a number`);
        }

        if ( value != null ) {
            if ( condition.indexOf('min') == 0 ) {
                let split = condition.split(':');
                console.log(split);
                if ( value.length < split[1] ) {
                    errorBag[name].push( `${name} must be at least ${split[1]} letters`);
                }
            }
        }

        return errorBag;
    }
} 

export default validation;