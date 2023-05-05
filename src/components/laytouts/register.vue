<template>
    
    <div class="tabs container">
        <div class="header mt-10 mb-5 flex justify-between w-full">
            <img src="@/assets/images/logos/logo_light.png" class=" w-36 mr-3 " alt="logo">
            <button class="flex text-v_13  items-center">
                <span class="font-bold">Already have account</span>
                <i class="fa-solid fa-chevron-right text-v_10 mx-2 pt-0.5"></i>
            </button>
        </div>
        <div class="bullets grid grid-cols-4 w-full pt-16">
            <div class="bullet flex">
                <div class="bullet_value rounded-full bg-dark-200 w-v_45px h-v_45px flex justify-center items-center" :class="{'bullet_active':   currentName == 'CompanyInfo' ||  currentName == 'PersonalInfo'}">
                    <p class=" font-bold">1</p>
                </div>
                <div class="company_info_bullet mx-3">
                    <p class=" text-v_14 ">Company information</p>
                    <span class="block text-v_12 text-gray-300 capitalize">Add your company information</span>
                </div>
            </div>
            <div class="bullet flex">
                <div class="bullet_value rounded-full bg-dark-200 w-v_45px h-v_45px flex justify-center items-center" :class="{'bullet_active':  currentName == 'PersonalInfo'}">
                    <p class=" font-bold ">2</p>
                </div>
                <div class="company_info_bullet mx-3">
                    <p class=" text-v_14 ">Perosnal Information</p>
                    <span class="block text-v_12 text-gray-300 capitalize">Add your personal information</span>
                </div>
            </div>
            <div class="bullet flex">
                <div class="bullet_value rounded-full bg-dark-200 w-v_45px h-v_45px flex justify-center items-center">
                    <p class=" font-bold ">3</p>
                </div>
                <div class="company_info_bullet mx-3">
                    <p class=" text-v_14 ">Review</p>
                    <span class="block text-v_12 text-gray-300">Review your data</span>
                </div>
            </div>
            <div class="bullet flex">
                <div class="bullet_value rounded-full bg-dark-200 w-v_45px h-v_45px flex justify-center items-center">
                    <p class=" font-bold ">3</p>
                </div>
                <div class="company_info_bullet mx-3">
                    <p class=" text-v_14 ">Pay & Checkout</p>
                </div>
            </div>
        </div>
        <router-view :key="$route.path"></router-view>
    </div>
</template>

<script setup>
    import { useRouter, useRoute } from 'vue-router';
    import { useRegisterStore } from '../../stores/RegisterStore';
    import { computed } from 'vue';

    let currentName =  computed(() => {
        return useRegisterStore().currentRegisterName
    });


</script>
