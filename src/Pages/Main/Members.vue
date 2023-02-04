
import Page from '../../components/fragment/Pages/Page.vue';

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
    </Page>
</template>

<script>
import Page from '../../components/fragment/Pages/Page.vue';
import MainHeader from '../../components/fragment/MainHeader.vue';

export default {
    components: {Page,MainHeader}
}

</script>