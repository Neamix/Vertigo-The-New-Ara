<template>
    <div class="min-h-screen container mx-auto">
       <div class="header mt-10 mb-5 flex justify-between">
           <img src="@/assets/images/logos/logo_light.png" class=" w-36 mr-3 " alt="logo">
           <button class="flex text-v_13  items-center">
               <span class="font-bold">Already have account</span>
               <i class="fa-solid fa-chevron-right text-v_10 mx-2 pt-0.5"></i>
           </button>
       </div>
       <div class="bullets grid grid-cols-4 pt-16">
           <div class="bullet flex">
               <div class="bullet_value rounded-full bg-dark-200 w-v_45px h-v_45px flex justify-center items-center bullet_active">
                   <p class=" font-bold">1</p>
               </div>
               <div class="company_info_bullet mx-3">
                   <p class=" text-v_14 ">Company information</p>
                   <span class="block text-v_12 text-gray-300">Add your company information</span>
               </div>
           </div>
           <div class="bullet flex">
               <div class="bullet_value rounded-full bg-dark-200 w-v_45px h-v_45px flex justify-center items-center">
                   <p class=" font-bold ">2</p>
               </div>
               <div class="company_info_bullet mx-3">
                   <p class=" text-v_14 ">Attending profile</p>
                   <span class="block text-v_12 text-gray-300">Add your company information</span>
               </div>
           </div>
           <div class="bullet flex">
               <div class="bullet_value rounded-full bg-dark-200 w-v_45px h-v_45px flex justify-center items-center">
                   <p class=" font-bold ">3</p>
               </div>
               <div class="company_info_bullet mx-3">
                   <p class=" text-v_14 ">Personal information</p>
                   <span class="block text-v_12 text-gray-300">Add your company information</span>
               </div>
           </div>
           <div class="bullet flex">
               <div class="bullet_value rounded-full bg-dark-200 w-v_45px h-v_45px flex justify-center items-center">
                   <p class=" font-bold ">4</p>
               </div>
               <div class="company_info_bullet mx-3">
                   <p class=" text-v_14 ">Checkout information</p>
                   <span class="block text-v_12 text-gray-300">Add your company information</span>
               </div>
           </div>
       </div>
       <div class="pages w-full">
           <div class="page mt-10">
               <div class="grid grid-cols-2 gap-3 w-full">
                   <div class="form-group">
                       <label class=" my-3 block text-v_13 font-bold">
                           Company Name
                       </label>
                       <input type="email" placeholder="Awesome Company" class="form-control w-full p-3 bg-dark-300" ref="input">
                   </div>
                   <div class="form-group w-full">
                       <label class=" my-3 block text-v_13 font-bold">
                           Company Email
                       </label>
                       <input type="email" placeholder="awesomeEmail@company.com" class="form-control w-full p-3 bg-dark-300" ref="">
                   </div>
               </div>
               <div class="form-group w-full mt-4">
                   <div class=" grid grid-cols-3 gap-2">
                       <div class="w-100">
                           <label class=" my-3 block text-v_13 font-bold">
                               Company's Country
                           </label>
                           <SelectCountry class="w-full"></SelectCountry>
                       </div>
                       <div class="form-group w-full col-span-2">
                           <label class=" my-3 block text-v_13 font-bold">
                               Company Address
                           </label>
                           <input type="email" placeholder="Amazing Address" class="form-control w-full p-3 bg-dark-300" ref="">
                       </div>
                       <div class="w-100">
                           <label class=" my-3 block text-v_13 font-bold">
                               How many seats you want ? 
                               <span class=" text-gray-500 ">20$ per seat</span>
                           </label>
                           <QtyInput :amount="0" v-model="amount"></QtyInput>
                       </div>
                   </div>
               </div>
               <div class="form-group w-full mt-4">
                   <label class=" my-3 block text-v_13 font-bold">
                       Company Description
                   </label>
                   <textarea class="w-full form-control bg-dark-300 p-2" rows="5"></textarea>
               </div>
               <div class="form-group w-full mt-4">
                   <label class=" my-3 block text-v_13 font-bold">
                       Company Logo 
                   </label>
                   <file-pond class="w-100" name="test" ref="pond" :label-idle="FilePondPlaceholder" v-bind:allow-multiple="true" accepted-file-types="image/jpeg, image/png, image/jpg" v-bind:files="myFiles" v-on:init="handleFilePondInit"/>
               </div>
           </div>
       </div>
   </div>
</template>

<script setup>
    import SelectCountry from '@/components/fragment/Dropdowns/SelectCountry.vue';
    import vueFilePond from "vue-filepond";
    import "@assets/css/filepound.css";
    import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
    import FilePondPluginImagePreview from "filepond-plugin-image-preview";
    import QtyInput from '@/components/fragment/Inputs/QtyInput.vue';
    import { ref } from 'vue';

    const FilePond = vueFilePond(
        FilePondPluginFileValidateType,
        FilePondPluginImagePreview
    );

    let FilePondPlaceholder = `<p class="text-v_12  text-white ">Drop and drag</p>`;
    let amount = ref(0);
</script>