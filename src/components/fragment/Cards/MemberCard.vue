<template>
    <div class=" bg-dark-300  rounded-md flex px-2 items-center justify-start py-2 relative ">
        <img src="@assets/images/avatar/user.png" class=" w-v_45px h-v_45px">
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
    // General Import 
    import { ref } from "vue";
    import Swal from 'sweetalert2/dist/sweetalert2';

    // Member Store Import
    import { useMemberStore } from "@/stores/MembersStore";
    
    // Member Variables
    let memberStore = useMemberStore();

    // Member Function
    memberStore.suspendUser(2).then((response) => {

    });
</script>