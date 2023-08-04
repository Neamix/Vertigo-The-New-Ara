<template>
    <div class="form-control w-full px-3 py-2 bg-dark-300 selector relative">
        <div class="flex main-select-header justify-between">
            <span>{{ defaultText }}</span>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </span>
        </div>
        <ul class="w-full absolute bg-dark-300 left-0 top-[35px] rounded-md z-50 cursor-pointer select-options">
            <li class="p-3 hover:bg-dark-200 rounded-md" v-for="option in options" @click="SelectAction(option)">{{ option }}</li>
        </ul>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

/*** Select Props */
let props = defineProps({
    defaultText: String,
    options: Array
});

/*** Select Emit */
let emit = defineEmits(['onSelected']);
/*** Select Compute */

/*** Select Action */
function SelectAction(option) {
    emit('onSelected',option);
}
</script>
