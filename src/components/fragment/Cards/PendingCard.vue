<template>
    <div :class="{'disabled_div': (emailsUnderActions.indexOf(id) > -1) ? true : false}">
        <p class="text-v_15">{{  email  }}</p>
        <div class="flex actions">
            <span class="text-v_12 text-red-400 cursor-pointer" @click="deleteRequest(id)" :id="id">Delete Request</span>
        </div>
    </div>
</template>

<script setup>

let props = defineProps({
    email: String,
    id: Number,
    emailsUnderActions: Boolean
});

/*** Remove Request */
let emit = defineEmits(['deletePendingRequest']);

function deleteRequest(id) {
    emit('deletePendingRequest',id);
}

</script>