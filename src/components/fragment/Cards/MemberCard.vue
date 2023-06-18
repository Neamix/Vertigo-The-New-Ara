<template>
    <div class=" bg-dark-300  rounded-md flex px-2 items-center justify-start py-2 relative " :class="{}">
        <div class="avatar p-1 relative">
            <img src="@assets/images/avatar/user.png" class=" w-v_45px h-v_45px rounded-full ">
            <span class="absolute avatar-status right-[7px] top-[27px]" :class="status_class"></span>
        </div>
        <div class="user_info mx-4">
            <p class="text-v_14 w-v_125px flex-nowrap whitespace-nowrap " @click="addMember()">
                <slot name="name"></slot>
            </p>
            <span class="text-v_12 text-gray-300">
                <slot name="email"></slot>
            </span>
        </div>
        <div class="actions_button h-full items-start  w-full right-3 flex justify-end ">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script setup>
    // Member Store Import
    import { useMemberStore } from "@/stores/MembersStore";
    import { computed  } from "vue";
    
    // Get Member 
    let props = defineProps({
        member: Object
    });
    

    // Computed Class
    let status_class = computed(() => {
        if (props.member.status.id == 1) {
            return "bg-green-500"
        } else if (props.member.status.id == 2) {
            return "bg-yellow-500"
        } else if (props.member.status.id == 3) {
            return "bg-red-500"
        }
    })
</script>