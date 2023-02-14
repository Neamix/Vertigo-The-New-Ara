import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuth = defineStore('Auth', {
    
    actions: {
        api() {
            return axios({
                url: 'https://jsonplaceholder.typicode.com/todos/1',
            })
        }
    }

})