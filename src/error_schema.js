import axios from 'axios';
import router from "./routes/index.js";

let error_schema = () => {
    axios.interceptors.response.use(
        response => response,
        error => {        
            if ( error.code == "ERR_NETWORK") {
                router.push({
                    name: "server-error"
                })
            } else if ( error.code == "ERR_BAD_REQUEST" ) {
                router.replace({
                    name: "forbidden"
                })
            }
        }
    );
}

export default error_schema;