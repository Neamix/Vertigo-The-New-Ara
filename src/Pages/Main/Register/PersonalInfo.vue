<template>
    <div class="min-h-screen w-full mx-auto">
        <div class="pages w-full min-h-v_55vh">
            <div class="page mt-10">
                <div class="grid grid-cols-2 gap-3 w-full">
                    <div class="form-group">
                        <label class=" my-3 block text-v_13 font-bold">
                            Your's Username
                        </label>
                        <input type="text" placeholder="Awesome Username" class="form-control w-full p-3 bg-dark-300" v-model="payload.name">
                        <p class="mb-1 error_name error"></p>
                    </div>
                    <div class="form-group w-full">
                        <label class=" my-3 block text-v_13 font-bold">
                            Your's Email
                        </label>
                        <input type="email" placeholder="awesome.email@me.com" class="form-control w-full p-3 bg-dark-300" v-model="payload.email">
                        <p class="mb-1 error_email error"></p>
                    </div>
                </div>
                <div class="form-group w-full mt-4">
                    <div class=" grid grid-cols-2 gap-2">
                        <div class="form-group w-full">
                            <label class=" my-3 block text-v_13 font-bold">
                                Your's Phone
                            </label>
                            <input type="tel" placeholder="Amazing Address" class="form-control w-full p-3 bg-dark-300" v-model="payload.phone">
                            <p class="mb-1 error_phone error"></p>
                        </div>
                    </div>
                </div>
                <div class="form-group w-full mt-4">
                    <div class=" grid grid-cols-2 gap-2">
                        <div class="form-group w-full">
                            <label class=" my-3 block text-v_13 font-bold">
                                Account Password
                            </label>
                            <input type="password" placeholder="Amazing Password" class="form-control w-full p-3 bg-dark-300" v-model="payload.password">
                            <p class="mb-1 error_password error"></p>
                        </div>
                        <div class="form-group w-full">
                            <label class=" my-3 block text-v_13 font-bold">
                                Re-Enter Password
                            </label>
                            <input type="password" placeholder="Amazing Password" class="form-control w-full p-3 bg-dark-300" v-model="payload.password_confirm">
                        </div>
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
            <button class="btn btn-primary flex items-center relative" @click="goToReviewAndCheckout()">
                <span v-if="! loading">Next: Review & Checkout </span>
                <span v-if="loading" class="loading absolute"></span>
                <i v-if="! loading" class="fa-solid fa-chevron-right text-v_10 mx-2 pt-0.5"></i>
            </button>
       </div>
   </div>
</template>

<script setup>
    import "@assets/css/filepound.css";
    import { useRegisterStore } from '@/stores/RegisterStore.js';
    import { useRouter, useRoute } from 'vue-router';
    import validation from "@/Helpers/localization/validation";
    import { onMounted, ref } from 'vue';

    /**  Routers  */
    let router = useRouter();
    let route  = useRoute();

    /** Register Store Container */
    let RegisterStore = useRegisterStore();
    let payload = RegisterStore.company.user;

    /** Loaders */
    let loading = ref(false);
    
    /** Set Active Bullet */
    RegisterStore.currentRegisterName = route.name;

    /** Go To Review And Checkout */
    function goToReviewAndCheckout() {
        let errors = validation(payload,{
            'name': ['required','min:3'],
            'email': ['required','email'],
            'password': ['required','confirm']
        });
        
        // Active loading loader
        loading = ref(true);

        // Remove old errors with in holders
        removeOldErrors();
        console.log(errors);
        if ( errors['errorsExist'] ) {
            displayErrors(errors['errorBag']);
        } else {
            RegisterStore.checkIfTheEmailInUse().then((response) => {
                let getUserWithSameEmail = response.data.data.userWithEmail;

                //If no user with same email go to next page else display error
                if ( ! getUserWithSameEmail ) {
                    RegisterStore.nextStep = "Checkout";
                    router.push({
                        name: 'Checkout'
                    });
                } else {
                    displayErrors({email: ["This email is used by another account"]});
                }
                
            });
        }

        loading = ref(false);
    }

    function displayErrors(errors)
    {
        let keys = Object.keys(errors);

        for ( var i = 0; i < keys.length; i++ ) {
            document.querySelector(`.error_${keys[i]}`).innerHTML = '';
            document.querySelector(`.error_${keys[i]}`).innerHTML = errors[keys[i]].join("<br>");
        }
    }

    function removeOldErrors() 
    {
        let errors_holder = document.querySelectorAll('.error');
        
        errors_holder.forEach((holder) => {
            holder.innerHTML = '';
        });
    }

    /** Redirect If The Prev Steps Uncompeleted */
    onMounted(() => {
        let next = RegisterStore.nextStep;

        if ( next != 'PersonalInfo' )
            router.push({
                name:  'CompanyInfo'
            })
    });
</script>