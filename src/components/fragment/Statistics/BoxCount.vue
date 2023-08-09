<template>
    <div class="card bg-base-100 shadow-xl  relative">
        <div class="card-body bg-dark-300 rounded-md p-4 blind-chart">
            <h3 class=" text-v_16">{{  chart_name  }}</h3>
            <div>
                <h2 class=" text-v_15  mt-4 font-bold">{{  count  }} Members</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
    let props = defineProps({
        'count': Number,
        'chart_name': String
    });
</script>