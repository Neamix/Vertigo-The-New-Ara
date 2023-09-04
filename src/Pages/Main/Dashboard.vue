<template>
   <SectionVue>


        <!-- ========== Start Area Chart ========== -->
        <div class="grid grid-cols-4 gap-4">
            <AreaChart :schema="statisticsStore.sessions.total_hours" :chart_name="'Total Hours'"></AreaChart>
            <AreaChart :schema="statisticsStore.sessions.active_hours" :chart_name="'Active Hours'"></AreaChart>
            <AreaChart :schema="statisticsStore.sessions.idle_hours" :chart_name="'Idle Hours'"></AreaChart>
            <AreaChart :schema="statisticsStore.sessions.meeting_hours" :chart_name="'Meeting Hours'"></AreaChart>
        </div>
        <!-- ========== End Area Chart ========== -->
    

        <!-- ========== Start Box Count ========== -->
        <div class="grid grid-cols-4 gap-4 mt-4">
            <div class="grid grid-cols-2 gap-4 col-span-2">
                <BoxCount :count="statisticsStore.memberStatistics.total_members_in_work" :chart_name="'Total Members'" :unit="'Member'"></BoxCount>
                <BoxCount :count="statisticsStore.memberStatistics.active_members" :chart_name="'Active Now'" :unit="'Member'"></BoxCount>
                <BoxCount :count="statisticsStore.memberStatistics.total_suspended_members" :chart_name="'Suspended Members'" :unit="'Member'"></BoxCount>
                <BoxCount :count="statisticsStore.sessions.total_sessions_count" :chart_name="'Total Sessions'" :unit="'Session'"></BoxCount>
            </div>
            <div class="col-span-2 h-full">
                <BarChart :schema="statisticsStore.memberStatistics.member_report" :chart_name="'Members Statistics'" class=" min-h-v_25vh "></BarChart>
            </div>
        </div>
        <!-- ========== End Box Count ========== -->


   </SectionVue>
</template>

<script setup>
// Library Import 
import 'swiper/css';

// Store Import
import { useStatisticsStore } from '@/stores/StatisticsStore';

// Component Import
import BoxCount from '@/components/fragment/Statistics/BoxCount.vue';
import BarChart from '@/components/fragment/Statistics/BarChart.vue';
import SectionVue from '@/components/fragment/Pages/Section.vue';
import AreaChart from '@/components/fragment/Statistics/AreaChart.vue';

// Define Stores
let statisticsStore = useStatisticsStore();

/*** Session Statistics */
statisticsStore.getMemberSessions().then((response) => {
    let report = response.data.data.sessionStatistics;
    statisticsStore.sessions.total_hours = report.total_hours;
    statisticsStore.sessions.active_hours = report.active_hours;
    statisticsStore.sessions.idle_hours = report.idle_hours;
    statisticsStore.sessions.meeting_hours = report.meeting_hours;
    statisticsStore.sessions.total_sessions_count = report.total_sessions_count
});

/*** Members Statistics */
statisticsStore.membersStatistics().then((response) => {
    let report = response.data.data.memberStatistics;
    statisticsStore.memberStatistics.total_members_in_work = report.total_members;
    statisticsStore.memberStatistics.member_report = report.total_members_monthly_report;
    statisticsStore.memberStatistics.total_suspended_members = report.total_suspended_members
})

</script>