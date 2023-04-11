<template>
    <Page>
        <MainHeader>
            <template #title>
                <div>
                    <span>
                        Boards
                    </span>
                    <label class="btn mx-3" for="inviteModal">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" fill="#fff" width="10" height="10" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg> 
                        <span  class="text-white">Add New Board</span>  
                    </label>
                </div>
            </template>
        </MainHeader>
        <SectionVue>
            <div class="filters grid grid-cols-6">
                <div class="grid grid-cols-3 col-span-5">
                    <div class="w-full">
                        <input type="seach" placeholder="Search on boards" class="form-control search p-2 h-v_35px" v-model="search.name">
                    </div>
                </div>
            </div>
        </SectionVue>
        <SectionVue>
            <div class="min-h-v_65vh">
                <div class="w-100 flex justify-center pt-20"  v-if="loader">
                    <div class="sub_loader"></div>
                </div>
                <div class="grid grid-cols-12 gap-4" v-if="!loader">
                    <div class="col-span-3 bg-dark-300 h-v_85px rounded-sm">
                        <div class="w-full p-3">
                            <p class="font-bold text-v_15 ">Clients Board</p>
                            <div class="status mt-3">
                                <div class="avatar-group -space-x-2">
                                    <div class="avatar">
                                        <div class=" w-5 h-5 ">
                                            <img src="@assets/images/avatar/user5.jpg" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class=" w-5 h-5 bg-slate-700 ">
                                            <img src="@assets/images/avatar/user2.jpg" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class=" w-5 h-5 ">
                                            <img src="@assets/images/avatar/user3.jpg" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class=" w-5 h-5 ">
                                            <img src="@assets/images/avatar/user4.jpg" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class=" w-5 h-5 bg-secoundry-dark flex justify-center items-center">
                                            <span class="text-v_10 w-full h-full flex justify-center items-center">+9</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-3 bg-dark-300 h-v_85px rounded-sm">
                        <div class="w-full p-3">
                            <p class="font-bold text-v_15 ">Calling List</p>
                            <div class="status mt-3">
                                <div class="avatar-group -space-x-2">
                                    <div class="avatar">
                                        <div class=" w-5 h-5 ">
                                            <img src="@assets/images/avatar/user5.jpg" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class=" w-5 h-5 bg-slate-700 ">
                                            <img src="@assets/images/avatar/user2.jpg" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class=" w-5 h-5 ">
                                            <img src="@assets/images/avatar/user3.jpg" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class=" w-5 h-5 ">
                                            <img src="@assets/images/avatar/user4.jpg" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class=" w-5 h-5 bg-secoundry-dark flex justify-center items-center">
                                            <span class="text-v_10 w-full h-full flex justify-center items-center">+9</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           <Pagination :currentPage="1" :totalPages="10" @paginate="Paginate($event)"></Pagination>
        </SectionVue>
        <SectionVue>
          
        </SectionVue>
    </Page>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';

// Import Main Components 
import Page from '@/components/fragment/Pages/Page.vue';
import MainHeader from '@/components/fragment/MainHeader.vue';
import SectionVue from '@/components/fragment/Pages/Section.vue';
import Pagination from '@/components/fragment/Pages/Pagination.vue';

/*** Searching ***/

// Variables
let search = ref({
    name: "",
    page: 1
});

// Loader Variables
let loader = ref(true);
let loader_interval = ref(null);

// Actions
function SearchBoard() {
    loader.value = true;
    loader_interval = setTimeout(() => {
        loader.value = false;
    },1000);
}

function Paginate($page) {
    search.value.page = $page;
}

// Watchers 
watch(() => search,(newValue, oldValue) => {
    SearchBoard();
},{ deep: true });

// Life Cycle
onMounted(() => {
    loader_interval = setTimeout(() => {
        loader.value = false;
    },1000);
});
</script>