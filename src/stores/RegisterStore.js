import { defineStore } from "pinia";
import axios from "axios";

// Default Axios
export const useRegisterStore = defineStore('registerStore',{
    state: () => ({
        company: {
            name: "Vertigo",
            email: "admin@vertigo.com",
            country: "United States",
            address: "USA, California",
            seats: 1,
            description: "No Descriotion",
            user: {
                name: "Abdalrhman Hussin",
                email: "abdalrhmanhussin44@gmail.com",
                phone: "01118165546",
            }
        },
        currentRegisterName: "PersonalInfo",
        nextStep: "PersonalInfo",
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
                                address: "${this.company.address}",
                                seats: ${this.company.seats},
                                user: {
                                    name: "${this.company.name}",
                                    email: "${this.company.email}",
                                    password: "${this.company.password}",
                                }
                            }) {
                                name
                            }
                        }
                    `
                }
            })
        }
    }
});

