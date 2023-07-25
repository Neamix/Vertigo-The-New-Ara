<template>
    <div class="p-3 vertigo_top_nav w-full justify-between flex border_divider border-b-2 items-center bg-dark">
        <div>
            <ul class="flex">
                <li>
                    <button class="p-2 rounded-full" @click="toggleSideNav()">
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <g id="Menu / Menu_Alt_03">
                            <path id="Vector" d="M5 17H13M5 12H19M5 7H13" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                        </svg>
                    </button>
                </li>
                <li class="relative mx-4 search-holder">
                    <div class="h-full flex items-center">
                        <span class="absolute px-2 pt-1 text-gray-400 font-bold">
                            <Icon icon="iconamoon:search-bold"></Icon>
                        </span>
                        <input type="search" class="form-control bg-dark-300 h-full min-w-[300px] px-8" placeholder="Search Members,Boards,Etc ..">
                    </div>
                    <div class="search-result bg-dark-300 shadow-md shadow-dark-200 absolute w-full z-40">
                        <div class="list">
                            <li class="p-2 text-v_12 text-gray-400">Members</li>
                            <li class="w-full p-3 text-v_13 hover:bg-dark-200 cursor-pointer">Edward Jack</li>
                            <li class="w-full p-3 text-v_13 hover:bg-dark-200 cursor-pointer">Ema Cooper</li>
                        </div>
                        <div class="list">
                            <li class="p-2 text-v_12 text-gray-400">Boards</li>
                            <li class="w-full p-3 text-v_13 hover:bg-dark-200 cursor-pointer">Client Boards</li>
                            <li class="w-full p-3 text-v_13 hover:bg-dark-200 cursor-pointer">Leads Boards</li>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="user flex relative dropdown-toggle">
            <div class="online flex">
                <div class="flex relative">
                    <img src="@assets/images/avatar/avatar.png" class="rounded-full avatar_icon" v-if="useAuthStore().user.avatar"/>
                    <div class="avatar_icon rounded-full bg-slate-900 flex justify-center items-center"  v-if="!useAuthStore().user.avatar">
                        {{  useAuthStore().authGravtarName  }}
                    </div>
                    <span class="absolute avatar-status" :class="{'status-green': useAuthStore().user.status == 1,'status-yellow': useAuthStore().user.status == 2,'status-red': useAuthStore().user.status == 3}"></span>
                </div>
                <div class="px-2">
                    <p class="mb-0 text-v_12">{{  useAuthStore().authShortName  }}</p>
                    <p class="mb-0 text-v_12 text-gray-400">{{ useAuthStore().authShortEmail }}</p>
                </div>
            </div>
            <div class="pt-12 absolute w-full z-10 drop-container">
                <div class="user_dropdown w-full bg-dark-300 min-h-fit rounded-md p-2 dropdown-menu">
                    <ul class="menu border-b-2 border-dark-200">
                        <li class=" text-v_12 font-bold text-gray-200 p-2 drop_control">View Profile</li>
                        <li class=" text-v_12 font-bold text-gray-200 p-2 drop_control">Logout</li>
                    </ul>
                    <ul class="">
                        <li class="p-2 flex items-center cursor-pointer hover:text-gray-400 transition-all" @click="changeStatus(1)">
                            <span class="status_pullet status-green block mr-2 rounded-full"></span>
                            <span class="text-v_12">Active</span>
                        </li>
                        <li class="p-2 flex items-center cursor-pointer hover:text-gray-400 transition-all" @click="changeStatus(2)">
                            <span class="status_pullet status-yellow block mr-2 rounded-full"></span>
                            <span class="text-v_12">Idle</span>
                        </li>
                        <li class="p-2 flex items-center cursor-pointer hover:text-gray-400 transition-all" @click="changeStatus(3)">
                            <span class="status_pullet status-red block mr-2 rounded-full"></span>
                            <span class="text-v_12">Do Not Disturb</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { usePusherStore } from '@/stores/PusherStore';
import { useGlobalStore } from '@/stores/GlobalStore';
import { Icon } from '@iconify/vue';
import { watch,computed } from 'vue';

/** Change Status */
function changeStatus(status_id) {
    useAuthStore().user.status = status_id;
    usePusherStore().changeStatus();
}

/***  */
let closed_nav = computed(() => globalStore.closed_nav);
function toggleSideNav() {
    useGlobalStore().closed_nav =! useGlobalStore().closed_nav
    console.log(useGlobalStore().closed_nav,closed_nav);
}

watch(useGlobalStore().closed_nav, () => {
    console.log('isLoggedIn ref changed, do something!')
})
</script>