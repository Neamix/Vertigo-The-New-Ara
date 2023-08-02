<template>
    <SectionVue>
        <div class="project_main_info">
            <div class="w-full col-span-2 card-body bg-dark-300 rounded-md p-4 blind-chart">
                <h2 class="font-bold">Project Informations</h2>
                <div class="form-group">
                    <label class=" my-3 block text-v_13 font-bold" for="projectname">
                        Project Name
                    </label>
                    <input id="projectname" type="email" placeholder="Amazing Name" class="form-control p-3 bg-dark-400 w-[50%]" ref="" v-model="project.name">
                    <p class="mb-1 project_name error"></p>
                </div>
                <div class="form-group">
                    <label class=" my-3 block text-v_13 font-bold" for="projectdescription">
                        Project Description
                    </label>
                    <textarea id="projectdescription" placeholder="Amazing Description" rows="10" class="form-control p-3 bg-dark-400 w-full" ref="" v-model="project.name"></textarea>
                    <p class="mb-1 project_name error"></p>
                </div>

                <div class="form-group">
                    <label class=" my-3 block text-v_13 font-bold" for="projectdescription">
                        Project Type
                    </label>
                    <div class="switch"></div>
                    <p class="mb-1 project_name error"></p>
                </div>

                <div class="form-group col-span-2">
                    <label class=" my-3 block text-v_13 font-bold" for="projectdescription">
                        Project Accessable Members
                    </label>
                    <div class="accessable_form position-relative">
                        <input id="projectname" type="email" placeholder="Amazing Name" class="form-control p-3 bg-dark-400 w-[50%]" ref="" v-model="project.name">
                        <div class="position-absolute w-[50%] bg-dark-400 h-96 rounded-md top-1 mt-1">
                            <div class="form-group p-3">
                                <input class="search_member form-control p-3 bg-dark-300 w-full" placeholder="Search Members">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SectionVue>
</template>

<script setup>
import SectionVue from '@/components/fragment/Pages/Section.vue';
import { ref } from 'vue';

let project = ref({
    name: '',
    description: ''
});

</script>