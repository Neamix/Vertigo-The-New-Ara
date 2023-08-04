<template>
    <div class=" w-full h-full rounded-lg p-4" :class="{'bg-dark-200': project.type == 'lighter'}">
        <h3 class=" text-v_17 font-bold">This is a fake project title for testing</h3>
        <h5 class="text-v_14 text-gray-500">Created at: 20 March 2020</h5>
        <h3 class=" text-v_14 text-gray-400 mt-5  mb-2">This is a fake project description for testing project to check fittnestt...</h3>
        <div class="members mt-2 flex">
            <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2 "/>
            <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2 "/>
            <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2"/>
            <p class="text-gray-500 text-v_14 mb-0 flex items-center">+20 More</p>
        </div>
    </div>
</template>

<script setup>
import Avatar from '../Avatar/Avatar.vue';

let props = defineProps({
    'project': Object,
});
</script>