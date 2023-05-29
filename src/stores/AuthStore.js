import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('Auth', {
    state: () => ({
        bearer_token: null,
        user: {
            name: null,
            email: null
        },
        forgetPayload: {
            verification_id: null,
            email: null,
            otp: null,
            password: null
        }
    }),

    actions: {
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
            console.log(this.forgetPayload.verification_id);
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