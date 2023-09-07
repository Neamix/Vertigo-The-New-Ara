<template>

    <!-- Start: Filter Section -->
    <SectionVue>
        <div class="filters flex justify-between w-full">
            <div class="grid grid-cols-3 col-span-3">
                <div class="mr-2">
                    <input type="seach" placeholder="Search on member" class="form-control search p-2 h-v_35px" v-model="search.name" @input="SearchUser()">
                </div>
            </div>
            <div class="action_btns w-full justify-end  flex" v-if=" auth.is_rooted ">
               <div class="flex">
                    <LoaderButton :loading="sendInvitationLoader" @click="sendInvitationIsOpen = true" class="mx-2 bg-dark">
                        <template #text>
                            <div class="flex uppercase">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" fill="#fff" width="10" height="10" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg> 
                                <span  class="text-white">Add New Member</span>  
                            </div>
                        </template>
                    </LoaderButton>
                    <LoaderButton :loading="exportingLoader" @click="sendInvitationIsOpen = true" class="mx-2 bg-dark">
                        <template #text>
                            <div class="flex uppercase">
                                <svg width="18" height="18" stroke="#fff" fill="#fff" class="mr-2" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke="#fff" d="M18.3286 14.8286C19.4724 13.9287 20.3072 12.6946 20.717 11.2982C21.1268 9.90168 21.0911 8.4122 20.615 7.03694C20.1388 5.66168 19.2459 4.46902 18.0603 3.62489C16.8748 2.78077 15.4556 2.32715 14.0002 2.32715C12.5449 2.32715 11.1257 2.78077 9.94016 3.62489C8.75461 4.46902 7.86164 5.66168 7.38549 7.03694C6.90933 8.4122 6.87367 9.90168 7.28346 11.2982C7.69325 12.6946 8.52812 13.9287 9.67191 14.8286C7.712 15.6138 6.00191 16.9161 4.72395 18.5968C3.44599 20.2775 2.64806 22.2734 2.41524 24.3719C2.39839 24.5251 2.41188 24.6801 2.45494 24.8281C2.498 24.9761 2.56979 25.1142 2.6662 25.2344C2.86093 25.4773 3.14415 25.6329 3.45357 25.6669C3.76299 25.7009 4.07326 25.6107 4.31612 25.4159C4.55898 25.2212 4.71454 24.938 4.74857 24.6286C5.00476 22.348 6.09221 20.2417 7.80316 18.7122C9.51412 17.1826 11.7286 16.3371 14.0236 16.3371C16.3185 16.3371 18.533 17.1826 20.244 18.7122C21.9549 20.2417 23.0424 22.348 23.2986 24.6286C23.3303 24.9152 23.4671 25.18 23.6825 25.3717C23.898 25.5635 24.1768 25.6686 24.4652 25.6669H24.5936C24.8994 25.6317 25.1789 25.4771 25.3712 25.2367C25.5635 24.9963 25.653 24.6897 25.6202 24.3836C25.3863 22.2791 24.5841 20.278 23.2996 18.5948C22.015 16.9116 20.2966 15.6096 18.3286 14.8286ZM14.0002 14.0002C13.0773 14.0002 12.175 13.7265 11.4076 13.2138C10.6402 12.701 10.042 11.9721 9.6888 11.1194C9.33559 10.2667 9.24318 9.32838 9.42324 8.42314C9.60331 7.51789 10.0478 6.68637 10.7004 6.03373C11.3531 5.38108 12.1846 4.93663 13.0898 4.75656C13.9951 4.5765 14.9334 4.66891 15.7861 5.02212C16.6388 5.37533 17.3677 5.97347 17.8804 6.7409C18.3932 7.50833 18.6669 8.41058 18.6669 9.33356C18.6669 10.5712 18.1752 11.7582 17.3001 12.6334C16.4249 13.5086 15.2379 14.0002 14.0002 14.0002Z" fill="#fff"/>
                                </svg>
                                <span  class="text-white mt-1">Export Monitoring Sheet</span>  
                            </div>
                        </template>
                    </LoaderButton>
                    <button type="button" @click="pendingModel = true" class="btn  flex mx-2" v-if="auth.is_root">
                        <p  class="text-white">
                            <span class="p-2">{{ pendingEmails.length }}</span>
                            <span>Pending Requests</span>
                        </p>  
                    </button>
               </div>
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
                <!-- Start: Member Card -->
                <div class="member" v-for="member in memberStore.members" :key="member.id">
                    <MemberCard :member="member" :class="{'disabled_div': inActiveCards.indexOf(member.id) > -1}" class="position-relative">
                        <template #name>
                            {{ ShortNameAttr(member.name) }}
                        </template>
                        <template #email>
                            {{ member.email }}
                        </template>
                        <template #actions v-if="auth.is_rooted">
                            <button class="tooltip" data-tip="Suspend User" @click="SuspendUserAction(member)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="member.is_suspend ? '#666464' : '#fff'" class="w-4 h-6 mx-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </button>
                            <button class="tooltip" data-tip="Delete User" @click="DeleteUserAction(member)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </template>
                    </MemberCard>
                </div>
            </div>
            <!-- End: Member Card -->


            
            <!-- Start: Empty Members -->
            <div class="flex justify-center items-center w-full empty flex-col h-[50vh]" v-if="memberStore.members.length == 0 & !loader">
                <p class="mt-2 text-center">
                    <span class="text-gray-500 text-v_20">Wow, no one here</span>
                    <span class="block text-v_16" v-if=" auth.is_rooted ">Invite new mates? </span>
                </p>
                <button type="button" @click="sendInvitationIsOpen = true" class="btn  flex mt-4" v-if=" auth.is_rooted ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" fill="#fff" width="10" height="10" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg> 
                    <span  class="text-white">Add New Member</span>  
                </button>
            </div>
            <!-- End: Empty Members -->
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
                            <input type="text" class="form-control bg-dark-300 w-full p-3 text-v_12" placeholder="Enter an awesome email" v-model="payload.email"/>
                        </form>
                        <p class="error error_email"></p>
                    </div>

                    <div class="mt-4 flex justify-end">
                        <button class="btn mx-3" @click="sendInvitationIsOpen = false;">close</button>
                        <LoaderButton :loading="sendInvitationLoader" @click="sendInvitationToMember()" class=" bg-dark ">
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

        <!-- Start: Exporting Modal -->
        <TransitionRoot appear :show="exportMonitoringSheet" as="template">
            <Dialog as="div" @close="exportMonitoringSheet = false" class="relative z-10">
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center bg-dark-opacity-4">
                <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                    <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-dark-200">
                        <DialogTitle as="h3" class="px-3">
                            <p class="text-lg leading-6 text-white uppercase font-bold">Export Monitoring Sheet</p>
                            <span class=" text-v_12 text-gray-300 ">Exporting maybe take some minites</span>
                        </DialogTitle>
                        <div class="mt-2">
                            <div class="p-3 rounded-md text-v_14  cursor-pointer" :class="{' bg-dark-400 ': exportDuration == 1}" @click="exportDuration = 1">
                                <span>This month</span>
                                <span class="block text-gray-500 text-v_12 font-bold">From 01 {{  calculateDurationOfExporting(0)  }} to now</span>
                            </div>
                            <div class="p-3 rounded-md text-v_14  cursor-pointer" :class="{'bg-dark-400': exportDuration == 2}" @click="exportDuration = 2">
                                <span>From last month to now</span>
                                <span class="block text-gray-500 text-v_12 font-bold">From 01 {{  calculateDurationOfExporting(1)  }} to now</span>
                            </div>
                            <div class="p-3 rounded-md text-v_14  cursor-pointer" :class="{'bg-dark-400': exportDuration == 3}" @click="exportDuration = 3">
                                <span>From last two month to now</span>
                                <span class="block text-gray-500 text-v_12 font-bold">From 01 {{  calculateDurationOfExporting(2)  }} to now</span>
                            </div>
                        </div>

                        <div class="mt-4 flex justify-end">
                            <button class="btn mx-3" @click="exportMonitoringSheet = false;">close</button>
                            <LoaderButton :loading="exportingLoader" @click="exportSheet()" class=" bg-dark ">
                                <template #text>
                                    <div class="flex uppercase">
                                        <span>Export Monitoring Sheet</span>
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
        <!-- End: Exporting Modal -->

        <!-- Start: Exporting Modal -->
        <TransitionRoot appear :show="pendingModel" as="template">
            <Dialog as="div" @close="pendingModel = false" class="relative z-10">
            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center bg-dark-opacity-4">
                <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                    <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-dark-200">
                        <DialogTitle as="h3" class="px-3">
                            <p class="text-lg leading-6 text-white uppercase font-bold">Pending Requests</p>
                        </DialogTitle>
                        <DialogPanel class="px-3">
                            <div class="requests">
                                <TransitionGroup tag="div" name="list" class="w-full h-full flex justify-center items-center">
                                    <div class="w-full mt-2 h-60 overflow-y-auto">
                                        <div class="mt-4 w-full" v-for="pendingEmail in pendingEmails">
                                            <PendingCard :email="pendingEmail.email" :id="pendingEmail.id" :emailsUnderActions="pendingEmailsUnderActions" @deletePendingRequest="deleteRequest($event)"></PendingCard>
                                        </div>
                                        <div class="empty_pending w-full h-full flex justify-center items-center" v-if="pendingEmails.length == 0">
                                            <div class="text-center">
                                                <p>Hmm,Nothing here</p>
                                                <p class="text-v_14 text-gray-500">No pending requests exist on your workspace</p>
                                            </div>
                                        </div>
                                    </div>
                                </TransitionGroup>
                            </div>
                        </DialogPanel>
                        <div class="mt-4 flex justify-end">
                            <button class="btn mx-3" @click="exportMonitoringSheet = false;">close</button>
                            <p class="error error_email"></p>
                        </div>
                    </DialogPanel>
                </TransitionChild>
                </div>
            </div>
            </Dialog>
        </TransitionRoot>
        <!-- End: Exporting Modal -->
    </SectionVue>
    <!-- End: Member Cort Section -->
