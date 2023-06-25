import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./AuthStore";
import { useGlobalStore } from "./GlobalStore";

export const useMemberStore = defineStore('members',{
    state: () => ({
       totalPages: 0,
       members : [],
       activeMembers: []
    }),

    getters: {
       
    },

    actions: {
        // Attributes Functions

        /*** Get Short String */
        shortName(name,length = 10) {
            if ( name.length > length ) {
                return name.substring(0,length) + '...';
            } else {
                return name;
            }
        },

        /*** Avatar Name */
        gravatarName(name) {
            let spliting_name = name.split(' ');
            let max_length    = ( spliting_name.length > 1 ) ? 1 : spliting_name.length; 
            let gravatar_name = "";

            for(var i = 0; i <= max_length; i++ ) {
                gravatar_name += spliting_name[i].slice(0,1);
            }

            return gravatar_name;
        },
        
        // Axios Functions
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
                            },  first: 30) {
                                paginatorInfo {
                                    currentPage,
                                    lastPage
                                }
                                data {
                                    id,
                                    name,
                                    email,
                                    is_suspend
                                }
                            }
                        }
                    `
                }
                
            });
        },

        switchCompany(company_id) {
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
                            switchCompany(companyid:${company_id}) {
                                status,
                                message
                            }
                        }
                    `
                }
            });
        },

        toggleSuspend() {
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
                            toggleUserSuspended(userid: 1) {
                                status,
                                message
                            }
                        }
                    `
                }
            });
        }

    }
});