<template>
    <div class="container-fluid">
        <div class="flex">
            <!-- AsideNav -->
            <AsideNav @toggleSideNav="toggleSideNav"></AsideNav>
            <!-- Main View -->
            <div class="pl-3 main_content min-h-screen w-full" :class="{'closed_nav': closed_nav}">
                <Page class="w-full">
                    <MainHeader>
                        <template #title>
                            {{ useGlobalStore().page  }}
                        </template>
                    </MainHeader>
                    <router-view v-slot="{Component}">
                        <component :is="Component" v-if="useGlobalStore().renderComponent"></component>
                    </router-view>
                </Page>
            </div>
        </div>
    </div>
</template>

<script setup>
import AsideNav from '../fragment/AsideNav.vue';
import { ref,computed, watch, onMounted } from 'vue';
import MainHeader from '@/components/fragment/MainHeader.vue';
import Page from '@/components/fragment/Pages/Page.vue';
import { useGlobalStore } from "@/stores/GlobalStore";
import { usePusherStore } from '@/stores/PusherStore';

/** Define Stores */
let globalStore = useGlobalStore();

/*** Body Toggle  */
let closed_nav = computed(() => globalStore.closed_nav);

watch(() => globalStore.closed_nav,(value) => {
    closed_nav = value;
});

/*** Subscripe Channels */
let pusherStore = usePusherStore();

function toggleSideNav ($val) {
    aside_open = false;
}

// Re-render on route change
const renderComponent = ref(true); 

pusherStore.initPusher();


onMounted(() => {
    setTimeout(() => {
        globalStore.initializationLoader = false;
    },1000)
})

</script>