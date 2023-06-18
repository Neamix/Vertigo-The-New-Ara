<template>
    <div class="p-5 vertigo_top_nav w-full justify-between flex border_divider border-b-2 items-center pb-3">
        <slot name="title"></slot>
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

/** Change Status */
function changeStatus(status_id) {
    useAuthStore().user.status = status_id;
    usePusherStore().changeStatus();
}

</script>