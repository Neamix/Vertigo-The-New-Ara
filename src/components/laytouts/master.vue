<template>
    <div class="container-fluid">
        <Loader></Loader>
        <div class="flex">
            <!-- AsideNav -->
            <AsideNav @toggleSideNav="toggleSideNav"></AsideNav>
            <!-- Main View -->
            <div class="pl-3 main_content min-h-screen" :class="{'closed_nav': !aside_open}">
                <router-view v-slot="{Component}">
                    <component :is="Component"></component>
                </router-view>
            </div>
            <!-- Loader  -->
        </div>
    </div>
</template>

<script setup>
import AsideNav from '../fragment/AsideNav.vue';
import Loader from '../../Pages/Main/Loader.vue';
import { ref,computed } from 'vue';

let workspaces_dropdown = ref(true);
let aside_open = ref(true);
let logo = computed(() => {
    if ( this.aside_open ) {
        return '@assets/images/logos/logo_light.png';
    } else {
        return '@assets/images/logos/fav.png';
    }
});

function toggleSideNav ($val) {
    aside_open = false;
}
</script>