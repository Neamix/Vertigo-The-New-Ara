import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./AuthStore";

export const useStatisticsStore = defineStore('statistics',{
    state: () => ({
        sessions: {
            total_hours: [],
            active_hours: [],
            idle_hours: [],
            meeting_hours: [],
        },

        memberStatistics: {
            total_members_in_work: 0,
            total_suspended_members: 0,
            member_report: [],
            active_members: 0,
            suspended_members: 0
        },
    }),
    actions: {
        getMemberSessions() {
            // Send Request To Server
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
                        sessionStatistics {
                            total_hours {
                                Jan,
                                Feb,
                                Mar,
                                Apr,
                                May,
                                Jun,
                                Jul,
                                Aug,
                                Sep,
                                Oct,
                                Nov,
                                Dec
                            },
                            active_hours {
                                Jan,
                                Feb,
                                Mar,
                                Apr,
                                May,
                                Jun,
                                Jul,
                                Aug,
                                Sep,
                                Oct,
                                Nov,
                                Dec
                            },
                            idle_hours {
                                Jan,
                                Feb,
                                Mar,
                                Apr,
                                May,
                                Jun,
                                Jul,
                                Aug,
                                Sep,
                                Oct,
                                Nov,
                                Dec
                            },
                            meeting_hours {
                                Jan,
                                Feb,
                                Mar,
                                Apr,
                                May,
                                Jun,
                                Jul,
                                Aug,
                                Sep,
                                Oct,
                                Nov,
                                Dec
                            },
                            total_sessions_count
                        }
                    }
                    `
                },

            });
        },
        
        /*** Get Member Statistics */
        membersStatistics() {
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
                        memberStatistics {
                            total_members,
                            total_suspended_members,
                            total_members_monthly_report {
                                Jan,
                                Feb,
                                Mar,
                                Apr,
                                May,
                                Jun,
                                Jul,
                                Aug,
                                Sep,
                                Oct,
                                Nov,
                                Dec
                            }
                        }
                    }
                    `
                }
            })
        }   
    }
});