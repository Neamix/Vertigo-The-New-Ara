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
                        Accessable Members 
                    </label>
                    <div class="switch"></div>
                    <div class="member_select relative w-full max-w-sm ">
                        <input type="text" class="form-control p-3 bg-dark-400 w-full" placeholder="Select accessable members">
                        <div class="select_member absolute w-full p-3 bg-dark-200 h-72 overflow-y-scroll">
                            <input type="text" class="form-control p-3 bg-dark-400 w-full" placeholder="Search by name">
                            <ul class="menu navbar text-start items-start rounded-md shadow-md pt-2">
                                <li class=" text-v_14 font-bold py-2 ">Adam Jack</li>
                                <li class=" text-v_14 font-bold py-2 ">Adam Jack</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="form-group col-span-2">
                    <label class=" my-3 block text-v_13 font-bold" for="projectdescription">
                        Project Accessable Members
                    </label>
                    
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