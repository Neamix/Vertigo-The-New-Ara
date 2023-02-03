<template>
    <Page>
        <MainHeader>
            <template #title>
                Dashboard
            </template>
        </MainHeader>
        <div class="grid grid-cols-4">
            <SmallCard class="col-span-1">
                <template #title>
                    Total Widgets
                </template>
                <template #content>
                    <p class="text-v_12 text-gray-500 ">10 Widgets</p>
                </template>
            </SmallCard>
            <SmallCard class="col-span-1">
                <template #title>
                    Total Profiles
                </template>
                <template #content>
                    <p class="text-v_12 text-gray-500 ">10 Profiles</p>
                </template>
            </SmallCard>
            <SmallCard class="col-span-1">
                <template #title>
                    Total Roles
                </template>
                <template #content>
                    <p class="text-v_12 text-gray-500 ">4 Roles</p>
                </template>
            </SmallCard>
            <SmallCard class="col-span-1">
                <template #title>
                    Total Members
                </template>
                <template #content>
                    <p class="text-v_12 text-gray-500 ">200 Members</p>
                </template>
            </SmallCard>
        </div>
    </Page>
</template>

<script>

import SmallCard from '../../components/fragment/Cards/SmallCard.vue';
import MainHeader from '../../components/fragment/MainHeader.vue';
import Page from '../../components/fragment/Pages/Page.vue';

export default {
    components: {SmallCard,MainHeader,Page}
}

</script>