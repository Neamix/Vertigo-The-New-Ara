// Pinia 
import { defineStore } from "pinia";

// Plugins
import Pusher from 'pusher-js';
import axios from 'axios';

// Stores
import { useAuthStore } from "./AuthStore";
import { useMemberStore } from '@/stores/MembersStore';
import { useStatisticsStore } from "./StatisticsStore";
import { useSessionStore } from "./SessionStore";

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
            let AuthStore = useAuthStore();
            let memberStore = useMemberStore();
            
            // Subscripe Channels
            this.unSubscripeCompanyChannel(AuthStore.user.id);
            this.unSubcripePersonalChannel(AuthStore.user.user_id);

            let channel = this.subscribeCompanyChannel(AuthStore.user.company_id);
            let personal_channel = this.subscripePersonalChannel(AuthStore.user.id);

            if ( AuthStore.user.company_id && ! AuthStore.user.is_suspend ) {
                // Add Active Members When User Subscribe To The Channel
                // Set Number Of Active Member In Dashboard
                channel.bind('pusher:subscription_succeeded', function(member) {
                    useStatisticsStore().memberStatistics.active_members = channel.members.count;
                    channel.members.each(function (member) {
                        if ( memberStore.activeMembers.indexOf(member.info.user_id) == -1 ) 
                            memberStore.activeMembers.push(member);
                    });
                });

                // Add Subscriped Members To The Array Of Active
                channel.bind("pusher:member_added", (member) => {
                    useStatisticsStore().memberStatistics.active_members += 1;
                    if ( memberStore.activeMembers.indexOf(member.info.user_id) == -1 ) 
                        memberStore.activeMembers.push(member);
                });

                // Remove Leaved Members From The Array Of Active
                channel.bind("pusher:member_removed", (member) => {
                    let memberIndex = memberStore.activeMembers.findIndex((x) => x == member.id);
                    memberStore.activeMembers.splice(memberIndex,1);
                    useStatisticsStore().memberStatistics.active_members -= 1;
                });

                // Bind Event Status
                channel.bind('status', function(data) {
                    let members = memberStore.members;
                    let user_id = data.user_id;

                    // Find Index of User
                    let index = members.findIndex((x) =>  x.id == user_id);

                    // In Case This User Exist In The Array Change Its Status
                    if ( index > -1 ) {
                        members[index].status_id = data.status_id;
                    }

                    // In Case This Is Auth
                    if ( useAuthStore().user.id == user_id ) {
                        useAuthStore().user.status = data.status_id;
                        useSessionStore().session = {
                            id: data.session.id,
                            start_date: data.start_date
                        }
                    }

                });

                // Bind Event Status
                channel.bind('member-suspend', function(data) {
                    if ( data.event == 'member-suspend' )
                        useStatisticsStore().memberStatistics.total_suspended_members += 1;
                    else 
                        useStatisticsStore().memberStatistics.total_suspended_members -= 1;
                });

                // Bind Event Session
                channel.bind('session', function(data) {
                    // Increase Session By 1
                    useStatisticsStore().sessions.total_sessions_count += 1;

                    // Add Session total number
                    if ( data.status_id == 1 ) {
                        useStatisticsStore().sessions.active_hours[data['month']] += data.total_session_time;
                        useStatisticsStore().sessions.total_hours[data['month']] += data.total_session_time;
                    }
                    else if ( data.status_id == 2 ) {
                        useStatisticsStore().sessions.idle_hours[data['month']] += data.total_session_time;
                        useStatisticsStore().sessions.total_hours[data['month']] += data.total_session_time;
                    }                     
                    else if ( data.status_id == 3 ) {
                        useStatisticsStore().sessions.meeting_hours[data['month']] += data.total_session_time;
                        useStatisticsStore().sessions.total_hours[data['month']] += data.total_session_time;
                    }

                    
                });

                // Bind Event Members
                channel.bind('new-member', function (data) {
                    useStatisticsStore().memberStatistics.total_members_in_work += 1;
                    useStatisticsStore().memberStatistics.member_report[data['month']] += 1;
                });
            }
        },
        addAvailableMembers(member) {
            let memberStore = useMemberStore();

            if ( memberStore.activeMembers.indexOf(member.user_id) > -1 )
                memberStore.push(member);

        },
        unSubscripeCompanyChannel(company_id) {
            let pusher = this.pusherInstatce;
            pusher.unsubscribe('presence-company.'+company_id)
        },
        subscribeCompanyChannel(company_id) {
            let pusher = this.pusherInstatce;
            return pusher.subscribe('presence-company.'+company_id);
        },
        unSubcripePersonalChannel(user_id) {
            let pusher = this.pusherInstatce;
            pusher.unsubscribe('private.member.'+user_id);
        },
        subscripePersonalChannel(user_id) {
            let pusher = this.pusherInstatce;
            return pusher.subscribe('present.member.'+user_id)
        },
        changeStatus(status_id) {
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
                            switchStatus(status_id: ${status_id}) {
                                id,
                                status_id,
                                start_date
                            }
                        }
                    `
                }
            })
        }
    }
});