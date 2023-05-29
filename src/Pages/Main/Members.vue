<template>
      <SectionVue>
            <div class="filters d-flex justify-between grid grid-cols-6">
                <div class="grid grid-cols-3 col-span-3">
                    <div class="">
                        <Select :options="[ {string:'All Roles',value:0} , {string:'option1',value:1} , {string:'option2',value:2} ]" placeholder="All Roles" @selected="SetFilter($event)" :type="'role'"></Select>
                    </div>
                    <div class="mx-2">
                        <Select :options="[ {string:'All Profiles',value:0} , {string:'option1',value:1} , {string:'option2',value:2} ]" placeholder="All Profiles" @selected="SetFilter($event)" :type="'profile'"></Select>
                    </div>
                    <div class="mx-2">
                        <input type="seach" placeholder="Search on member" class="form-control search p-2 h-v_35px" v-model="search.name">
                    </div>
                </div>
            </div>
        </SectionVue>
        <SectionVue>
            <div class="min-h-v_65vh">
                <div class="w-100 flex justify-center pt-20"  v-if="loader">
                    <div class="sub_loader"></div>
                </div>
                <div class="grid grid-cols-4 gap-4" v-if="!loader">
                    <MemberCard v-for="member in members">
                        <template #name>
                            {{ ShortNameAttr(member.name) }}
                        </template>
                        <template #email>
                            {{ member.email }}
                        </template>
                        <template #actions>
                            <button class="tooltip" data-tip="Suspend User" @click="SuspendUserAction(member)">
                                <i class="fa-solid fa-lock text-v_12 mx-2"></i>
                            </button>
                            <button class="tooltip" data-tip="Delete User">
                                <i class="fa-regular fa-trash-can text-v_12" @click="DeleteUserAction(member)"></i>
                            </button>
                        </template>
                    </MemberCard>
                </div>
            </div>
           <Pagination :currentPage="1" :totalPages="10" @paginate="Paginate($event)"></Pagination>
        </SectionVue>
</template>

<script setup>
import { watch,onMounted,ref } from 'vue';

// Import Main Components 
import SectionVue from '../../components/fragment/Pages/Section.vue';

// Import Fragments
import Select from '../../components/fragment/Dropdowns/Select.vue';
import MemberCard from '../../components/fragment/Cards/MemberCard.vue';
import Pagination from '../../components/fragment/Pages/Pagination.vue';
import { useMemberStore } from '../../stores/MembersStore';
import Swal from 'sweetalert2/dist/sweetalert2';
import { useGlobalStore } from '../../stores/GlobalStore';

/*** Searching ***/

// Variables
let search =  ref({
    role_id: null,
    profile_id: null,
    name: null,
    page: 1
});

// Loader Variables
let loader = ref(true);
let loader_interval = ref(null);

// Actions
function SearchUser() {
    clearInterval(loader_interval);
    loader.value = true;
    loader_interval = setTimeout(() => {
        loader.value = false;
    },1000);
}

function Paginate($page) {
    search.value.page = $page;
}

/*** Members ***/
let members = ref([]);
let memberStore = useMemberStore();

// Store functions
memberStore.getMembers().then((response) => {
    members.value = response.data;
    loader.value = false;
});

// Actions
function SuspendUserAction(member) {
    Swal.fire({
        icon: "warning",
        title: "Are You Sure",
        text: `If you suspend ${member.name} he will be restricted from enter this workspace without any touch for any data belong to ${member.name} in this workspace`,
        confirmText: "confirm",
        showCancelButton: true,
        confirmButtonText: "Confirm"
    });
} 

function DeleteUserAction(member) {
    Swal.fire({
        icon: "warning",
        title: "Are You Sure",
        text: `If you delete ${member.name} he will be restricted from enter this workspace and delete any data belong to ${member.name} in this workspace`,
        confirmText: "confirm",
        showCancelButton: true,
        confirmButtonText: "Confirm"
    });
}

// Setters
function SetFilter(searchFilter) {
    if (searchFilter.type == 'profile')  {
        search.value.profile_id = searchFilter.option.value;
    }

    if (searchFilter.type == 'role') {
        search.value.role_id = searchFilter.option.value;
    }
}

// Attributes
function ShortNameAttr($name) {
    let subrtingname = $name.substring(0,15);
    let shortName = ($name.length > 15) ? subrtingname + '...' : subrtingname;
    return shortName;
}

// Watchers 
watch(() => search,(newValue, oldValue) => {
    SearchUser();
},{ deep: true });

// On Mounted 
onMounted(() => {
    useGlobalStore().page = 'Members'
})

</script>