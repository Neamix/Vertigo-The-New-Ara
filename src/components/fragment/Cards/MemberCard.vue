<template>
    <div class="w-100 lg:h-[70px] bg-dark-200 rounded-lg">
        <div class="member-v_image_holder h-full">
            <div class="container p-2 h-full">
                <div class="flex h-full items-center justify-between">
                    <div class="member_info flex">
                        <div class="position-relative">
                            <div class="avatar_icon rounded-full bg-slate-900 flex justify-center items-center h-full p-6 text-v_15">{{ memberStore.gravatarName(member.name) }}</div>
                        </div>
                        <div class="member-v_info pl-2"> 
                            <p class=" text-v_14 ">{{  memberStore.shortName(member.name,15)  }}</p>
                            <p class=" text-v_14 text-gray-400 ">{{  memberStore.shortName(member.email,20)  }}</p>
                        </div>
                    </div>
                    <div class="">
                        <div class="actions_button h-full items-start  w-full right-3 flex justify-end">
                            <slot name="actions"></slot>
                        </div>
                    </div>
                </div>
            </div>
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
    let memberStore = useMemberStore();

    // Computed Class
    let status_class = computed(() => {
        if (props.member.status.id == 1) {
            return "bg-green-500"
        } else if (props.member.status.id == 2) {
            return "bg-yellow-500"
        } else if (props.member.status.id == 3) {
            return "bg-red-500"
        }
    });
</script>