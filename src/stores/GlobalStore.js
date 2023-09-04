import { defineStore } from "pinia";
import { nextTick } from "vue";


export const useGlobalStore = defineStore('global',{
    state: () => ({
        mainLoader: true,
        page: "Dashboard",
        renderComponent: true,
        closed_nav: false,
        init_loader: true
    }),
    
    actions: {
        async recompile() { 
            this.renderComponent = false;
            await nextTick();
            this.renderComponent = true;
        }
    }
});