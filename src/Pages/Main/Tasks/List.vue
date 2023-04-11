<template>
    <Page>

        <!-- Start: Main Header -->
        <MainHeader>
            <template #title>
                <div>
                    <span>
                        Boards
                    </span>
                    <label class="btn mx-3" for="inviteModal">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" fill="#fff" width="10" height="10" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg> 
                        <span  class="text-white">Add New Column</span>  
                    </label>
                </div>
            </template>
        </MainHeader>
        <!-- End: Main Header -->

        <!-- Start: Column Container -->
        <SectionVue>
            <div class="column-upper-container">
                <TaskCard :columns="columns"></TaskCard>
            </div>
        </SectionVue>
        <!-- End: Column Container -->

    </Page>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

// Import Main Components 
import Page from '@/components/fragment/Pages/Page.vue';
import MainHeader from '@/components/fragment/MainHeader.vue';
import SectionVue from '@/components/fragment/Pages/Section.vue';
import TaskCard from '@/components/fragment/Cards/TaskCard.vue';
// Import Plugins
import Draggable from 'vuedraggable'



const meals = ref([
  'Hamburger',
  'Pizza',
  'Spaghetti',
  'Tacos',
  'Teriyaki Chicken',
]);


function addCards() {
    alert()
}

</script>