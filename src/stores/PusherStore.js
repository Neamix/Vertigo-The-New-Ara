import { defineStore } from "pinia";
import axios from 'axios';
import { useAuthStore } from "./AuthStore";

export const usePusherStore = defineStore('pusher',{
    getters: {
        getBearerToken() {
            return useAuthStore().bearer_token;
        },
        getUserStatus() {
            return useAuthStore().user.status;
        },
    },

    actions: {
        changeStatus() {
            return axios({
                url: import.meta.env.VITE_BACKEND_URL,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.getBearerToken}`
                },
                data: {
                    query: `
                        mutation {
                            changeStatus(status_id: ${this.getUserStatus}) {
                                name,
                                email,
                                status {
                                    name
                                }
                            }
                        }
                    `
                }
            })
        }
    }
});