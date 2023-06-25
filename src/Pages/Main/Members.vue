<template>

    <!-- Start: Filter Section -->
    <SectionVue>
        <div class="filters flex justify-between w-full">
            <div class="grid grid-cols-3 col-span-3">
                <div class="mr-2">
                    <input type="seach" placeholder="Search on member" class="form-control search p-2 h-v_35px" v-model="search.name" @input="SearchUser()">
                </div>
            </div>
            <div class="action_btns w-full">
                <button type="button" @click="sendInvitationIsOpen = true" class="btn ml-auto flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" fill="#fff" width="10" height="10" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg> 
                    <span  class="text-white">Add New Member</span>  
                </button>
            </div>
        </div>
    </SectionVue>
    <!-- End: Filter Section -->

    <!-- Start: Member Cort Section -->
    <SectionVue>
        <div class="min-h-v_65vh">
            <div class="w-100 flex justify-center pt-20"  v-if="loader">
                <div class="sub_loader"></div>
            </div>
            <div class="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4" v-if="!loader">
                <!-- Start: Member Cart -->
                <div class="member" v-for="member in memberStore.members" :key="member.id">
                    <MemberCard :member="member" :class="{'is_inactive_card': inActiveCards.indexOf(member.id) > -1}">
                        <template #name>
                            {{ ShortNameAttr(member.name) }}
                        </template>
                        <template #email>
                            {{ member.email }}
                        </template>
                        <template #actions>
                            <button class="tooltip" data-tip="Suspend User" @click="SuspendUserAction(member)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="member.is_suspend ? '#666464' : '#fff'" class="w-4 h-6 mx-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </button>
                            <button class="tooltip" data-tip="Delete User">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </template>
                    </MemberCard>
                </div>
               
                <!-- End: Member Cart -->
            </div>
            <div class="flex justify-center items-center w-full empty flex-col h-[50vh]" v-if="memberStore.members.length == 0 & !loader">
                <img src="@assets/icons/box.png" width="150">
                <p class=" text-v_23 font-bold">Wow, No body there</p>
            </div>
        </div>
        <!-- <Pagination :currentPage="pages.current" :totalPages="totalPages" @paginate="Paginate($event)"></Pagination> -->
        <!-- Start: Invitation Modal -->
        <TransitionRoot appear :show="sendInvitationIsOpen" as="template">
            <Dialog as="div" @close="sendInvitationIsOpen = false" class="relative z-10">
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center bg-dark-opacity-4">
                <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                    <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-dark-200">
                    <DialogTitle as="h3" class="text-lg leading-6 text-white uppercase font-bold">
                        Add new member
                    </DialogTitle>
                    <span class=" text-v_12 text-gray-300 ">Invitation email may take few minutes to reach</span>
                    <div class="mt-2">
                        <form class="invitation_form">
                            <input type="text" class="form-control bg-dark-300 w-full p-3 capitalize text-v_12" placeholder="Enter an awesome email" v-model="payload.email"/>
                        </form>
                        <p class="error error_email"></p>
                    </div>

                    <div class="mt-4 flex justify-end">
                        <button class="btn mx-3" @click="sendInvitationIsOpen = false;">close</button>
                        <LoaderButton :loading="sendInvitationLoader" @click="sendInvitationToMember()">
                            <template #text>
                                <div class="flex uppercase">
                                    <span>Send Invitaition Email</span>
                                </div>
                            </template>
                        </LoaderButton>
                        <p class="error error_email"></p>
                    </div>
                    </DialogPanel>
                </TransitionChild>
                </div>
            </div>
            </Dialog>
        </TransitionRoot>
        <!-- End: Invitation Modal -->
    </SectionVue>
    <!-- End: Member Cort Section -->
</template>

<script setup>
import { watch,onMounted,ref } from 'vue';

// Import Main Components 
import SectionVue from '../../components/fragment/Pages/Section.vue';

