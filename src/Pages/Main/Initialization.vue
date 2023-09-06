<template>
    <div class="w-full h-screen bg-dark-300  flex justify-center items-center flex-col fixed z-50" v-if="globalStore.initializationLoader">
        <Transition name="movedown" appear>
            <img src="@assets/images/logos/logo_light.png" class=" w-44 relative " alt="logo" v-if="globalStore.initializationLoader">
        </Transition>
        <Transition name="moveup" appear>
            <div class="container w-60 mt-3 relative flex justify-center" v-if="globalStore.initializationLoader">
                <span class="loading block mx-3"></span>
                <span>Initialization of workspace</span>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { useGlobalStore } from '../../stores/GlobalStore';

// Define Store
const globalStore = useGlobalStore()
</script>