</template>

<script setup>
import { onMounted,ref } from 'vue';

// Import Main Components 
import SectionVue from '@/components/fragment/Pages/Section.vue';
import PendingCard from  '@/components/fragment/Cards/PendingCard.vue';
import MemberCard from '@/components/fragment/Cards/MemberCard.vue';

// Import Stores
import { useMemberStore } from '@/stores/MembersStore';
import { useGlobalStore } from '@/stores/GlobalStore';
import { useAuthStore } from '@/stores/AuthStore';

// Import Fragments
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle} from '@headlessui/vue';
import LoaderButton from "@/components/fragment/Buttons/LoaderButton.vue";
import validation from "@/Helpers/localization/validation";

// Toast 
import 'vue3-toastify/dist/index.css';
import { toast } from 'vue3-toastify';

// Swal
import Swal from 'sweetalert2/dist/sweetalert2';

/*** Loader variables */
let loader = ref(true);
let loader_interval = ref(null);

/*** User Filters */
let search =  ref({
    role_id: null,
    profile_id: null,
    name: "",
    page: 1
});

function SearchUser() {
    loader.value = true;
    clearTimeout(loader_interval.value);
    loader_interval.value = setTimeout(() => {
        memberStore.getMembers(search.value).then((response) => {
            handlerMembers(response);
        });
    },1000)
}

