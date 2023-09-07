<template>
    <div class="w-100 lg:h-[70px] rounded-lg">
        <div class="member-v_image_holder h-full">
            <div class="p-2 h-full">
                <div class="flex h-full items-center justify-between relative">
                    <div class="member_info flex">
                        <div class="relative">
                            <div class="avatar_icon rounded-full bg-slate-900 flex justify-center items-center h-full p-6 text-v_15">{{ memberStore.gravatarName(member.name) }}</div>
                        </div>
                        <div class="member-v_info pl-2"> 
                            <p class=" text-v_14 ">{{  memberStore.shortName(member.name,15)  }}</p>
                            <p class=" text-v_14 text-gray-400 ">{{  memberStore.shortName(member.email,20)  }}</p>
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
    
    // Get Member 
    let props = defineProps({
        member: Object
    });

    let memberStore = useMemberStore();
</script>