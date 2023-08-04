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
        <div class="grid grid-cols-4 gap-4">
            <ProjectCard :project="{'name': 'name','description': 'Desc','type': 'lighter'}"></ProjectCard>
            <ProjectCard :project="{'name': 'name','description': 'Desc','type': 'lighter'}"></ProjectCard>
            <ProjectCard :project="{'name': 'name','description': 'Desc','type': 'lighter'}"></ProjectCard>
            <ProjectCard :project="{'name': 'name','description': 'Desc','type': 'lighter'}"></ProjectCard>
            <ProjectCard :project="{'name': 'name','description': 'Desc','type': 'lighter'}"></ProjectCard>
        </div>
    </SectionVue>
</template>

<script setup>
// Import Main Component
import SectionVue from '@/components/fragment/Pages/Section.vue';
import ProjectCard from '../../../components/fragment/Cards/ProjectCard.vue';


</script>