<template>
    <div class="loader w-full h-screen bg-dark-300  flex justify-center items-center flex-col" v-if="globalStore.mainLoader">
        <Transition name="movedown" appear>
            <img src="@assets/images/logos/logo_light.png" class=" w-44 relative " alt="logo" v-if="globalStore.mainLoader">
        </Transition>
        <Transition name="moveup" appear>
            <div class="container w-60 mt-3 relative" v-if="globalStore.mainLoader">
                <span class="main_loader"></span>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { useGlobalStore } from '../../stores/GlobalStore';
import { onMounted } from 'vue';
import { ref } from 'vue';

// Define Store
const globalStore = useGlobalStore()
</script>