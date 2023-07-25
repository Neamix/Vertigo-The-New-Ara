import { defineStore } from 'pinia';
import axios from 'axios';
import { useGlobalStore } from './GlobalStore';

export const useAuthStore = defineStore('Auth', {
    state: () => ({
        bearer_token: null,
        user: {
            name: null,
            email: null,
            avatar: null,
            status: null,
            company_id: null,
            companies: []
        },
        forgetPayload: {
            verification_id: null,
            email: null,
            otp: null,
            password: null
        }
    }),

    getters: {
        authShortName(state) {
            if ( state.user.name.length > 10 ) {
                return state.user.name.substring(0,10) + '...';
            } else {
                return state.user.name;
            }
        },

        authShortEmail(state) {
            if ( state.user.email.length > 20 ) {
                return state.user.email.substring(0,20) + '...';
            } else {
                return state.user.email;
            }
        },

        authGravtarName(state) {
            let spliting_name = state.user.name.split(' ');
            let max_length    = ( spliting_name.length > 1 ) ? 1 : spliting_name.length; 
            let gravatar_name = "";

            for(var i = 0; i <= max_length; i++ ) {
                gravatar_name += spliting_name[i].slice(0,1);
            }

            return gravatar_name;
        }
    },

    actions: {
        // Fetch Auth User 
        async fetchUser () {
            await useAuthStore().me().then((response) => {
                let user = response.data.data.me;
                let globalStore = useGlobalStore();
                
                // Fetch user 
                if ( user ) {
                    this.user.name  = user.name;
                    this.user.email = user.email;
                    this.user.status = user.status.id;
                    this.user.company_id = user.active_company_id;
                    this.user.companies = user.accessable_companies;
                    this.user.is_suspend = user.is_suspend;
                }

                setTimeout(() => {
                    globalStore.mainLoader = false;
                }, 1000);
            });
        },

        // Reset Auth User
        resetUser() {
            useAuthStore().user.name  = null;
            useAuthStore().user.email = null;
        },

        // Api Calls
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
        },

        me() {
            return axios({
                url: import.meta.env.VITE_BACKEND_URL,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.bearer_token}`
                },
                data: {
                    query: `
                        query {
                            me {
                                name,
                                email,
                                status {
                                    id
                                },
                                active_company_id,
                                is_root,
                                is_suspend,
                                accessable_companies {
                                    name,
                                    id
                                }
                            }
                        }
                    `
                }
            })
        },

        forgetPassword(payload) {
            return axios({
                url: import.meta.env.VITE_BACKEND_URL,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    query: `
                        mutation {
                            forgetPassword(input: {email:"${payload.email}"})
                        }
                    `
                }
            })
        },

        VerifyOtp(payload) {
            return axios({
                url: import.meta.env.VITE_BACKEND_URL,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    query: `
                        query {
                            checkOtp (input: {
                                otp: "${payload.otp}",
                                email: "${this.forgetPayload.email}"
                            }) {
                                status
                            }
                        }
                    `
                }
            })
        },

        ResetPassword() {
            return axios({
                url: import.meta.env.VITE_BACKEND_URL,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    query: `
                        mutation {
                            resetPassword(input: {
                                email: "${this.forgetPayload.email}",
                                password: "${this.forgetPayload.password}",
                                otp: "${this.forgetPayload.otp}",
                                verificationID: "${this.forgetPayload.verification_id}"
                            }) {
                                status,
                                token
                            }
                        }
                    `
                }
            })
        }
    }

})