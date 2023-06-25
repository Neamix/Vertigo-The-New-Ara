<template>
    <div class="aside px-2 py-3" :class="{'closed_nav': !aside_open}">

        <!-- Main Logo -->
        <div class="vertigo_top_aside flex  items-center" :class="{'justify-between': aside_open,'justify-center pr-2': !aside_open}">
            <img :src="logo" :class="{'logo': aside_open,'fav': !aside_open}" alt="logo" @click="toggleSideNav()">
            <svg @click="toggleSideNav()"  xmlns="http://www.w3.org/2000/svg" :class="{'hidden': !aside_open}" class="side-menu__icon" width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
        </div>

        <!-- Main Side Menu -->
        <div class="vertigo_menu my-5 pt-5 px-1">
            <ul class="menus my-2 flex justify-center flex-col">
                <li class="flex active">
                    <router-link :to="{name: 'dashboard'}" class="flex p-2">
                        <object data="../../../src/assets/icons/home.svg"></object>
                        <span class="text-md px-2 text-v_13" v-if="aside_open">Dashboard</span>
                    </router-link>
                </li>
                <li class="flex">
                    <router-link :to="{name: 'members'}" class="flex p-2">
                        <object data="../../../src/assets/icons/user.svg"></object>
                        <span class="text-md px-2 text-v_13" v-if="aside_open">Members</span>
                    </router-link>
                </li>
                <li class="flex p-2">
                    <object data="../../../src/assets/icons/app.svg"></object>
                    <span class="text-md px-2 text-v_13" v-if="aside_open">Tasks</span>
                </li>
                <li class="flex p-2">
                    <object data="../../../src/assets/icons/roles.svg"></object>
                    <span class="text-md px-2 text-v_13" v-if="aside_open">Roles</span>
                </li>
                <li class="flex p-2">
                    <object data="../../../src/assets/icons/attending.svg"></object>
                    <span class="text-md px-2 text-v_13" v-if="aside_open">Attending Profiles</span>
                </li>
                <li class="flex p-2">
                    <object data="../../../src/assets/icons/builder.svg"></object>
                    <span class="text-md px-2 text-v_13" v-if="aside_open">Forms Builder</span>
                </li>
                <li class="flex p-2">
                    <object data="../../../src/assets/icons/widgets.svg"></object>
                    <span class="text-md px-2 text-v_13" v-if="aside_open">Widgets</span>
                </li>
                <li class="flex p-2">
                    <object data="../../../src/assets/icons/attending.svg"></object>
                    <span class="text-md px-2 text-v_13" v-if="aside_open">{{ this.$helper.locale('Settings')  }}</span>
                </li>
                <li class="py-2 title w-full flex  items-center justify-between cursor-pointer" @click="workspaces_dropdown = !workspaces_dropdown">
                    <span class="text-md px-2 text-v_13" v-if="aside_open">Workspaces</span>
                    <button>
                        <img src="../../../src/assets/icons/chevron.svg" class="rotate-half-circle-up px-2" :class="{'active': !workspaces_dropdown}" alt="down">
                    </button>
                </li>
                <li>
                    <Transition name="dropdown">
                        <ul class="vertigo_dropmenu" v-if="workspaces_dropdown">
                            <li class="flex p-2 workspace_icon mt-2 company_switcher" :class="{'bg-white active': user.company_id == company.id}"  v-for="company in userCompanies" @click="switchCompanyTo(company.id)">
                                <img src="../../../src/assets/workspaces/man.png" class="w-20" alt="workspace">
                                <span class="text-md px-2 text-v_13 transition-all" :class="{'text-black ': user.company_id == company.id}" v-if="aside_open">{{ company.name }}</span>
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
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '../../stores/AuthStore';
import { useMemberStore } from '../../stores/MembersStore';
import { useGlobalStore } from '../../stores/GlobalStore';
import { computed, ref } from 'vue';
import { usePusherStore } from '../../stores/PusherStore';

/*** Sidenav Open */
let aside_open = ref(true);
let workspaces_dropdown = ref(true);

/*** Props */
let props = defineProps({
    aside_open: Boolean
});

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

/*** Switch Company */
let globalStore = useGlobalStore();
let AuthStore   = useAuthStore();
let memberStore = useMemberStore();
let pusherStore = usePusherStore();

function switchCompanyTo(companyID) {
    // Cache Old Company 
    let oldCompanyID = AuthStore.user.company_id;
    
    // Open Loader
    globalStore.mainLoader = true;

    // Nullify Company ID
    AuthStore.user.company_id = null;
    
    // Send Switch Request
    memberStore.switchCompany(companyID).then((response) => {
        globalStore.mainLoader = false;        

        // On Success
        if ( response.data.data.switchCompany.status == 'success' ) {
            AuthStore.user.company_id = companyID;
            pusherStore.unSubscripeCompanyChannel(oldCompanyID);
            pusherStore.subscribeCompanyChannel(companyID);
            globalStore.recompile();
        }
    });
}

/*** Open And Close Nav */
function toggleSideNav() {
    this.aside_open.value = !this.aside_open.value
    this.$emit('toggleSideNav',this.aside_open.value)
}


</script>