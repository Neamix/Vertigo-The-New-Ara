<template>
    <div class="aside px-2 py-3" :class="{'closed_nav': closed_nav}">

        <!-- Main Logo -->
        <div class="vertigo_top_aside flex items-center justify-center w-100 h-10">
            <img :src="logo" class="logo" alt="logo" @click="toggleSideNav()">        
        </div>
        <!-- Main Side Menu -->
        <div class="vertigo_menu my-5 pt-5 px-1">
            <ul class="menus my-2 flex justify-center flex-col">
                <li class=" text-v_11 font-semibold p-2 text-gray-300 title" v-if="!closed_nav">Statistics Zone</li>
                <li class="flex">
                    <router-link :to="{name: 'dashboard'}" class="flex p-2 w-full items-center">
                        <Icon icon="mdi:speedometer" class="text-v_16"></Icon>
                        <span class="text-md px-2 text-v_14" v-if="!closed_nav">Dashboard</span>
                    </router-link>
                </li>
                <li class=" text-v_11 font-semibold p-2 text-gray-300 cursor-default title" v-if="!closed_nav">Members Zone</li>
                <li class="flex">
                    <router-link :to="{name: 'members'}" class="flex p-2 w-full" :class="{'justify-content-center': closed_nav}">
                        <Icon icon="ph:users-fill"></Icon>
                        <span class="text-md px-2 text-v_13" v-if="!closed_nav">Members</span>
                    </router-link>
                </li>
                <li class="flex">
                    <router-link :to="{name:'boards'}" class="flex p-2 w-full">
                    <Icon icon="fluent:board-16-filled"></Icon>
                    <span class="text-md px-2 text-v_13" v-if="!closed_nav">Boards</span>
                    </router-link>
                </li>
                <li class="flex">
                    <router-link :to="{path:'/projects'}" class="flex p-2 w-full">
                    <Icon icon="grommet-icons:projects"></Icon>
                    <span class="text-md px-2 text-v_13" v-if="!closed_nav">Projects</span>
                    </router-link>
                </li>
                <li class="py-2 title w-full flex  items-center justify-between cursor-pointer" @click="workspaces_dropdown = !workspaces_dropdown" v-if="!closed_nav">
                    <span class="text-v_11 font-semibold p-2 text-gray-300 cursor-default">Workspaces</span>
                    <button>
                        <img src="../../../src/assets/icons/chevron.svg" class="rotate-half-circle-up px-2" :class="{'active': !workspaces_dropdown}" alt="down">
                    </button>
                </li>
                <li v-if="!closed_nav">
                    <Transition name="dropdown">
                        <ul class="vertigo_dropmenu" v-if="workspaces_dropdown">
                            <li class="flex p-2 workspace_icon mt-2 company_switcher" :class="{'bg-white active': user.company_id == company.id}"  v-for="company in userCompanies" @click="switchCompanyTo(company.id)">
                                <span class="text-md px-2 text-v_13 transition-all" :class="{'text-black ': user.company_id == company.id}">{{ company.name }}</span>
                            </li>
                        </ul>
                    </Transition>
                </li>
            </ul>
            <p>{{ memberNumbers  }}</p>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/AuthStore';
import { useMemberStore } from '../../stores/MembersStore';
import { useGlobalStore } from '../../stores/GlobalStore';
import { computed, ref } from 'vue';
import { usePusherStore } from '../../stores/PusherStore';
import { Icon } from '@iconify/vue';
let workspaces_dropdown = ref(true);

/*** Computed Values */
let logo = computed(() => {
    return '../../../src/assets/images/logos/logo_light.png';

});

let user = computed(() => {
    return useAuthStore().user;
});

let userCompanies = computed(() => {
    return useAuthStore().user.companies
});

let globalStore = useGlobalStore();
let authStore   = useAuthStore();
let memberStore = useMemberStore();
let pusherStore = usePusherStore();
let closed_nav = computed(() => globalStore.closed_nav);

/*** Switch Company */
function switchCompanyTo(companyID) {
    // Cache Old Company 
    let oldCompanyID = authStore.user.company_id;
    
    // Open Loader
    globalStore.mainLoader = true;

    // Nullify Company ID
    authStore.user.company_id = null;
    
    // Send Switch Request
    memberStore.switchCompany(companyID).then(async (response) => {
        // On Success
        if ( response.data.data.switchCompany.status == 'success' ) {
            await authStore.fetchUser();   
            await globalStore.recompile();   
            pusherStore.unSubscripeCompanyChannel(oldCompanyID);
            pusherStore.subscribeCompanyChannel(companyID);
            globalStore.mainLoader = false;        
        }
    });
}
</script>