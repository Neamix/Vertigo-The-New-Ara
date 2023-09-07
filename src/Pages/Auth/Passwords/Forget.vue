<template>
      <form autocomplete="off" class="sign-in-form" @submit.prevent="forgetPassword()">

        <div class="heading flex items-center my-10">
            <img src="@/assets/images/logos/fav.png" class=" w-12 " alt="vertigo" />
            <div class="pl-4">
                <h2 class=" text-black text-v_23 font-bold ">Forget Password</h2>
                <h6 class=" text-gray-400 text-v_12">
                Stablish your company?
                <router-link :to="{ name: 'CompanyInfo' }" class="text-gray-500" >
                    Register now
                </router-link>
                </h6>
            </div>
        </div>

        <div class="actual-form">
            <div class="input-wrap">
                <input type="email" minlength="4" class="form-control form-black bg-gray-100 w-full px-3 py-3 text-black" autocomplete="off" placeholder="Awesome Email" v-model="payload.email" />
                <p class="error_email error my-4"></p>
            </div>

            <LoaderButton :loading="signInLoader" class="w-full my-11 bg-dark">
                <template #text>
                    Send Forget Email
                </template>
            </LoaderButton>

            <h6 class=" text-gray-400 text-v_12">
                <router-link :to="{ name: 'login' }" class="text-gray-500" >
                    <i class="fa-solid fa-chevron-left text-v_10 mx-2 pt-0.5"></i>
                    <span>Back to login</span>
                </router-link>
            </h6>
        </div>
    </form>
</template>

<script setup>
import LoaderButton from "@/components/fragment/Buttons/LoaderButton.vue";
import { ref } from "vue";
import { useAuthStore } from "../../../stores/AuthStore";
import validation from "@/Helpers/localization/validation";
import router from "@/routes";

/** Forget Password */
let AuthStore = useAuthStore();
let signInLoader = ref(false);
let payload = ref({
  email: "",
});

/*** Validating the inputs */
function forgetPassword() {
    let errors = validation(payload.value,{
        'email': ['required','email'],
    });

    if ( errors['errorsExist'] ) {
        displayErrors(errors['errorBag']);
    } else {
        signInLoader.value = true;
        AuthStore.forgetPassword(payload.value).then((response) => {
            signInLoader.value = false;
            forgetHandler(response);
        });
    }
}

function forgetHandler(response) {
  let errors = response.data.errors;
  let data   = response.data.data;
  
  // Credintions Wrong
  if ( errors ) {
    document.querySelector(`.error_email`).innerHTML = '';
    document.querySelector(`.error_email`).innerHTML = 'Invalid Credintions';
  } 

  // Credintions Right
  else {
    let token = data.forgetPassword;
    
    // Fetch Forget Data
    AuthStore.forgetPayload.email = payload.value.email;
    AuthStore.forgetPayload.verification_id = response.data.data.forgetPassword;

    router.push({
      name: "otp"
    });

  }
}

/*** Display Error */
function displayErrors(errors)
{
    let keys = Object.keys(errors);

    for ( var i = 0; i < keys.length; i++ ) {
      document.querySelector(`.error_${keys[i]}`).innerHTML = '';
      document.querySelector(`.error_${keys[i]}`).innerHTML = errors[keys[i]].join("<br>");
    }
}

</script>