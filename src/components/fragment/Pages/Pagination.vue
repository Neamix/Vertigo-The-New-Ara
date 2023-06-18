<template>
    <div class="btn-group mt-10 rounded-r-none">
        <button class="btn rounded-none" @click="firstPage()">
            <i class="fa-solid fa-angles-left"></i>
        </button>
        <button class="btn rounded-l-md" @click="prevPage()">
            <i class="fa-solid fa-chevron-left"></i>
        </button>
        <div class="btn-container rounded-none w-v_115px overflow-hidden">
            <div class="inner_container flex transition-all" :style="{'margin-left': -merge + 'px' }">
                <button class="btn btn-no-border btn-pager hover:bg-slate-10 hover:text-black" :class="{'active_page': page == currentPage}" v-for="page in totalPages" :key="page" @click="declarePage(page)">{{ page }}</button>
            </div>
        </div>
        <button class="btn rounded-none" @click="nextPage()">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
        <button class="btn rounded-none" @click="lastPage()">
            <i class="fa-solid fa-angles-right"></i>
        </button>
    </div>
</template>

<script setup>
// General Import 
import { ref , watch} from 'vue';
import { useMemberStore } from '../../../stores/MembersStore';

// Variables

const props = defineProps(['currentPage','totalPages']);
const emit =  defineEmits(['paginate']);

let currentPage = ref(props.currentPage);
let totalPages = useMemberStore().totalPages;
let merge = ref(0);

// Pagination Funcation
function nextPage() {
    if ( currentPage.value < totalPages.value ) {
        currentPage.value++;
        merge.value = (currentPage.value - 1) * 39;
    } else {
        currentPage.value = 1;
        merge.value = 0;
    }
    
    // Emit Page
    emit('paginate',currentPage.value);
}

function prevPage() {
    if ( currentPage.value != 1 ) {
        currentPage.value--;
        merge.value = (currentPage.value - 1) * 39;
    } else {
        currentPage.value = totalPages.value;
        merge.value = (currentPage.value - 1) * 39;
    }

    // Emit Page
    emit('paginate',currentPage.value);
}

function lastPage() {
    currentPage.value = totalPages.value;
    merge.value = (currentPage.value - 1) * 39;

    // Emit Page
    emit('paginate',currentPage.value);
}

function firstPage() {
    currentPage.value = 1;
    merge.value = 0;
    emit('paginate',currentPage.value);
}

function declarePage(page) {
    currentPage.value = page;

    // Emit Page
    emit('paginate',currentPage.value);
}


</script>