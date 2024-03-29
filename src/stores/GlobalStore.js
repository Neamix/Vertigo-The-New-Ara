import { defineStore } from "pinia";
import { nextTick } from "vue";


export const useGlobalStore = defineStore('global',{
    state: () => ({
        mainLoader: true,
        page: "Dashboard",
        renderComponent: true,
        closed_nav: false,
        initializationLoader: false
    }),
    
    actions: {
        async recompile() { 
            this.renderComponent = false;
            await nextTick();
            this.renderComponent = true;
        }
    }
});