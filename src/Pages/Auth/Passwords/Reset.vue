<template>
    <form autocomplete="off" class="sign-in-form" @submit.prevent="reset()">
      <div class="heading flex items-center my-10">
        <img src="@/assets/images/logos/fav.png" class=" w-10 h-10" alt="vertigo" />
        <div class="pl-4">
          <h2 class=" text-black text-v_23 font-bold ">Reset Password</h2>
          <h6 class=" text-gray-400 text-v_12">
            Rememberd your password?
            <router-link :to="{ name: 'login' }" class="text-gray-500" >
            Sign in now
            </router-link>
          </h6>
        </div>
      </div>
  
      <div class="actual-form mt-10">
        <div class="input-wrap">
          <input type="password" class="form-control form-black bg-gray-100 w-full px-3 py-3" autocomplete="off" placeholder="Awesome Password" v-model="payload.password" />
          <p class="error_password error my-4"></p>
        </div>
  
        <div class="input-wrap my-6">
          <input type="password" class="form-control form-black bg-gray-100 w-full px-3 py-3 mt-2" autocomplete="off" placeholder="Awesome Password Confirmation" v-model="payload.password_confirm"/>
        </div>
  
        <LoaderButton :loading="resetLoader" class="w-full my-11">
          <template #text>
            Reset Password
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
    import LoaderButton from "@/components/fragment/Buttons/LoaderButton.vue";
    import router from "@/routes";
  
    // Reset Password
    let AuthStore = useAuthStore();
    let resetLoader = ref(false);
    let payload = ref({
      password: "",
      password_confirm: "",
    });
  
    /*** Validating the inputs and login */
    function reset() {
        let errors = validation(payload.value,{
          'password': ['required','confirm','min:8']
        });
    
        if ( errors['errorsExist'] ) {
          displayErrors(errors['errorBag']);
        } else {
          resetLoader.value = true;
          AuthStore.forgetPayload.password = payload.value.password;

          AuthStore.ResetPassword().then((response) => {
            resetHandler(response);
          });
        }
    
    }
    
    
    function resetHandler(response) {
      let errors = response.data.errors;
      let data   = response.data.data;

      // Credintions Wrong
      if ( errors ) {
        document.querySelector(`.error_password`).innerHTML = '';
        document.querySelector(`.error_password`).innerHTML = 'Invalid Credintions';
      } 
  
      // Credintions Right
      else {
        let token = data.resetPassword.token;
    
        // Add token to localhost
        localStorage.setItem('token',token);
    
        // Reset user in auth store
        useAuthStore().resetUser();
        
        router.push({
          name: "dashboard"
        });
      }
  
      resetLoader.value = false;
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
      if  (  
        ! useAuthStore().forgetPayload.email || 
        ! useAuthStore().forgetPayload.verification_id || 
        ! useAuthStore().forgetPayload.otp
      ) {
        router.push({
          'name': 'forget'
        });
      }
    });
  </script>
  