<template>
    <SectionVue>
        <div class="filters flex justify-between w-full">
            <div class="grid grid-cols-3 col-span-3">
                <div class="mr-2">
                    <input type="seach" placeholder="Search on projects" class="form-control search p-2 h-v_35px">
                </div>
            </div>
            <div class="action_btns w-full justify-end  flex">
               <div class="flex">
                    <router-link :to="{name:'project_create'}">
                        <button type="button" @click="sendInvitationIsOpen = true" class="btn  flex mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" fill="#fff" width="10" height="10" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg> 
                            <span  class="text-white">Add New Project</span>  
                        </button>
                    </router-link>
               </div>
            </div>
        </div>
    </SectionVue>
    <SectionVue>
        <div class="w-100 flex justify-center pt-20"  v-if="loader">
            <div class="sub_loader"></div>
        </div>
        <div class="w-full flex justify-center flex-col items-center mt-20" v-if="!loader && !projects.length">
            <img src="@assets/images/icons/project.png" width="100" alt="project">
            <p class="text-v_14 text-gray-500 mt-4 text-center font-bold">Hey there! It looks like you don't have any <br> projects yet Let's create one</p>
            <router-link :to="{name:'project_create'}" class="mt-4">
                <button type="button" @click="sendInvitationIsOpen = true" class="btn  flex mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" fill="#fff" width="10" height="10" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg> 
                    <span  class="text-white">Add New Project</span>  
                </button>
            </router-link>
        </div>
        <div class="grid grid-cols-4 gap-4">
            <ProjectCard :project="project" v-for="project in projects"></ProjectCard>
        </div>
    </SectionVue>
</template>

<script setup>
// Import Main Component
import SectionVue from '@/components/fragment/Pages/Section.vue';
import ProjectCard from '../../../components/fragment/Cards/ProjectCard.vue';

// Import Stores
import { useProjectStore } from '@/stores/ProjectStore';
import { ref } from 'vue';

let projectStore = useProjectStore();

// Get all projects
let search = {
    name: ""
}

let projects = ref([])
let loader = ref(true);

projectStore.listProjects(search).then((response) => {
    let data = response.data.data.projectSearch;

    // Import data
    projects.value = data.data;
    console.log(projects.value)
    // Disable loader
    loader.value = false;
});

</script>