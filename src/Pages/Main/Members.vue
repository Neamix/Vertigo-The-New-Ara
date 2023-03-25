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
                        <span>All Roles</span>
                        <img src="../../../src/assets/icons/chevron.svg" class="px-2" :class="{'active': !workspaces_dropdown}" alt="down">
                    </template>
                    <template #options>
                        <li class="dropdown-li">All Roles</li>
                        <li class="dropdown-li">Agents</li>
                        <li class="dropdown-li">HR Specalist</li>
                    </template>
                </Select>
                <Select class="w-full pr-3">
                    <template #label>
                        <span>All Profiles</span>
                        <img src="../../../src/assets/icons/chevron.svg" class="px-2" :class="{'active': !workspaces_dropdown}" alt="down">
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
                <button class="btn">
                    <img src="../../assets/icons/export.svg" class=" w-4 mr-2">
                    <span class="text-white mt-1">{{ count }} Export members</span>  
                </button>
            </div>
        </div>
    </Page>
</template>

<script>
import Page from '../../components/fragment/Pages/Page.vue';
import MainHeader from '../../components/fragment/MainHeader.vue';
import Select from '../../components/fragment/Dropdowns/Select.vue';
import { mapStores,mapState, mapActions } from 'pinia';
import { useAuth } from '../../stores/AuthStore';

export default {
    components: {Page,MainHeader,Select},
    computed: {
    },
    methods: {
        ...mapActions(useAuth,['','api'])
    },
    mounted() {
        this.api();
    }
}

</script>