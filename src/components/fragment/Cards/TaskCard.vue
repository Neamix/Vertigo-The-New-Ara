<template>
    <div class="column-lower-container flex overflow-x-scroll">
        <div class="col flex items-start">
            <!-- Start: Draggable Column -->
            <Draggable v-model="columns" tag="ul" group="columns" item-key="id" class="flex" @change="log()" :animation="200">
                <template #item="{element: col}">
                    <div class="column flex-1 mr-4  w-100 min-h-16 px-3 rounded-md min-w-v_300px h-fit">
                        <label class=" text-v_14 ">{{ col.name }}</label>
                        <div class="empty_column" v-if="false">
                            <p class="my-0 text-gray-300 text-v_12 font-normal mt-2">Add new card</p>
                        </div>
                        <div class="cards max-h-v_70vh overflow-y-scroll">
                            <!-- Start: Draggable Cards -->
                            <Draggable v-model="col.card" tag="ul" drag-class="drag-card" ghost-class="ghost-class" group="cards" @start="drag=true" @end="drag=false" :item-key="col.id"  :animation="200">
                                <template #item="{element: card}">
                                    <li>
                                        <div class="card bg-dark-300 rounded-md mt-2 min-h-16 mr-2 inner-card">
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
            <button class=" text-v_13  my-2 font-semi-bold mt-2">
                <i class="fa fa-plus text-v_10 mx-2"></i>
                <span>Add new card</span>
            </button>
            <!-- End: Draggable Column -->
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

function log() {
    console.log(columns.value)
}

</script>