<template>
   <SectionVue>
        <div class="alert alert-warning rounded-md justify-start mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span class=" vert font-semibold">Warning: This is the statistics for the current year only</span>
            <button class="border-2 font-semibold border-black px-4 py-2 ml-auto rounded-md hover:bg-white hover:text-black hover:border-white">Ok,Got it</button>
        </div>
        <div class="grid grid-cols-4 gap-4">
            <AreaChart :schema="statisticsStore.total_hours" :chart_name="'Total Hours'"></AreaChart>
            <AreaChart :schema="statisticsStore.active_hours" :chart_name="'Active Hours'"></AreaChart>
            <AreaChart :schema="statisticsStore.idle_hours" :chart_name="'Idle Hours'"></AreaChart>
            <AreaChart :schema="statisticsStore.meeting_hours" :chart_name="'Meeting Hours'"></AreaChart>
        </div>
        <div class="grid grid-cols-4 gap-4 mt-4">
            <div class="grid grid-cols-2 gap-4 col-span-2">
                <BoxCount :count="20" :chart_name="'Total Members'"></BoxCount>
                <BoxCount :count="20" :chart_name="'Active Now'"></BoxCount>
                <BoxCount :count="20" :chart_name="'Suspended Members'"></BoxCount>
                <BoxCount :count="20" :chart_name="'Offline Members'" ></BoxCount>
            </div>
            <div class="col-span-2 h-full">
                <BarChart></BarChart>
            </div>
        </div>
        <div class="grid grid-cols-5 gap-4 mt-4">
            <div class="col-span-2">
                <BoxLog :name="'Boards Log'" :logs="BoardLog"></BoxLog>
            </div>
            <div class="col-span-3">
               <SliderBox></SliderBox>
            </div>
        </div>
   </SectionVue>
</template>

<script setup>
import { ref } from 'vue';
import 'swiper/css';
import SectionVue from '../../components/fragment/Pages/Section.vue';
import AreaChart from '../../components/fragment/Statistics/AreaChart.vue';
import { useStatisticsStore } from '@/stores/StatisticsStore';
import BoxCount from '../../components/fragment/Statistics/BoxCount.vue';
import BarChart from '../../components/fragment/Statistics/BarChart.vue';
import BoxLog from '../../components/fragment/Statistics/BoxLog.vue';
import SliderBox from '../../components/fragment/Statistics/SliderBox.vue';

let statisticsStore = useStatisticsStore();
let sessions = ref([]);

/*** Filter Sessions By Status ID */

