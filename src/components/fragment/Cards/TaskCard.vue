<template>
    <div class="column-lower-container flex overflow-x-scroll">
        <div class="col flex items-start">
            
            <!-- Start: Draggable Column -->
            <Draggable v-model="columns" tag="ul" group="columns" item-key="id" class="flex" :clone="false"  style="touch-action: pan-x;" :animation="400" :force-fallback="true" :scroll-sensitivity="10"  @change="log()">
                <template #item="{element: col}">
                    <div class="column flex-1 mr-4  w-100 min-h-16 px-3 rounded-md min-w-v_300px h-fit bg-dark-200 p-2 overflow-y-hidden touch-pan-x ">
                        <div class="column-name">
                            <label class="text-v_14 w-full cursor-pointer" v-if="columnUnerChange != col.id" @click="columnUnerChange = col.id;columnNewName = col.name">{{ col.name }}</label>
                            <input type="text" class="form-control change-column-name-input bg-dark-300 p-2 h-v_35px text-white w-full" @blur="changeColumnName()" v-if="columnUnerChange == col.id" v-model="columnNewName">
                        </div>
                        <div class="empty_column" v-if="false">
                            <p class="my-0 text-gray-300 text-v_12 font-normal mt-2">Add new card</p>
                        </div>
                        <div class="cards max-h-v_70vh overflow-y-hidden">
                            <!-- Start: Draggable Cards -->
                            <Draggable v-model="col.card" tag="ul" class=" min-h-6 " drag-class="drag-card" ghost-class="ghost-class" group="cards" @start="drag=true" @end="drag=false" :item-key="col.id"  :animation="200">
                                <template #item="{element: card}">
                                    <li>
                                        <div class="card bg-dark-300 rounded-md mt-2 min-h-16 inner-card">
                                            <p class="text-v_13 p-3">{{ card.name }}</p>
                                        </div>
                                    </li>
                                </template>
                            </Draggable>
                            <!-- End: Draggable Cards -->
                        </div>
                        <button class=" text-v_13  my-2 font-semi-bold mt-2">
                            <i class="fa fa-plus text-v_10 mx-2"></i>
                            <span>Add new card</span>
                        </button>
                    </div>
                </template>
            </Draggable>
            <!-- End: Draggable Column -->
            
           <div class="new-column">
                <button class="text-v_13  my-2 font-semi-bold mt-2" v-if="openColumnText == false" @click="openColumnText = true">
                    <i class="fa fa-plus text-v_10 mx-2"></i>
                    <span @click="openColumnText = true">Add new column</span>
                </button>
                <form class="bg-dark-200 rounded-md p-3 flex-1 min-w-v_200px" @submit.prevent="addNewColumn()" v-if="openColumnText">
                    <input type="text" class="form-control addNewColumnInput bg-dark-300 p-2 h-v_35px text-white w-full" placeholder="Enter column name" v-model="newColumnName">
                    <button class="btn btn-primary mt-2 text-v_10 h-5">Add column</button>
                </form>
           </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Import Plugins
import Draggable from 'vuedraggable';

let columns = ref([
    {
        id:1,
        name: 'Todo Tasks',
        card: [
            {id:1,name: "task1"},
            {id:2,name: "task2"},
            {id:3,name: "task3"},
            {id:4,name: "task4"},
            {id:5,name: "task5"},
        ]
    },
    {
        id:2,
        name: 'Progress Tasks',
        card: [
            {id:6,name: "task6"},
            {id:7,name: "task7"},
            {id:8,name: "task8"},
            {id:9,name: "task4"},
            {id:10,name: "task5"},
        ]
    }
]);

// Change exist column name
let columnUnerChange = ref(null);
let columnNewName = ref(null);

function changeColumnName() {
    // Remove Error Border
    document.querySelector('.addNewColumnInput').classList.remove('is-invalid');
}

// Add new column
let newColumnName = ref(null);
let openColumnText = ref(false);

function addNewColumn() {
    // Remove Error Border
    document.querySelector('.addNewColumnInput').classList.remove('is-invalid');

    // In case there is value in input
    if (newColumnName.value) {
        columns.value.push({
            id: columns.value.length + 1,
            name: newColumnName.value,
            card: []
        });

        // Close column text
        openColumnText.value = false;
    } 
    
    //Add Error Border
    else {
        document.querySelector('.addNewColumnInput').classList.add('is-invalid');
    }
}

function closeColumnModalOnClickOutSide(event) {
    let el = this.$refs.dropdown;
    let target = event.target;

    if (el !== target && !el.contains(target)){
        this.showMenu = false
    }
}

</script>