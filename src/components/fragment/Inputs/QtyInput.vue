<template>
    <div class="vertigo_qty w-32">
        <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button class=" bg-dark-300 text-gray-500 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none" @click="decrement()">
                <span class="m-auto text-2xl font-thin">−</span>
            </button>
            <input class="outline-none focus:outline-none text-center w-full bg-dark-300  font-semibold text-md  md:text-basecursor-default flex items-center text-gray-500" name="custom-input-number" v-model="qty"/>
            <button class="bg-dark-300 text-gray-500 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer" @click="increment()">
                <span class="m-auto text-2xl font-thin">+</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref,watch } from 'vue';

defineEmits(['update:amount'])

let props = defineProps({
    max: Number,
    min: Number,
    amount: Number
});

let max = props.max ?? 200;
let min = props.min ?? 0;
let qty = ref(props.amount);

function decrement() {
    if ( qty.value > min )
            qty.value--; 
}

function increment() {
    if ( qty.value < max )
        qty.value++; 
}

watch
</script>