<template>
    <Page>
        <MainHeader>
            <template #title>
                Dashboard
            </template>
        </MainHeader>
        <div class="grid grid-cols-4 gap-2 border-b-2 rounded-none border_divider">
            <SmallCard class="col-span-1 border-r-2 rounded-none border_divider">
                <template #title>
                    <span>Total Widgets</span>
                    <img src="../../assets/images/icons/widgets.png" alt="widget">
                </template>
                <template #content>
                    <p class="text-v_12 text-gray-500 ">10 Widgets</p>
                </template>
            </SmallCard>
            <SmallCard class="col-span-1 border-r-2 rounded-none border_divider">
                <template #title>
                    <span>Total Profiles</span>
                    <img src="../../assets/images/icons/layer.png" alt="widget">
                </template>
                <template #content>
                    <p class="text-v_12 text-gray-500 ">10 Profiles</p>
                </template>
            </SmallCard>
            <SmallCard class="col-span-1 border-r-2 rounded-none border_divider">
                <template #title>
                    <span>Total Roles</span>
                    <img src="../../assets/images/icons/gear.png" alt="widget">
                </template>
                <template #content>
                    <p class="text-v_12 text-gray-500 ">4 Roles</p>
                </template>
            </SmallCard>
            <SmallCard class="col-span-1">
                <template #title>
                    <span>Total Members</span>
                    <img src="../../assets/images/icons/users.png" alt="widget">
                </template>
                <template #content>
                    <p class="text-v_12 text-gray-500 ">200 Members</p>
                </template>
            </SmallCard>
        </div>
        <div class="grid grid-cols-2 gap-2  rounded-none">
            <Card class="card_big rounded-none border-r-2 border-b-2 border_divider py-2">
                <template #title>
                    <div class="p-3 flex justify-between w-full items-center">
                        <span>
                            Aviola Members
                        </span>
                        <button class="btn btn_transparent p-0">See All Members</button>
                    </div>
                </template>
                <template #slides>
                    <div class="content_slide p-3">
                        <div class="slide flex justify-between ">
                            <div class="user_info flex mb-4">
                                <img src="../../assets/images/avatar/avatar.png" class="w-10 h-10  rounded-full">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">David Neamix</h2>
                                    <span class="text-v_12 text-gray-500">Super Admin</span>
                                </div>
                            </div>
                            <div class="status">
                                <div class="badge badge-accent text-v_10">Active</div>
                            </div>
                        </div>
                        <div class="slide flex justify-between mb-4">
                            <div class="user_info flex">
                                <img src="../../assets/images/avatar/user2.jpg" class="w-10 h-10  rounded-full">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">Jesse Adam</h2>
                                    <span class="text-v_12 text-gray-500">Senior Markting Speaclist</span>
                                </div>
                            </div>
                            <div class="status">
                                <div class="badge badge-accent text-v_10">Active</div>
                            </div>
                        </div>
                        <div class="slide flex justify-between mb-4">
                            <div class="user_info flex">
                                <img src="../../assets/images/avatar/user4.jpg" class="w-10 h-10  rounded-full">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">Jesse Adam</h2>
                                    <span class="text-v_12 text-gray-500">Senior Markting Speaclist</span>
                                </div>
                            </div>
                            <div class="status">
                                <div class="badge badge-accent text-v_10 offline">Offline</div>
                            </div>
                        </div>
                        <div class="slide flex justify-between mb-4">
                            <div class="user_info flex">
                                <img src="../../assets/images/avatar/user5.jpg" class="w-10 h-10  rounded-full">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">Jesse Adam</h2>
                                    <span class="text-v_12 text-gray-500">Senior Markting Speaclist</span>
                                </div>
                            </div>
                            <div class="status">
                                <div class="badge badge-accent text-v_10 busy">Busy</div>
                            </div>
                        </div>
                    </div>
                </template>
            </Card>
            <Card class="card_big rounded-none border-r-2 border-b-2 border_divider py-2">
                <template #title>
                    <div class="p-3 flex justify-between w-full items-center">
                        <span>
                            Aviola Logs
                        </span>
                        <button class="btn btn_transparent p-0">See All Logs</button>
                    </div>
                </template>
                <template #slides>
                    <div class="content_slide p-3">
                        <div class="slide flex justify-between ">
                            <div class="user_info flex mb-4">
                                <img src="../../assets/images/avatar/avatar.png" class="w-10 h-10  rounded-full">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">David Neamix</h2>
                                    <span class="text-v_12 text-gray-500">Change status from ready to busy</span>
                                </div>
                            </div>
                        </div>
                        <div class="slide flex justify-between mb-4">
                            <div class="user_info flex">
                                <img src="../../assets/images/avatar/user2.jpg" class="w-10 h-10  rounded-full">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">Jesse Adam</h2>
                                    <span class="text-v_12 text-gray-500">Created new space (Delta Project)</span>
                                </div>
                            </div>
                        </div>
                        <div class="slide flex justify-between mb-4">
                            <div class="user_info flex">
                                <img src="../../assets/images/avatar/user4.jpg" class="w-10 h-10  rounded-full">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">Jesse Adam</h2>
                                    <span class="text-v_12 text-gray-500">Created new widgets (New client widget)</span>
                                </div>
                            </div>
                        </div>
                        <div class="slide flex justify-between mb-4">
                            <div class="user_info flex">
                                <img src="../../assets/images/avatar/user5.jpg" class="w-10 h-10  rounded-full">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">Jesse Adam</h2>
                                    <span class="text-v_12 text-gray-500">Created new role (HR Specialist)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Card>
        </div>
        <div class="grid grid-cols-3 rounded-none">
            <Card class="card_big rounded-none border-r-2 border-b-2 border_divider py-2">
                <template #title>
                    <div class="p-3 flex justify-between w-full items-center">
                        <span>
                            Aviola Members
                        </span>
                        <button class="btn btn_transparent p-0">See All Members</button>
                    </div>
                </template>
                <template #slides>
                    <div class="content_slide p-3">
                        <div class="slide flex justify-between ">
                            <div class="user_info flex mb-4">
                                <img src="../../assets/images/avatar/avatar.png" class="w-10 h-10  rounded-full">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">David Neamix</h2>
                                    <span class="text-v_12 text-gray-500">Super Admin</span>
                                </div>
                            </div>
                            <div class="status">
                                <div class="badge badge-accent text-v_10">Active</div>
                            </div>
                        </div>
                        <div class="slide flex justify-between mb-4">
                            <div class="user_info flex">
                                <img src="../../assets/images/avatar/user2.jpg" class="w-10 h-10  rounded-full">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">Jesse Adam</h2>
                                    <span class="text-v_12 text-gray-500">Senior Markting Speaclist</span>
                                </div>
                            </div>
                            <div class="status">
                                <div class="badge badge-accent text-v_10">Active</div>
                            </div>
                        </div>
                        <div class="slide flex justify-between mb-4">
                            <div class="user_info flex">
                                <img src="../../assets/images/avatar/user4.jpg" class="w-10 h-10  rounded-full">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">Jesse Adam</h2>
                                    <span class="text-v_12 text-gray-500">Senior Markting Speaclist</span>
                                </div>
                            </div>
                            <div class="status">
                                <div class="badge badge-accent text-v_10 offline">Offline</div>
                            </div>
                        </div>
                        <div class="slide flex justify-between mb-4">
                            <div class="user_info flex">
                                <img src="../../assets/images/avatar/user5.jpg" class="w-10 h-10  rounded-full">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">Jesse Adam</h2>
                                    <span class="text-v_12 text-gray-500">Senior Markting Speaclist</span>
                                </div>
                            </div>
                            <div class="status">
                                <div class="badge badge-accent text-v_10 busy">Busy</div>
                            </div>
                        </div>
                    </div>
                </template>
            </Card>
            <Card class="card_big rounded-none border-r-2 border-b-2 border_divider py-2">
                <template #title>
                    <div class="p-3 flex justify-between w-full items-center">
                        <span>
                            Aviola Attending Profiles
                        </span>
                        <button class="btn btn_transparent p-0">See All Profiles</button>
                    </div>
                </template>
                <template #slides>
                    <div class="content_slide p-3">
                        <div class="slide flex justify-between ">
                            <div class="user_info flex mb-4">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">HR Profile</h2>
                                    <span class="text-v_12 text-gray-500">4 Members</span>
                                </div>
                            </div>
                            <div class="status">
                                <div class="avatar-group -space-x-2">
                                    <div class="avatar">
                                        <div class=" w-4 h-4 ">
                                        <img src="../../assets/images/avatar/user5.jpg" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class=" w-4 h-4 ">
                                        <img src="../../assets/images/avatar/user2.jpg" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class=" w-4 h-4 ">
                                        <img src="../../assets/images/avatar/user3.jpg" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class=" w-4 h-4 ">
                                        <img src="../../assets/images/avatar/user4.jpg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="slide flex justify-between mb-4">
                            <div class="user_info flex mb-4">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">Agent Profile</h2>
                                    <span class="text-v_12 text-gray-500">4 Members</span>
                                </div>
                            </div>
                            <div class="status">
                                <div class="status">
                                <div class="avatar-group -space-x-2">
                                    <div class="avatar">
                                        <div class=" w-4 h-4 ">
                                        <img src="../../assets/images/avatar/user5.jpg" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class=" w-4 h-4 ">
                                        <img src="../../assets/images/avatar/user2.jpg" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class=" w-4 h-4 ">
                                        <img src="../../assets/images/avatar/user3.jpg" />
                                        </div>
                                    </div>
                                    <div class="avatar">
                                        <div class=" w-4 h-4 ">
                                        <img src="../../assets/images/avatar/user4.jpg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Card>
            <Card class="card_big rounded-none border-r-2 border-b-2 border_divider py-2">
                <template #title>
                    <div class="p-3 flex justify-between w-full items-center">
                        <span>
                            Aviola Roles
                        </span>
                        <button class="btn btn_transparent p-0">See All Roles</button>
                    </div>
                </template>
                <template #slides>
                    <div class="content_slide p-3">
                        <div class="slide flex justify-between ">
                            <div class="user_info flex mb-4">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">System Admin</h2>
                                    <span class="text-v_12 text-gray-500">14 priviledges</span>
                                </div>
                            </div>
                        </div>
                        <div class="slide flex justify-between ">
                            <div class="user_info flex mb-4">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">HR Specialist</h2>
                                    <span class="text-v_12 text-gray-500">10 priviledges</span>
                                </div>
                            </div>
                        </div>
                        <div class="slide flex justify-between ">
                            <div class="user_info flex mb-4">
                                <div class="user_name_title mx-3">
                                    <h2 class="text-v_13 mb-0">Agent</h2>
                                    <span class="text-v_12 text-gray-500">2 priviledges</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Card> 
        </div>
    </Page>
</template>

<script>

import SmallCard from '../../components/fragment/Cards/SmallCard.vue';
import MainHeader from '../../components/fragment/MainHeader.vue';
import Page from '../../components/fragment/Pages/Page.vue';
import Card from '../../components/fragment/Cards/Card.vue';

export default {
    components: {SmallCard,MainHeader,Page,Card}
}

</script>