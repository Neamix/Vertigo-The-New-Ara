<template>
    <form autocomplete="off" class="sign-in-form" @submit.prevent>
      <div class="heading flex items-center my-10">
        <img src="@/assets/images/logos/fav.png" class=" w-10 h-10" alt="vertigo" />
        <div class="pl-4">
          <h2 class=" text-black text-v_23 font-bold ">Verifiy Your Account</h2>
        </div>
      </div>
  
      <div class="actual-form mt-10">
        <div class="input-wrap">
          <input type="text" class="form-control form-black bg-gray-100 w-full px-3 py-3" autocomplete="off" placeholder="Awesome Name" v-model="payload.name" />
          <p class="error_name error my-4"></p>
        </div>

        <div class="input-wrap my-6">
          <input type="password" class="form-control form-black bg-gray-100 w-full px-3 py-3" autocomplete="off" placeholder="Awesome Password" v-model="payload.password" />
          <p class="error_password error my-4"></p>
        </div>
  
        <div class="input-wrap my-6">
          <input type="password" class="form-control form-black bg-gray-100 w-full px-3 py-3 mt-2" autocomplete="off" placeholder="Awesome Password Confirmation" v-model="payload.password_confirm"/>
        </div>
        
        <p class="error_email"></p>
        <p class="error_token"></p>

        <LoaderButton :loading="verifyLoader" class="w-full my-11" @click="verifyAccount()">
          <template #text>
            Verifiy Account
          </template>
        </LoaderButton>
      
      </div>
    </form>
</template>
  
<script setup>
    import { onMounted, ref } from "vue";
    import validation from "@/Helpers/localization/validation";
    import { useMemberStore } from '@/stores/MembersStore';
    import LoaderButton from "@/components/fragment/Buttons/LoaderButton.vue";
    import router from "@/routes";
    import { useRoute } from "vue-router";
import path from "path";
  
    // Reset Password
    let MembersStore = useMemberStore();
    let verifyLoader = ref(false);
    let payload = ref({
      password: "",
      password_confirm: "",
      name: "",
      email: "",
      token: ""
    });

    /*** Verify Account */
    function verifyAccount() {
        let errors = validation(payload.value,{
          'name': ['required','min:3'],
          'email': ['required','email'],
          'password': ['required','confirm','min:8'],
          'token': ['required']
        });

        // IF not error exist send request
        if ( ! errors['errorsExist'] ) {
          MembersStore.verifyMembers(payload.value).then((repsonse) => {
            localStorage.setItem("token",repsonse.data.data.acceptInvitation.token)
            router.push({path:"/"});
          });
        }
    }
  
    onMounted(() => {
        let query  = useRoute().query;

        payload.value.email = query.email;
        payload.value.token = query.token;
        
        if ( ! payload.value.email || ! payload.value.token ) {
            router.push({path:"/404"});
        }
    });
</script>
  