<template>
    <button class="btn btn-primary  items-center relative flex justify-center disabled:opacity-100 disabled:bg-black" :disabled="loading">
        <div class="loader_text" :class="{'opacity-0': loading}">
            <span>
                <slot name="text"></slot>
            </span>
        </div>
        <div class="loading absolute" :class="{'opacity-0': !loading}"></div>
    </button>
</template>

<script setup>

defineProps({
  loading: Boolean
});

</script>