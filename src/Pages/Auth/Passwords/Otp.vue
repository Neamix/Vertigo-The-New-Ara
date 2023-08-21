<template>
    <form autocomplete="off" class="sign-in-form" @submit.prevent="checkOtp()">

        <div class="heading flex items-center my-10">
            <img src="@/assets/images/logos/fav.png" class=" w-10 h-10" alt="vertigo" />
            <div class="pl-4">
                <h2 class=" text-black text-v_23 font-bold ">Verify Otp</h2>
                <h6 class=" text-gray-400 text-v_12">
                    We have sent otp to your email
                </h6>
            </div>
        </div>

        <div class="actual-form">
            <div class="input-wrap">
                <input type="number" minlength="4" class="form-control form-black bg-gray-100 w-full px-3 py-3 text-black" autocomplete="off" placeholder="Awesome Otp" v-model="payload.otp" />
                <p class="error_otp error my-4"></p>
            </div>

            <LoaderButton :loading="otpLoader" class="w-full my-11 bg-dark">
                <template #text>
                    Verify Otp
                </template>
            </LoaderButton>

            <h6 class=" text-gray-400 text-v_12">
                Forgotten your password or you login datails?
                <router-link :to="{ name: 'forget' }" class="text-gray-500" >
                Reset your password
                </router-link>
            </h6>
        </div>
  </form>
</template>

<script setup>
import LoaderButton from "@/components/fragment/Buttons/LoaderButton.vue";
import { onMounted, ref } from "vue";
import { useAuthStore } from "../../../stores/AuthStore";
import validation from "@/Helpers/localization/validation";
import router from "@/routes";

/** Forget Password */
let AuthStore = useAuthStore();
let otpLoader = ref(false);
let forgetPayload = AuthStore.forgetPayload;
let payload = ref({
    otp: "",
});

/*** Validating the inputs */
function checkOtp() {
    let errors = validation(payload.value,{
        'otp': ['required'],
    });

    if ( errors['errorsExist'] ) {
        displayErrors(errors['errorBag']);
    } else {
        otpLoader.value = true;
        AuthStore.VerifyOtp(payload.value).then((response) => {
            otpLoader.value = false;
            otpHandler(response);
        });
    }
}

function otpHandler(response) {
    let data   = response.data.data;

    // Credintions Wrong
    if ( data.checkOtp.status == 'Failed' ) {
        document.querySelector(`.error_otp`).innerHTML = '';
        document.querySelector(`.error_otp`).innerHTML = 'Otp is expired or invalid';
    } 

    // Credintions Right
    else {
        AuthStore.forgetPayload.otp = payload.value.otp;
        router.push({
            name: "reset"
        });

    }
}

/*** Display Error */
function displayErrors(errors) {
    let keys = Object.keys(errors);

    for ( var i = 0; i < keys.length; i++ ) {
        document.querySelector(`.error_${keys[i]}`).innerHTML = '';
        document.querySelector(`.error_${keys[i]}`).innerHTML = errors[keys[i]].join("<br>");
    }
}


onMounted(() => {
    if ( ! AuthStore.forgetPayload.email ) {
        router.push({
            'name': 'forget'
        });
    }
});
</script>