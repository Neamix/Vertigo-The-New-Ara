<template>
    <Page>
        <MainHeader>
            <template #title>
                <div>
                    <span>
                        Members
                    </span>
                    <label class="btn mx-3" for="inviteModal">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" fill="#fff" width="10" height="10" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg> 
                        <span  class="text-white">Add New Member</span>  
                    </label>
                </div>
            </template>
        </MainHeader>
        <SectionVue>
            <div class="filters d-flex justify-between grid grid-cols-6">
                <div class="grid grid-cols-3 col-span-3">
                    <div class="">
                        <Select :options="[ {string:'option1',value:1} , {string:'option2',value:2} ]" placeholder="All Roles" @selected="setFilterRole" :type="'role'"></Select>
                    </div>
                    <div class="mx-2">
                        <Select :options="[ {string:'option1',value:1} , {string:'option2',value:2} ]" placeholder="All Profiles" @selected="setFilterRole()" :type="'profile'"></Select>
                    </div>
                    <div class="mx-2">
                        <input type="seach" placeholder="Search on member" class="form-control search p-2 h-v_35px">
                    </div>
                </div>
            </div>
        </SectionVue>
        <SectionVue>
           <div class="">
                <div class=" grid grid-cols-4 gap-4 ">
                    <MemberCard v-for="member in members">
                        <template #name>
                            {{ shortName(member.name) }}
                        </template>
                        <template #email>
                            {{ member.email }}
                        </template>
                    </MemberCard>
            </div>
           </div>
           <Pagination :currentPage="1" :totalPages="10" @paginate="paginate($event)"></Pagination>
        </SectionVue>
    </Page>
</template>

<script setup>

// Import Main Components 
import Page from '../../components/fragment/Pages/Page.vue';
import MainHeader from '../../components/fragment/MainHeader.vue';
import SectionVue from '../../components/fragment/Pages/Section.vue';

// Import Fragments
import Select from '../../components/fragment/Dropdowns/Select.vue';
import MemberCard from '../../components/fragment/Cards/MemberCard.vue';
import Pagination from '../../components/fragment/Pages/Pagination.vue';
import { ref } from 'vue';
import { useMemberStore } from '../../stores/MembersStore';

/*** Variables ***/
let search =  ref({
    role_id: null,
    profile_id: null,
    name: null,
    page: 1
});

let loader = false;

let members = ref([]);

// Define Stores
let memberStore = useMemberStore();


/*** Functions ***/

// Store functions
memberStore.getMembers().then((response) => {
    members.value = response.data
});

// Emiter recivers
function paginate($page) {
    search.page = $page;
    console.log(search);
}

// Attributes
function shortName($name) {
    let subrtingname = $name.substring(0,15);
    let shortName = ($name.length > 15) ? subrtingname + '...' : subrtingname;
    return shortName;
}

</script>