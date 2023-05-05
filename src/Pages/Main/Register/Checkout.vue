<template>
    <div class="min-h-screen w-full mx-auto">
        <div class="pages w-full min-h-v_55vh">
            <div class="page mt-10">
                <h3 class=" text-v_17 font-bold ">Company Information</h3>
                <div class="grid grid-cols-2 gap-3 w-full">
                    <div class="form-group">
                        <label class=" my-3 block text-v_13 font-bold">
                            Company name
                        </label>
                        <p class=" text-v_12 font-bold ">  {{  payload.name  }} </p>
                    </div>
                    <div class="form-group w-full">
                        <label class=" my-3 block text-v_13 font-bold">
                            Company Email
                        </label>
                        <p class=" text-v_12 font-bold "> {{  payload.email }} </p>
                    </div>
                </div>
                <div class="form-group w-full mt-4">
                    <div class=" grid grid-cols-2 gap-2">
                        <div class="form-group w-full">
                            <label class=" my-3 block text-v_13 font-bold">
                                Company Country
                            </label>
                            <p class=" text-v_12 font-bold "> {{  payload.country }} </p>
                        </div>
                        <div class="form-group w-full">
                            <label class=" my-3 block text-v_13 font-bold">
                                Company Address
                            </label>
                            <p class=" text-v_12 font-bold "> {{  payload.address }} </p>
                        </div>
                        <div class="form-group w-full">
                            <label class=" my-3 block text-v_13 font-bold">
                                Total Seats
                            </label>
                            <p class=" text-v_12 font-bold "> {{  payload.seats }} Seat</p>
                        </div>
                        <div class="form-group w-full">
                            <label class=" my-3 block text-v_13 font-bold">
                                Total you will have to pay
                            </label>
                            <p class=" text-v_12 font-bold "> {{  payload.seats * 20 }}  $</p>
                        </div>
                    </div>
                </div>
                <div class="form-group w-full mt-4">
                    <div class="form-group w-full">
                        <label class=" my-3 block text-v_13 font-bold">
                            Company Description
                        </label>
                        <p class=" text-v_12 font-bold "> {{  payload.description ?? 'Not Specified' }} </p>
                    </div>
                </div>
                <h3 class=" text-v_17 font-bold my-2">Personal Information</h3>
                <div class="form-group w-full mt-4">
                    <div class=" grid grid-cols-2 gap-2">
                        <div class="form-group w-full">
                            <label class=" my-3 block text-v_13 font-bold">
                                Your Name
                            </label>
                            <p class=" text-v_12 font-bold "> {{  payload.user.name }} </p>
                        </div>
                        <div class="form-group w-full">
                            <label class=" my-3 block text-v_13 font-bold">
                                Your Email
                            </label>
                            <p class=" text-v_12 font-bold "> {{  payload.user.email}} </p>
                        </div>
                        <div class="form-group w-full">
                            <label class=" my-3 block text-v_13 font-bold">
                                Your Phone
                            </label>
                            <p class=" text-v_12 font-bold "> {{  payload.user.phone ?? 'Not Specified'}} </p>
                        </div>
                        <div id="payment" class=" bg-transparent "></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer flex justify-between my-10">
            <router-link :to="{name:'CompanyInfo'}">
                <button class="btn btn-primary flex items-center">
                    <i class="fa-solid fa-chevron-left text-v_10 mx-2 pt-0.5"></i>
                    <span>Back: Company information </span>
                </button>
            </router-link>
            <button class="btn btn-primary flex items-center" @click="registerNewCompany()">
                <span>Next: Pay {{  payload.seats * 20 }} $ </span>
                <i class="fa-solid fa-chevron-right text-v_10 mx-2 pt-0.5"></i>
            </button>
       </div>
   </div>
</template>

<script setup>
    import "@assets/css/filepound.css";
    import { useRegisterStore } from '@/stores/RegisterStore.js';
    import { useRouter, useRoute } from 'vue-router';
    import { onMounted } from 'vue';
    import {loadStripe} from '@stripe/stripe-js';

    /**  Routers  */
    let router = useRouter();
    let route  = useRoute();

    /** Register Store Container */
    let RegisterStore = useRegisterStore();
    let payload = RegisterStore.company;

    /** Add new company */
    function registerNewCompany() {
        RegisterStore.registerNewCompany().then((response) => {
            // alert('registered');
        });
    }

    /** Redirect If The Prev Steps Uncompeleted */
    onMounted(async () => {

        const stripe = await loadStripe("{{ env('STRIPE_KEY') }}");
        const elements = stripe.elements();
        const cardElement = elements.create('card');
        cardElement.mount('#payment');

        let next = RegisterStore.nextStep;
        if ( next != 'PersonalInfo' )
            router.push({
                name:  'PersonalInfo'
            })
    });

</script>