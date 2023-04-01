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
            <button class="tooltip" data-tip="Suspend User">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15px" height="15px" fill="#fff"><path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" /></svg>
            </button>
        </div>
    </div>
</template>

<script setup>
    // General Import 
    import { ref } from "vue";

    // Member Store Import
    import { useMemberStore } from "@/stores/MembersStore";
    
    // Member Variables
    let memberStore = useMemberStore();

    // Member Function
    memberStore.suspendUser(2).then((response) => {
        console.log(response)
    })
</script>