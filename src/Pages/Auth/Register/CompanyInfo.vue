<template>
    <div class="min-h-screen w-full">
        <div class="pages w-full min-h-v_55vh">
            <div class="page mt-10">
                <div class="grid grid-cols-2 gap-3 w-full">
                    <div class="form-group">
                        <label class=" my-3 block text-v_13 font-bold">
                            Company Name
                        </label>
                        <input type="name" placeholder="Awesome Company" class="form-control w-full p-3 bg-dark-300" ref="input" v-model="payload.name">
                        <p class="mb-1 error_name error"></p>
                    </div>
                    <div class="form-group w-full">
                        <label class=" my-3 block text-v_13 font-bold">
                            Company Email
                        </label>
                        <input type="email" placeholder="awesomeEmail@company.com" class="form-control w-full p-3 bg-dark-300" ref="" v-model="payload.email">
                        <p class="mb-1 error_email error"></p>
                    </div>
                </div>
                <div class="form-group w-full mt-4">
                    <div class=" grid grid-cols-3 gap-2">
                        <div class="w-100">
                            <label class=" my-3 block text-v_13 font-bold">
                                Company's Country
                            </label>
                            <SelectCountry class="w-full" v-model="payload.country"/>
                            <p class="my-1 error error_country error"></p>
                        </div>
                        <div class="form-group w-full col-span-2">
                            <label class=" my-3 block text-v_13 font-bold">
                                Company Address
                            </label>
                            <input type="email" placeholder="Amazing Address" class="form-control w-full p-3 bg-dark-300" ref="" v-model="payload.address">
                            <p class="mb-1 error_address error"></p>
                        </div>
                        <div class="w-100">
                            <label class=" my-3 block text-v_13 font-bold">
                                How many seats you want ? 
                                <span class=" text-gray-500 ">20$ per seat</span>
                            </label>
                            <QtyInput :amount="1" :min="1" @updateAmount="TotalSeats($event)"></QtyInput>
                            <p class="mb-1 error_seats error"></p>
                        </div>
                    </div>
                </div>
                <div class="form-group w-full mt-4">
                    <label class=" my-3 block text-v_13 font-bold">
                        Company Description
                    </label>
                    <textarea class="w-full form-control bg-dark-300 p-2" rows="5" v-model="payload.description"></textarea>
                </div>
            </div>
        </div>
        <div class="footer flex justify-end my-10">
            <button class="btn btn-primary flex items-center" @click="goToPersonalInfo()">
                <span>Next: Personal information </span>
                <i class="fa-solid fa-chevron-right text-v_10 mx-2 pt-0.5"></i>
            </button>
       </div>
   </div>
</template>

<script setup>
    import SelectCountry from '@/components/fragment/Dropdowns/SelectCountry.vue';
    import "@assets/css/filepound.css";
    import QtyInput from '@/components/fragment/Inputs/QtyInput.vue';
    import validation from '@/Helpers/localization/validation.js';
    import { useRegisterStore } from '@/stores/RegisterStore.js';
    import { useRouter, useRoute } from 'vue-router';

    /**  Routers  */
    let router = useRouter();
    let route  = useRoute();

    /** Register Store Container */
    let RegisterStore = useRegisterStore();
    let payload = RegisterStore.company;
    
    /** Set Active Bullet */
    RegisterStore.currentRegisterName = route.name;


    function TotalSeats($amount) {
        payload.seats = $amount;
    }


    /** Validate & Go To Next Page */
    function goToPersonalInfo()
    {
        let errors = validation(payload,{
            'name': ['required','min:3'],
            'email': ['required'],
            'seats': ['required','integer'],
            'country': ['required'],
            'address': ['required']
        });

        if ( errors['errorsExist'] ) {
            displayErrors(errors['errorBag']);
        } else {
            RegisterStore.nextStep = "PersonalInfo";
            router.push({
                name: 'PersonalInfo'
            });
        }
    }

    function displayErrors(errors)
    {
        let keys = Object.keys(errors);
        
        for ( var i = 0; i < keys.length; i++ ) {
            document.querySelector(`.error_${keys[i]}`).innerHTML = '';
            document.querySelector(`.error_${keys[i]}`).innerHTML = errors[keys[i]].join("<br>");
        }
    }
</script>