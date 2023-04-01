import axios from "axios";
import { defineStore } from "pinia";

export const useMemberStore = defineStore('members',{
    state: () => ({
       
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

        getMembers() {
            return axios.get('https://jsonplaceholder.typicode.com/users')
        },

    }
});