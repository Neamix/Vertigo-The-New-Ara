<template>
    <div class=" w-full h-full rounded-lg p-4 bg-dark-200">
        <h3 class=" text-v_17 font-bold">{{ props.project.name }}</h3>
        <h5 class="text-v_14 text-gray-500">Created at: {{ props.project.created_date }}</h5>
        <h3 class=" text-v_14 text-gray-400 mt-5  mb-2 h-10">{{ description }}</h3>
        <div class="members mt-2 flex" v-if="props.project.accessableMembers.length > 0">
            <Avatar :user="{'avatar': undefined,'name':accessableMember.name}" class=" mr-2 " v-for="accessableMember in props.project.accessableMembers.slice(0,3)"/>
            <p class="text-gray-500 text-v_14 mb-0 flex items-center">{{  moreAccessableMember  }}</p>
        </div>
        <p class=" text-v_12 text-gray-500 mt-5 " v-else>No accessable members</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import Avatar from '../Avatar/Avatar.vue';

let props = defineProps({
    'project': Object
});

let description = computed(() => {
    return props.project.description.slice(0,50) + '...'
});

let moreAccessableMember = computed(() => {
    let more =  props.project.accessableMembers - 2;
    return (more > 0) ? more + '+' : '';
})
</script>