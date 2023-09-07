<template>
  <Loader></Loader>
  <InitializationLoader></InitializationLoader>
  <router-view></router-view>
</template>

<script setup>
  import Loader from './Pages/Main/Loader.vue';
  import { useGlobalStore } from './stores/GlobalStore';
  import InitializationLoader from '@/Pages/Main/Initialization.vue';

  let globalStore = useGlobalStore();
  
  setTimeout(() => {
    globalStore.mainLoader = false;
    globalStore.initializationLoader = true;
  }, 1000);
</script>