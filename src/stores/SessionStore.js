import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./AuthStore";
export const useSessionStore = defineStore('sessions',{
    state: () => ({
        session: {
            id: null,
            start_date: null
        }
    }),
    
    actions: {

        /**
         * Open new session for auth user
         * @export promise
        */

        openSession() { 
            return axios({
                url: import.meta.env.VITE_BACKEND_URL,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${useAuthStore().bearer_token}`
                },
                data: {
                    query: `
                        mutation {
                            opensession {
                                id,
                                start_date,
                                status {
                                    id
                                }
                            }
                        }
                    `
                }
            });
        },

        /**
         * Close  session for auth user
         * @export promise
        */

         closeSession() { 
            return axios({
                url: import.meta.env.VITE_BACKEND_URL,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${useAuthStore().bearer_token}`
                },
                data: {
                    query: `
                        mutation {
                            closesession {
                                id,
                                end_date
                            }
                        }
                    `
                }
            });
        }
    }
})