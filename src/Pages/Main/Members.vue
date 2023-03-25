<template>
    <Page>
        <MainHeader>
            <template #title>
                <div>
                    <span>
                        Members
                    </span>
                    <button class="btn mx-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" fill="#fff" width="10" height="10" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg> 
                        <span class="text-white">Add New Member</span>  
                    </button>
                </div>
            </template>
        </MainHeader>
        <div class="filters d-flex justify-between p-5 grid grid-cols-6">
            <div class="grid grid-cols-3 col-span-3">
                <Select class=" w-full pr-2">
                    <template #label>
                        <span>{{ search.role.placeholder }}</span>
                        <img src="@/assets/icons/chevron.svg" class="px-2" :class="{'active': !workspaces_dropdown}" alt="down">
                    </template>
                    <template #options>
                        <li class="dropdown-li" @click="addSearchRole('AllRoles','')">All Roles</li>
                        <li class="dropdown-li" @click="addSearchRole('Agents','1')">Agents</li>
                        <li class="dropdown-li" @click="addSearchRole('HR Specalist','2')">HR Specalist</li>
                    </template>
                </Select>
                <Select class="w-full pr-3">
                    <template #label>
                        <span>All Profiles</span>
                        <img src="@/assets/icons/chevron.svg" class="px-2" :class="{'active': !workspaces_dropdown}" alt="down">
                    </template>
                    <template #options>
                        <li class="dropdown-li">All Profiles</li>
                        <li class="dropdown-li">Agents Profile</li>
                        <li class="dropdown-li">HR Specalist Profile</li>
                    </template>
                </Select>
                <div class="mt-1">
                    <input type="search" placeholder="Search by name" class="form-control">
                </div>
            </div>
            <div class="col-span-3 flex justify-end">
                <Select class="pr-2">
                    <template #label>
                        <img src="@@/icons/export.svg" class="w-4" :class="{'active': !workspaces_dropdown}" alt="down">
                        <span class="text-white mt-1" for="exportModal">{{ count }} Export members</span>  
                    </template>
                    <template #options>
                        <li class="dropdown-li" @click="label='All Roles'">All Roles</li>
                        <li class="dropdown-li" @click="label ='Agents'">Agents</li>
                        <li class="dropdown-li">HR Specalist</li>
                    </template>
                </Select>
            </div>
            <div class="memebers_container px-1 my">
                Hello
            </div>
        </div>
    </Page>
</template>

<script>
// Import main components 
import Page from '../../components/fragment/Pages/Page.vue';
import MainHeader from '../../components/fragment/MainHeader.vue';

// Import fragments
import Select from '../../components/fragment/Dropdowns/Select.vue';
import ExportModal from '../../components/fragment/Modals/ExportModal.vue';

//Imports stores
import { mapStores,mapState, mapActions } from 'pinia';
import { useAuth } from '../../stores/AuthStore';
import locale from '@/Helpers/localization/locale';

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
            }
        }
    },
    components: {Page,MainHeader,Select,ExportModal},
    watch: {
        search: {
            handler: function(newValue) {
                alert("Person with ID:" + newValue.role.value + " modified")
            },
            deep: true
        }
    },
    methods: {
        ...mapActions(useAuth,['','api']),
        addSearchRole($placeholder,$value) {
            this.search.role.placeholder = $placeholder;
            this.search.role.value = $value;
        },
        addMember() {
            this.members.push({
                id: this.members.length + 1,
                name: this.memberName
            });
            console.log(this.members)
            this.memberName = '';
        }
    },
    mounted() {
        this.api();
        console.log(import.meta.env.VITE_APP_NAME)
        this.members.push( {
                    id: 1,
                    name: 'Jason'
                },
                {
                    id: 2,
                    name: 'Mark'
                })
    }
}

</script>