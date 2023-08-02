<template>
  <Loader></Loader>
  <router-view></router-view>
</template>

<script setup>
  import Loader from './Pages/Main/Loader.vue';
import { useGlobalStore } from './stores/GlobalStore';

  let globalStore = useGlobalStore();
  
  setTimeout(() => {
      globalStore.mainLoader = false;
  }, 1000);
</script>