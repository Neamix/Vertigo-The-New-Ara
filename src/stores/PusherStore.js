import { defineStore } from "pinia";
import axios from 'axios';
import { useAuthStore } from "./AuthStore";
import Pusher from 'pusher-js';
import { useMemberStore } from '@/stores/MembersStore';

export const usePusherStore = defineStore('pusher',{
    getters: {
        getBearerToken() {
            return useAuthStore().bearer_token;
        },
        getUserStatus() {
            return useAuthStore().user.status;
        },
        pusherInstatce() {
            let pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
                authEndpoint: import.meta.env.VITE_BACKEND_BROADCAST_AUTH,
                cluster: 'sa1',
                auth:{
                    headers:{
                        'Authorization': 'Bearer ' + this.getBearerToken,
                    },
                },
                encrypted: true
            });

            return pusher;
        }
    },

    actions: {
        initPusher() {
            // Init Pusher
            let pusher = this.pusherInstatce;
            let AuthStore = useAuthStore();
            let memberStore = useMemberStore();

            // let company_channel = useAuthStore().user.
            let channel_name = 'presence-company.'+AuthStore.user.company_id;
            let channel = pusher.subscribe(channel_name);
            console.log(AuthStore.user.company_id)
            
            if ( AuthStore.user.company_id ) {
                // Add Active Members When User Subscribe To The Channel
                channel.bind('pusher:subscription_succeeded', function(member) {
                    channel.members.each(function (member) {
                        memberStore.activeMembers.push(member.info.user_id)
                    });
                });

                // Add Subscriped Members To The Array Of Active
                channel.bind("pusher:member_added", (member) => {
                    memberStore.activeMembers.push(member.id)
                });

                // Remove Leaved Members From The Array Of Active
                channel.bind("pusher:member_removed", (member) => {
                    let memberIndex = memberStore.activeMembers.findIndex((x) => x == member.id)
                    memberStore.activeMembers.splice(memberIndex,1);
                });

                // Bind Event Status
                channel.bind('status', function(data) {
                    let members = memberStore.members;
                    let user_id = data.user.user_id;

                    // Find Index of User
                    let index = members.findIndex((x) =>  x.id == user_id);
                    
                    // In Case This User Exist In The Array Change Its Status
                    if ( index > -1 ) {
                        members[index].status.id = data.user.status_id;
                    }
                });
            }
        },
        unSubscripeCompanyChannel(company_id) {
            let pusher = this.pusherInstatce;
            pusher.unsubscribe('presence-company.'+company_id)
            pusher.unsubscribe('presence-company-member.'+company_id)
        },
        subscribeCompanyChannel(company_id) {
            let pusher = this.pusherInstatce;
            pusher.subscribe('presence-company.'+company_id);
            pusher.subscribe('presence-company-member.'+company_id);
        },
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