// Import Fragments
import MemberCard from '../../components/fragment/Cards/MemberCard.vue';
import Pagination from '../../components/fragment/Pages/Pagination.vue';
import { useMemberStore } from '../../stores/MembersStore';
import Swal from 'sweetalert2/dist/sweetalert2';
import { useGlobalStore } from '../../stores/GlobalStore';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import LoaderButton from "@/components/fragment/Buttons/LoaderButton.vue";
import validation from "@/Helpers/localization/validation";

/*** Searching ***/

// Variables
let search =  ref({
    role_id: null,
    profile_id: null,
    name: "",
    page: 1
});

// Loader Variables
let loader = ref(true);
let loader_interval = ref(null);

// Actions
function SearchUser() {
    loader.value = true;
    clearTimeout(loader_interval.value);
    loader_interval.value = setTimeout(() => {
        memberStore.getMembers(search.value).then((response) => {
            handlerMembers(response);
        });
    },1000)
}

function Paginate($page) {
    search.value.page = $page;
}

/*** Members ***/
let memberStore = useMemberStore();
let pages = ref({
    current: 1,
    total: 0
});

let totalPages = ref(1);
let sendInvitationLoader = ref(false);

const sendInvitationIsOpen = ref(false)

// Store functions
memberStore.getMembers(search.value).then((response) => {
    handlerMembers(response);
});

function handlerMembers(response) {
    memberStore.members = response.data.data.users.data;
    totalPages.value = response.data.data.users.paginatorInfo.lastPage;
    loader.value = false;
}


// Actions
let inActiveCards = ref([]);

/*** Suspend User */
function SuspendUserAction(member) {
    Swal.fire({
        icon: "warning",
        title: "Are You Sure",
        text: `If you suspend ${member.name} he will be restricted from enter this workspace without any touch for any data belong to ${member.name} in this workspace`,
        confirmText: "confirm",
        showCancelButton: true,
        confirmButtonText: "Confirm"
    }).then((response) => {
        if (response.isConfirmed) {
            memberStore.toggleSuspend().then((response) => {
                // Remove Member ID From In Active Cards
                console.log(response)
                let memberIndex = inActiveCards.value.indexOf(member.id);
                delete inActiveCards[memberIndex];
                console.log(response.data.data.toggleUserSuspended.status)

                // In Case No Error
                if ( response.data.data.toggleUserSuspended.status == 'Success' ) {
                    let memberLoadedIndex = memberStore.members.findIndex((x) => x.id == member.id);
                    memberStore.members[memberLoadedIndex].is_suspend = !memberStore.members[memberLoadedIndex].is_suspend;
                    console.log( memberStore.members)
                }
            });
        }
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

/** Send invitation to new member */
let newMemberEmail = ref(null);
let newMemberEmailLoader = ref(false); 
let payload = {
    email: "",
    name: ""
}

function sendInvitationToMember() {
    let errors = validation(payload,{
        'email': ['email'],
    });

    sendInvitationLoader.value = true;

    if ( errors['errorsExist'] ) {
        // Display Error
        sendInvitationLoader.value = false;
    } else {
        // Send Invitation
        memberStore.inviteMember(payload.email).then((response) => {
            handlerMemberInvites(response);
        });
    }
}

/** Handle User Invite */
function handlerMemberInvites (response) {
    sendInvitationLoader.value = false;

    // Check for errors
    let errors = response.data.errors;
    if ( errors ) {
        displayErrors(errors[0].extensions.validation);
    } else {
        sendInvitationIsOpen.value = false;
    }
}


function displayErrors(errors) {
    let keys = Object.keys(errors);
    let displayed_keys = [];
    
    // Remove Input from all keys
    keys.forEach((key) => {
        displayed_keys.push(key.replace('input.',''));
    });

    for ( var i = 0; i < displayed_keys.length; i++ ) {
        document.querySelector(`.error_${displayed_keys[i]}`).innerHTML = '';
        document.querySelector(`.error_${displayed_keys[i]}`).innerHTML = errors[keys[i]].join("<br>");
    }
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

// On Mounted 
onMounted(() => {
    useGlobalStore().page = 'Members'
})

</script>