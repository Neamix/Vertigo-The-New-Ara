import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./AuthStore";


export const useProjectStore = defineStore('project',{

    actions: {

        listProjects(search) {
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
                            projectSearch(first:40,input: {
                                name: ""
                            }) {
                            paginatorInfo {
                                currentPage,
                                lastPage 
                            },
                            data {
                                name,
                                description,
                                created_date,
                                accessableMembers {
                                    name
                                }
                            }
                        }
                        }
                    `,
                }
            })
        },

        /**
         * Upsert Projects 
         * @param payload 
        */

        upsertProject(payload) {
            console.log(payload.accessable_members)
            return axios({
                url: import.meta.env.VITE_BACKEND_URL,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${useAuthStore().bearer_token}`
                },
                data: {
                    query: `
                        mutation upsertproject($inp: [Inp],$accessable: [AccessableMembers]) {
                            upsertproject(input: {
                            name: "${payload.name}",
                            description: "${payload.description}",
                            inputs: $inp,
                            accessableMembers: $accessable
                            }) {
                            id
                            name
                            inputs {
                                id,
                                label,
                                options {
                                    id,
                                    value,
                                    sort
                                }
                            }
                            }
                        }
                    `,
                    variables: {
                        inp: payload.inputs,
                        accessable: payload.accessable_members,
                    }
                }
            })
        }
    }

});