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


let aside_open = ref(true);

function toggleSideNav ($val) {
    aside_open = false;
}
</script>