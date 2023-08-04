<template>
  <form autocomplete="off" class="sign-in-form" @submit.prevent="login()">
    <div class="heading flex items-center my-10">
      <img src="@/assets/images/logos/fav.png" class=" w-10 h-10" alt="vertigo" />
      <div class="pl-4">
        <h2 class=" text-black text-v_23 font-bold ">Welcome Back</h2>
        <h6 class=" text-gray-400 text-v_12">
          Stablish your company?
          <router-link :to="{ name: 'CompanyInfo' }" class="text-gray-500" >
          Register now
          </router-link>
        </h6>
      </div>
    </div>

    <div class="actual-form mt-10">
      <div class="input-wrap">
        <input type="email" minlength="4" class="form-control form-black bg-gray-100 w-full px-3 py-3" autocomplete="off" placeholder="Awesome Email" v-model="payload.email" />
        <p class="error_email error my-4"></p>
      </div>

      <div class="input-wrap my-6">
        <input type="password" minlength="4" class="form-control form-black bg-gray-100 w-full px-3 py-3 mt-2" autocomplete="off" placeholder="Awesome Password" v-model="payload.password"/>
        <p class="my-2 error_password error"></p>
      </div>

      <LoaderButton :loading="signInLoader" class="w-full my-11">
        <template #text>
          Sign In
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
import { onMounted, ref } from "vue";
import validation from "@/Helpers/localization/validation";
import { useAuthStore } from '@/stores/AuthStore.js';
import LoaderButton from "../../components/fragment/Buttons/LoaderButton.vue";
import router from "../../routes";

// Sign in
let AuthStore = useAuthStore();
let signInLoader = ref(false);
let payload = ref({
  email: "",
  password: "",
});

/*** Validating the inputs and login */
function login() {
  let errors = validation(payload.value,{
    'email': ['required','email'],
    'password': ['required']
  });

  if ( errors['errorsExist'] ) {
    displayErrors(errors['errorBag']);
  } else {
    signInLoader.value = true;

    // Try to login 
    AuthStore.login(payload.value).then((response) => {
      loginHandler(response);
    });
  }

}


/*** Authunticate the user */
function loginHandler(response) {
  let errors = response.data.errors ?? [];
  let data   = response.data.data.login;

  // Credintions Wrong
  if ( errors.length ) {
    // Take place if this email doesn't exist
    document.querySelector(`.error_email`).innerHTML = '';
    document.querySelector(`.error_email`).innerHTML = 'Invalid Credintions';
  } 

  // Credintions Right
  else {
    // Check Status 
    let token = data.token;

    // Add token to localhost
    localStorage.setItem('token',token);

    // Reset user in auth store
    useAuthStore().resetUser();

    // Redirect to dashboard
    router.push({
      name: "dashboard"
    });

  }

  signInLoader.value = false;
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

onMounted(() => {
  const plugin = document.createElement("script");
  plugin.setAttribute("src", "/src/assets/js/app.js");
  plugin.async = true;
  document.head.appendChild(plugin);
});
</script>
