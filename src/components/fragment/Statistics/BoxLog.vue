<template>
    <div class="card relative overflow-hidden">
        <div class="card-body bg-dark-300 rounded-md p-4 blind-chart h-[325px] mb-2 overflow-y-scroll">
            <h3 class=" text-v_16">{{  props.name  }}</h3>
            <div class="pt-2 flex items-center" v-for="log in logs">
                <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}"/>
                <p class="mb-0 px-2">
                    <span class="block text-v_15">{{ log.message }}</span>
                    <span class="block text-v_12 text-gray-500">20 June 2020</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import Avatar from '../Avatar/Avatar.vue';

/*** Get Log Data */
let props = defineProps({
    name: String,
    logs: Array
});
</script>