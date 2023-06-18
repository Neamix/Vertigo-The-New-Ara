<template>
    <div class="container-fluid">
        <Loader></Loader>
        <div class="flex">
            <!-- AsideNav -->
            <AsideNav @toggleSideNav="toggleSideNav"></AsideNav>
            <!-- Main View -->
                <div class="pl-3 main_content min-h-screen w-full" :class="{'closed_nav': !aside_open}">
                    <Page class="w-full">
                        <MainHeader>
                            <template #title>
                                {{ useGlobalStore().page  }}
                            </template>
                        </MainHeader>
                        <router-view v-slot="{Component}">
                            <component :is="Component"></component>
                        </router-view>
                    </Page>
                </div>
            <!-- Loader  -->
        </div>
    </div>
</template>

<script setup>
import AsideNav from '../fragment/AsideNav.vue';
import Loader from '../../Pages/Main/Loader.vue';
import { ref } from 'vue';
import MainHeader from '@/components/fragment/MainHeader.vue';
import Page from '@/components/fragment/Pages/Page.vue';
import { useGlobalStore } from "@/stores/GlobalStore";
import Pusher from 'pusher-js';
import { useMemberStore } from '../../stores/MembersStore';
import { useAuthStore } from '@/stores/AuthStore';
let aside_open = ref(true);
let AuthStore = useAuthStore();

function toggleSideNav ($val) {
    aside_open = false;
}


var pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
    authEndpoint: import.meta.env.VITE_BACKEND_BROADCAST_AUTH,
    cluster: 'sa1',
    auth:{
        headers:{
            'Authorization': 'Bearer ' + AuthStore.bearer_token,
        },
        params: {
            'param-1': 'param-value-1',
            'param-2': 'param-value-2'
        },
        channel_data:{
            'sdas': 'dasd'
        }
    },
    channel_data:{
            'sdas': 'dasd'
        },
    encrypted: true
});

// let company_channel = useAuthStore().user.
let channel_name = 'presence-company.'+AuthStore.user.company_id;
var channel = pusher.subscribe(channel_name);

channel.bind('status', function(data) {
    let memberStore = useMemberStore();
    let members = memberStore.members;
    let user_id = data.user.user_id;

    // Find Index of User
    let index = members.findIndex((x) =>  x.id == user_id);
    
    // In Case This User Exist In The Array Change Its Status
    if ( index > -1 ) {
        members[index].status.id = data.user.status_id;
    }
    
    memberStore.members = members;
});
</script>