/*** Auth Data */
let auth = useAuthStore().user;

/*** Paginate */
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
    let text = (!member.is_suspend) ? `If you suspend ${member.name} he will be restricted from enter this workspace without any touch for any data belong to ${member.name} in this workspace` : `If you unsuspend ${member.name} he will be able to re gain his access on this workspace`;
    Swal.fire({
        icon: "warning",
        title: "Are You Sure",
        text: text,
        confirmText: "confirm",
        showCancelButton: true,
        confirmButtonText: "Confirm"
    }).then((response) => {
        if (response.isConfirmed) {
            inActiveCards.value.push(member.id);
            memberStore.toggleSuspend(member.id).then((response) => {
                // Remove Member ID From In Active Cards
                let memberIndex = inActiveCards.value.indexOf(member.id);
                inActiveCards.value.splice(memberIndex,1);

                // Alert user              
                Swal.fire({
                    toast: true,
                    position: 'bottom-end',
                    icon: "success",
                    title: "Member Suspended",
                    text: `${member.name} has been ${ member.is_suspend ? 'unsuspend' : 'suspended' } from workspace`,
                    timer: 3000,
                    confirmText: "confirm",
                    showCancelButton: false,
                    showConfirmButton:false
                })

                // In Case No Error
                if ( response.data.data.toggleUserSuspended.status == 'Success' ) {
                    let memberLoadedIndex = memberStore.members.findIndex((x) => x.id == member.id);
                    memberStore.members[memberLoadedIndex].is_suspend = !memberStore.members[memberLoadedIndex].is_suspend;
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
    }).then((response) => {
        if (response.isConfirmed) {
            inActiveCards.value.push(member.id);
            memberStore.removeMember(member.id).then((response) => {
                // Alert user              
                Swal.fire({
                    toast: true,
                    position: 'bottom-end',
                    icon: "success",
                    title: "Member Removed",
                    text: `${member.name} has been removed from workspace`,
                    confirmText: "confirm",
                    showCancelButton: false,
                    showConfirmButton:false
                })
            });
        }
    });
}

/** Send invitation to new member */
let payload = ref({
    email: "",
})

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
        memberStore.inviteMember(payload.value.email).then((response) => {
            handlerMemberInvites(response);
        });
    }
}

/** Handle User Invite */
function handlerMemberInvites (response) {
    sendInvitationLoader.value = false;
    payload.value.email = '';

    // Check for errors
    let errors = response.data.errors;

    if ( errors ) {
        // Display Errors
        displayErrors(errors[0].extensions.validation);
    } else {
        let request = response.data.data.inviteMember;
        sendInvitationIsOpen.value = false;
        pendingEmails.value.push(request);
        toast.success('Invitation has been sent', {
            theme: 'dark',
            autoClose: 10000,
            position: toast.POSITION.BOTTOM_RIGHT,
        });
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

/*** Export Members */
let exportMonitoringSheet = ref(false);
let exportDuration  = ref(1);
let exportingLoader = ref(false);

/*** Calculate Duration Of Exporting */
function calculateDurationOfExporting(durationMonth) {
    let now = new Date();
    now.setMonth(now.getMonth() - durationMonth);
    return now.toLocaleString('default',{month: 'long'});
}

/** Send Exporting Request */
function exportSheet() {
    exportingLoader.value = true;
    memberStore.exportMembers(exportDuration.value,search.value).then((response) => {
        let path = response.data.data.exportMonitoringSheet.path;
        let a = document.createElement('a');
        a.href = path;
        a.download = 'vertigo_users_monitor_sheet.xlsx';
        document.body.appendChild(a);
        a.click();
        // Add Extra Inteval 
        setTimeout(() => {
            exportingLoader.value = false;
        },2000);
    });
}

/*** Get Pending Requests */
let pendingModel = ref(false);
let pendingEmails = ref([]);
let pendingEmailsUnderActions = ref([]);

function pendingRequests() {
    memberStore.pendingRequests().then(function (response) {
        pendingEmails.value = response.data.data.pendingMembers;
    });
}

/*** Delete Request */
function deleteRequest(id) {
    pendingEmailsUnderActions.value.push(id);
    memberStore.deletePendingRequests(id).then(function (response) {
        let requestIndex = pendingEmails.value.findIndex((x) => {
            return x.id == id
        });

        pendingEmails.value.splice(requestIndex,1);
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

// On Mounted 
onMounted(() => {
    useGlobalStore().page = 'Members';
    pendingRequests();
});

</script>