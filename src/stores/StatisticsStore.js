import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./AuthStore";

export const useStatisticsStore = defineStore('statistics',{
    state: () => ({
        session_pluck: [],
        total_hours: [],
        active_hours: [],
        idle_hours: [],
        meeting_hours: [],
    }),

    actions: {
        getMemberSessions() {
            // Reset Recording Array
            this.session_pluck =  [];
            this.total_hours  = [];
            this.active_hours =  [];
            this.idle_hours = [];
            this.meeting_hours = [];

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
                            sessions {
                                total_session_time,
                                status_id,
                                created_month
                            }
                        }
                    `
                }
            });
        }
    }
});