statisticsStore.getMemberSessions().then((response) => {
    sessions = response.data.data.sessions;

    // Total Statistics
    statisticsStore.total_hours.push(sessions.filter((x) => x.created_month == 'Jan').map(x => x.total_session_time).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.total_hours.push(sessions.filter((x) => x.created_month == 'Feb').map(x => x.total_session_time).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.total_hours.push(sessions.filter((x) => x.created_month == 'Mar').map(x => x.total_session_time).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.total_hours.push(sessions.filter((x) => x.created_month == 'Apr').map(x => x.total_session_time).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.total_hours.push(sessions.filter((x) => x.created_month == 'May').map(x => x.total_session_time).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.total_hours.push(sessions.filter((x) => x.created_month == 'Jun').map(x => x.total_session_time).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.total_hours.push(sessions.filter((x) => x.created_month == 'Jul').map(x => x.total_session_time).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.total_hours.push(sessions.filter((x) => x.created_month == 'Aug').map(x => x.total_session_time).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.total_hours.push(sessions.filter((x) => x.created_month == 'Sep').map(x => x.total_session_time).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.total_hours.push(sessions.filter((x) => x.created_month == 'Oct').map(x => x.total_session_time).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.total_hours.push(sessions.filter((x) => x.created_month == 'Nov').map(x => x.total_session_time).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.total_hours.push(sessions.filter((x) => x.created_month == 'Dec').map(x => x.total_session_time).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));

    // Active Statistics 
    statisticsStore.active_hours.push(sessions.filter((x) => x.created_month == 'Jan' && x.status_id == 1).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.active_hours.push(sessions.filter((x) => x.created_month == 'Feb' && x.status_id == 1).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.active_hours.push(sessions.filter((x) => x.created_month == 'Mar' && x.status_id == 1).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.active_hours.push(sessions.filter((x) => x.created_month == 'Apr' && x.status_id == 1).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.active_hours.push(sessions.filter((x) => x.created_month == 'May' && x.status_id == 1).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.active_hours.push(sessions.filter((x) => x.created_month == 'Jun' && x.status_id == 1).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.active_hours.push(sessions.filter((x) => x.created_month == 'Jul' && x.status_id == 1).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.active_hours.push(sessions.filter((x) => x.created_month == 'Aug' && x.status_id == 1).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.active_hours.push(sessions.filter((x) => x.created_month == 'Sep' && x.status_id == 1).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.active_hours.push(sessions.filter((x) => x.created_month == 'Oct' && x.status_id == 1).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.active_hours.push(sessions.filter((x) => x.created_month == 'Nov' && x.status_id == 1).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.active_hours.push(sessions.filter((x) => x.created_month == 'Dec' && x.status_id == 1).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));

    // Idle Statistics 
    statisticsStore.idle_hours.push(sessions.filter((x) => x.created_month == 'Jan' && x.status_id == 2).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.idle_hours.push(sessions.filter((x) => x.created_month == 'Feb' && x.status_id == 2).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.idle_hours.push(sessions.filter((x) => x.created_month == 'Mar' && x.status_id == 2).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.idle_hours.push(sessions.filter((x) => x.created_month == 'Apr' && x.status_id == 2).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.idle_hours.push(sessions.filter((x) => x.created_month == 'May' && x.status_id == 2).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.idle_hours.push(sessions.filter((x) => x.created_month == 'Jun' && x.status_id == 2).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.idle_hours.push(sessions.filter((x) => x.created_month == 'Jul' && x.status_id == 2).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.idle_hours.push(sessions.filter((x) => x.created_month == 'Aug' && x.status_id == 2).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.idle_hours.push(sessions.filter((x) => x.created_month == 'Sep' && x.status_id == 2).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.idle_hours.push(sessions.filter((x) => x.created_month == 'Oct' && x.status_id == 2).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.idle_hours.push(sessions.filter((x) => x.created_month == 'Nov' && x.status_id == 2).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.idle_hours.push(sessions.filter((x) => x.created_month == 'Dec' && x.status_id == 2).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));

    // Idle Statistics 
    statisticsStore.meeting_hours.push(sessions.filter((x) => x.created_month == 'Jan' && x.status_id == 3).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.meeting_hours.push(sessions.filter((x) => x.created_month == 'Feb' && x.status_id == 3).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.meeting_hours.push(sessions.filter((x) => x.created_month == 'Mar' && x.status_id == 3).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.meeting_hours.push(sessions.filter((x) => x.created_month == 'Apr' && x.status_id == 3).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.meeting_hours.push(sessions.filter((x) => x.created_month == 'May' && x.status_id == 3).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.meeting_hours.push(sessions.filter((x) => x.created_month == 'Jun' && x.status_id == 3).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.meeting_hours.push(sessions.filter((x) => x.created_month == 'Jul' && x.status_id == 3).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.meeting_hours.push(sessions.filter((x) => x.created_month == 'Aug' && x.status_id == 3).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.meeting_hours.push(sessions.filter((x) => x.created_month == 'Sep' && x.status_id == 3).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.meeting_hours.push(sessions.filter((x) => x.created_month == 'Oct' && x.status_id == 3).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.meeting_hours.push(sessions.filter((x) => x.created_month == 'Nov' && x.status_id == 3).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
    statisticsStore.meeting_hours.push(sessions.filter((x) => x.created_month == 'Dec' && x.status_id == 3).map(x => x.total_session_time ).reduce( (a, b) => (parseInt(a) + parseInt(b)),0));
});

/*** Logs Data */
let BoardLog = ref([
    {
        user: {
            name: "Jessica Adam",
            avatar: undefined
        },
        message: "Jessica Adam has move card from Todo to In Progress" 
    },
    {
        user: {
            name: "Jessica Adam",
            avatar: undefined
        },
        message: "Jessica Adam has move card from Todo to In Progress" 
    },
    {
        user: {
            name: "Jessica Adam",
            avatar: undefined
        },
        message: "Jessica Adam has move card from Todo to In Progress, In Clients board" 
    },
    {
        user: {
            name: "Jessica Adam",
            avatar: undefined
        },
        message: "Jessica Adam has move card from Todo to In Progress" 
    },
    {
        user: {
            name: "Jessica Adam",
            avatar: undefined
        },
        message: "Jessica Adam has move card from Todo to In Progress" 
    },
    {
        user: {
            name: "Jessica Adam",
            avatar: undefined
        },
        message: "Jessica Adam has move card from Todo to In Progress" 
    },
    {
        user: {
            name: "Jessica Adam",
            avatar: undefined
        },
        message: "Jessica Adam has move card from Todo to In Progress" 
    }
])

</script>