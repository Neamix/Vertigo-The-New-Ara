import { defineStore } from "pinia";
import axios from "axios";

// Default Axios
export const useRegisterStore = defineStore('registerStore',{
    state: () => ({
        company: {
            name: "Nested Code",
            email: "admin@nestedcode.com",
            country: "United States",
            address: "USA,California",
            seats: 1,
            description: "",
            user: {
                name: "Adam Jerry",
                email: "adam_jerry@gmail.com",
                phone: "01118165546",
                password: "AG616433",
                password_confirm: "AG616433"
            },
            billing: {
                id: null,
                name: null,
                phone: null,
                email: null
            }
        },
        currentRegisterName: "Checkout",
        nextStep: "Checkout",
    }),

    actions: {

        checkIfTheEmailInUse() {
            return axios({
                url: import.meta.env.VITE_BACKEND_URL,
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                data: {
                    query: `
                        query {
                            userWithEmail(email: "${this.company.user.email}") {
                                name
                            }
                        }
                    `
                }
            });
        },

        registerNewCompany() {
            return axios({
                url: import.meta.env.VITE_BACKEND_URL,
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                data: {
                    query: `
                        mutation {
                            registerCompany(input: {
                                name: "${this.company.name}",
                                email: "${this.company.email}",
                                country: "${this.company.country}",
                                address:"${this.company.address}",
                                seats: ${this.company.seats},
                                user: {
                                    name:"${this.company.user.name}",
                                    email:"${this.company.user.email}",
                                    password:"${this.company.user.password}",
                                },
                                billing: {
                                    id: "${this.company.billing.id}",
                                    name: "${this.company.billing.name}",
                                    email: "${this.company.billing.email}",
                                    phone: "${this.company.billing.password}"
                                }
                            }) {
                                company {
                                    name
                                },
                                user {
                                    name,
                                },
                                token,
                                status,
                                message
                            }
                        }
                    `
                }
            })
        }
    }
});

