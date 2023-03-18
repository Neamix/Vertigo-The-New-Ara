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
                            <li class="flex p-2 workspace_icon">
                                <img src="../../../src/assets/workspaces/man.png" class="w-20" alt="workspace">
                                <span class="text-md px-2 text-v_13" v-if="aside_open">Arktic Solution</span>
                            </li>
                            <li class="flex p-2 workspace_icon">
                                <img src="../../../src/assets/workspaces/old-man.png" class="w-20" alt="workspace">
                                <span class="text-md px-2 text-v_13" v-if="aside_open">Aviola</span>
                            </li>
                            <li class="flex p-2 workspace_icon">
                                <img src="../../../src/assets/workspaces/woman.png" class="w-20" alt="workspace">
                                <span class="text-md px-2 text-v_13" v-if="aside_open">Delta Solution</span>
                            </li>
                        </ul>
                    </Transition>
                </li>
            </ul>
            <p>{{ memberNumbers  }}</p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useAuth } from '../../stores/AuthStore';
import locale  from '@/Helpers/localization/locale';

export default {
   props: ['asideOpen'],

    data() {
        return {
            workspaces_dropdown: true,
            aside_open: true,
            isLoading: false,
        }
    },

    computed: {
        logo() {
            if ( this.aside_open ) {
                return '../../../src/assets/images/logos/logo_light.png';
            } else {
                return '../../../src/assets/images/logos/fav.png';
            }
        }
    },

    methods: {
        toggleSideNav() {
            this.aside_open = !this.aside_open
            this.$emit('toggleSideNav',this.aside_open)
        },
        ...mapActions(useAuth,['api'])
    },

    mounted() {
        console.log(this.$helper.locale('Settings'))
    }
}

</script>