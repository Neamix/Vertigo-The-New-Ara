<template>
    <button class="btn btn-primary  items-center relative flex justify-center disabled:opacity-100 overflow-hidden" :disabled="loading">
        <div class="loader_text w-full h-full" :class="{'opacity-0': loading}">
            <div class="w-full h-full flex justify-center items-center">
                <slot name="text"></slot>
            </div>
        </div>
        <div class="loading absolute pointer-events-none" :class="{'opacity-0': !loading}"></div>
    </button>
</template>

<script setup>

defineProps({
  loading: Boolean
});

</script>