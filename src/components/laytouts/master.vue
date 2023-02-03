<template>
    
    <div class="container">
        <div class="grid grid-cols-20">
            <!-- AsideNav -->
            <AsideNav @toggleSideNav="toggleSideNav"></AsideNav>

            <!-- Main View -->
            <div class="pl-3 main_content min-h-screen" :class="{'col-span-17': aside_open,'col-span-19': !aside_open}">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import AsideNav from '../components/AsideNav.vue';

export default {
    components: {AsideNav},

    data() {
        return {
            // Dropdown Triggers
            workspaces_dropdown: true,
            aside_open: true
        }
    },

    computed: {
        logo() {
            // Logo Declare
            if ( this.aside_open ) {
                return '../../../src/assets/images/logos/logo_light.png';
            } else {
                return '../../../src/assets/images/logos/fav.png';
            }
        }
    },

    methods: {
        toggleSideNav($val) {
            this.aside_open = $val;
        }
    }

}

</script>