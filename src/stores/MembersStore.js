import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./AuthStore";

export const useMemberStore = defineStore('members',{
    state: () => ({
       totalPages: 0,
       members : []
    }),

    getters: {

    },

    actions: {
        suspendUser($member_id) {
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    resolve(true);
                },2000);
            });
        },

        inviteMember(email) {
            return axios({
                url: import.meta.env.VITE_BACKEND_URL,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${useAuthStore().bearer_token}`
                },
                data: {
                    query: `
                        mutation {
                            inviteMember(input: {email: "${email}"}) {
                                name,
                                email
                            }
                        }
                    `
                }
            })
        },

        verifyMembers(payload) {
            return axios({
                url: import.meta.env.VITE_BACKEND_URL,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${useAuthStore().bearer_token}`
                },
                data: {
                    query: `
                    mutation {
                        acceptInvitation(input: {
                            name: "${payload.name}",
                            password: "${payload.password}",
                            token: "${payload.token}",
                            email: "${payload.email}"
                        }) {
                           token
                        }
                    }
                    `
                }
            })
        },

        getMembers(payload) {
            return axios({
                url: import.meta.env.VITE_BACKEND_URL,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${useAuthStore().bearer_token}`
                },
                data: {
                    query: `
                        query {
                            users(input: {
                                name: "${payload.name}",
                            },first: 2) {
                            paginatorInfo {
                                currentPage,
                                lastPage
                            }
                            data {
                                id,
                                name,
                                email,
                                status {
                                    id
                                }
                            }
                        }
                        }
                    `
                }
                
            });
        },

    }
});