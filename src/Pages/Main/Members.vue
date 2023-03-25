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
           <div class=" grid grid-cols-4 ">
                <MemberCard></MemberCard>
           </div>
        </SectionVue>
    </Page>
</template>

<script>
// Import main components 
import Page from '../../components/fragment/Pages/Page.vue';
import MainHeader from '../../components/fragment/MainHeader.vue';
import SectionVue from '../../components/fragment/Pages/Section.vue';

// Import fragments
import Select from '../../components/fragment/Dropdowns/Select.vue';
import MemberCard from '../../components/fragment/Cards/MemberCard.vue';
import ExportModal from '../../components/fragment/Modals/ExportModal.vue';

//Imports stores
import { mapStores,mapState, mapActions } from 'pinia';
import { useAuth } from '../../stores/AuthStore';

export default {
    data: () => {
        return {
            memberName: '',
            members: [],
            search: {
                role: {
                    placeholder: 'All Roles',
                    value: ''
                }
            },
        }
    },
    components: {
        Page,
        MainHeader,
        Select,
        ExportModal,
        SectionVue,
        MemberCard
    },
    watch: {
        search: {
            handler: function(newValue) {

            },
            deep: true
        }
    },
    methods: {
        closeModal($id) {
            document.getElementById($id).checked = false;
        },


        // Search 
        addSearchRole($placeholder,$value) {
            this.search.role.placeholder = $placeholder;
            this.search.role.value = $value;
        },

        setFilterRole(role) {
            this.search.role = role.options
        },
    },
    mounted() {
        console.log(import.meta.env.VITE_BACKEND_URL)
    }
}

</script>