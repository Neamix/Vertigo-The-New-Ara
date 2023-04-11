<template>
    <div class="select_main select_container relative">
        <div class=" bg-dark-300 p-2 rounded-md focus:rounded-b-none  text-v_12 select-none select_placeholder h-full flex  items-center" @click="openSelect =! openSelect">
            {{ label }}
        </div>
        <ul class="select_dropdown  bg-dark-300 rounded-b-md absolute z-10 w-full" v-if="openSelect">
            <li class="text-v_12 w-full hover:bg-secoundry-dark select-none p-2" v-for="optionItem in options" :key="optionItem.value"  @click="selectOptions(optionItem)"> 
                <span>{{ optionItem.string }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            options: {type: Array,required: true},
            placeholder: {type: String,required: true},
            type: {required: true}
        },

        data: () => {
            return {
                openSelect: false,
                label: "",
            }
        },

        methods: {
            selectOptions(option) {
                // Close the nav after select
                this.openSelect = false;

                // Select an option and emit it 
                this.label = option.string;
                this.$emit('selected',{type: this.type,option});
            }
        },
        mounted() {
            // Set label value 
            this.label = this.placeholder;
        }   
    }
</script>