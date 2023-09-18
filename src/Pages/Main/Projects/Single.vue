<template>
    <SectionVue>
        <LoaderButton class="mx-2 bg-dark">
            <template #text>
                <div class="flex uppercase">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" fill="#fff" width="10" height="10" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg> 
                    <span  class="text-white">Filter reports</span>  
                </div>
            </template>
        </LoaderButton>
    </SectionVue> 
</template>

<script setup>
// Import Main Components 
import SectionVue from '@/components/fragment/Pages/Section.vue';
import SelectMember from '@/components/fragment/Cards/SelectMember.vue';
import LoaderButton from "@/components/fragment/Buttons/LoaderButton.vue";
</script>