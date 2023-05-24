import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('Auth', {
    
    actions: {
        api() {
            return axios({
                url: 'https://jsonplaceholder.typicode.com/todos/1',
            })
        },

        login(payload) {
            return axios({
                url: import.meta.env.VITE_BACKEND_URL,
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                data: {
                    query: `
                        mutation {
                            login (input: {email:"${payload.email}",password:"${payload.password}"}) {
                                status,
                                token,
                            }
                        }
                    `
                }
            })
        }
    }

})