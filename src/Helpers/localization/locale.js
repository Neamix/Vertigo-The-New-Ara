import ar from './ar';
import en from './en';

let setLocale = localStorage.getItem('lang') ?? 'ar';

let locale = function (word) {

    if ( setLocale == 'ar' ) 
        return ar[word];
    else 
        return en[word];
}

export default locale;