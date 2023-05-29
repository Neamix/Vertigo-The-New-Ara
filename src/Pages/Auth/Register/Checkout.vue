<template>
    <div class="min-h-screen w-full mx-auto">
        <!-- Start Saved Information -->
        <div class="form-section mt-10">
            <div class="mb-5">
                <h3 class="text-v_17 font-bold">Company Information</h3>
                <p class=" text-v_13 text-gray-500 ">Your company information will be used in contact you for all changes in this workstation</p>
            </div>
            <div class="grid grid-cols-2 gap-3 w-full">
                <div class="form-group">
                    <label class=" my-3 block text-v_13 font-bold">
                        Company name
                    </label>
                    <p class="text-v_12">  {{  payload.name  }} </p>
                </div>
                <div class="form-group w-full">
                    <label class="my-3 block text-v_13 font-bold">
                        Company Email
                    </label>
                    <p class="text-v_12"> {{  payload.email }} </p>
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
                    <p class="text-v_12"> {{  payload.description ?? 'Not Specified' }} </p>
                </div>
            </div>
            <div class="form-section w-full mt-10">
                <div class="mb-5">
                    <h3 class=" text-v_17 font-bold my-2">Personal Information</h3>
                    <p class=" text-v_13 text-gray-500 ">Your personal information will be used in daily authutications</p>
                </div>
                <div class=" grid grid-cols-2 gap-2">
                    <div class="form-group w-full">
                        <label class=" my-3 block text-v_13 font-bold">
                            Your Name
                        </label>
                        <p class="text-v_12"> {{  payload.user.name }} </p>
                    </div>
                    <div class="form-group w-full">
                        <label class=" my-3 block text-v_13 font-bold">
                            Your Email
                        </label>
                        <p class="text-v_12"> {{  payload.user.email}} </p>
                    </div>
                    <div class="form-group w-full">
                        <label class=" my-3 block text-v_13 font-bold">
                            Your Phone
                        </label>
                        <p class="text-v_12"> {{  payload.user.phone ?? 'Not Specified'}} </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Saved Information -->
        <!-- Start Billing Information -->
        <div class="form-section w-full mt-10">
            <div class="mb-5">
                <h3 class=" text-v_17 font-bold my-2">Billing Information</h3>
                <p class=" text-v_13 text-gray-500 ">In case you left billing email,name,phone empty we will use your company email and name as default</p>
            </div>
            <div class=" grid grid-cols-2 gap-2">
                <div class="form-group w-full">
                    <label class=" my-3 block text-v_13 font-bold">
                        Billing Name
                    </label>
                    <input type="text" placeholder="Amazing Name" class="form-control w-full p-3 bg-dark-300" ref="" v-model="payload.billing.name">
                </div>
                <div class="form-group w-full">
                    <label class=" my-3 block text-v_13 font-bold">
                        Billing Email
                    </label>
                    <input type="telephone" placeholder="Amazing Email" class="form-control w-full p-3 bg-dark-300" ref="" v-model="payload.billing.email">
                </div>
                <div class="form-group w-full">
                    <label class=" my-3 block text-v_13 font-bold">
                        Credit Card Details
                    </label>
                    <div class="payment_contaier bg-dark-300 p-3">
                        <div id="payment" class=" bg-transparent "></div>
                    </div>
                    <p class="mb-1 error error_payment"></p>
                </div>
                <div class="form-group w-full">
                    <label class=" my-3 block text-v_13 font-bold">
                        Billing Phone
                    </label>
                    <input type="phone" placeholder="Amazing Email" class="form-control w-full p-3 bg-dark-300" ref="" v-model="payload.billing.phone">
                </div>
            </div>
        </div>
        <!-- End Billing Information -->
        <!-- Start Register Footer -->
        <div class="footer flex justify-between my-10">
            <router-link :to="{name:'CompanyInfo'}">
                <button class="btn btn-primary flex items-center">
                    <i class="fa-solid fa-chevron-left text-v_10 mx-2 pt-0.5"></i>
                    <span>Back: Company information </span>
                </button>
            </router-link>
            <button class="btn btn-primary  items-center relative flex justify-center" @click="paymentProccess()" :disabled="loading">
                <div class="loader_text" :class="{'opacity-0': loading}">
                    <span>Submit Your Request</span>
                    <i class="fa-solid fa-chevron-right text-v_10 mx-2 pt-0.5"></i>
                </div>
                <div class="loading absolute" :class="{'opacity-0': !loading}"></div>
            </button>
       </div>
       <!-- End Register Footer -->
   </div>
</template>

<script setup>
    import "@assets/css/filepound.css";
    import { useRegisterStore } from '@/stores/RegisterStore.js';
    import { useRouter, useRoute } from 'vue-router';
    import { onMounted, ref } from 'vue';
    import {loadStripe} from '@stripe/stripe-js';

    /**  Routers  */
    let router = useRouter();

    /** Register Store Container */
    let RegisterStore = useRegisterStore();
    let payload = RegisterStore.company;
    let loading = ref(false);

    /** Payment */
    let stripe   = ref(null);
    let elements = ref(null);
    let cardElement = ref(null)

    async function paymentProccess() {
        // Initialize loader
        loading.value = true;

        // Remove old errors
        document.querySelector('.error_payment').innerHTML = '';

        // Verify the card
        stripe.value.createPaymentMethod("card",cardElement.value,{
            billing_details: { 
                name: this.payload.billing.name,
                email: this.payload.billing.email,
                phone: this.payload.billing.phone
            }
        }).then((response) => {
            if ( response.error ) {
                document.querySelector('.error_payment').innerHTML = response.error.message;
            } else {
                this.payload.billing.id = response.paymentMethod.id;
                registerNewCompany();
            }
        });     
    }

    /** Add new company */
    function registerNewCompany() {
        RegisterStore.registerNewCompany().then((response) => {
            loading.value = false;
            handlePaymentAction(response);
        });
    }
    
    /** Make action according to payment response */
    function handlePaymentAction(response) {
        let data = response.data.data.registerCompany;

        if ( data.status == 'Failed' ) {
            // In case of status failed display error 
            document.querySelector('.error_payment').innerHTML = data.message;
        } else {
            // Add token to localhost
            localStorage.setItem('token',token);

            // Reset user in auth store
            useAuthStore().resetUser();

            // Then redirect user to dashboard
            router.push({
                name:  'dashboard'
            })
        }
    }

    /** Redirect If The Prev Steps Uncompeleted */
    onMounted(async () => {
        let next = RegisterStore.nextStep;

        // Stripe Element
        stripe.value = await loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);
        elements.value = stripe.value.elements();

        // Define card
        cardElement.value = elements.value.create('card',{
            style: {
                base: {
                    color: "white",
                    padding: "0.75rem"
                }
            }
        });

        cardElement.value.mount('#payment');

        // Check if prev steps done
        if ( next != 'Checkout') {
            router.push({
                name:  'PersonalInfo'
            })
        }
    });

</script>