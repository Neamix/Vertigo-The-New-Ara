<template>
    <div class="card bg-base-100 shadow-xl small_chart_box relative">
        <div class="card-body bg-dark-300 rounded-md p-4 blind-chart h-5">
            <h3 class=" text-v_16">{{  chart_name  }}</h3>
            <h2 class="text-v_15 font-bold">{{  time }}</h2>
            <VueApexCharts width="100%" height="60%" type="area" :options="options" :series="series"></VueApexCharts>
        </div>
    </div>
</template>

<script setup>
import { ref,watch,defineProps } from "vue";
import VueApexCharts from "vue3-apexcharts";
import timeConvert from '@/Helpers/localization/timeConvert.js'

const props = defineProps(['schema','chart_name']);

let  options = {
	colors: ['white','#0000'],
	chart: {
		height: 300,
		type: 'area'
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth'
	},
	xaxis: {
        labels: {
            show: false,
        },
		categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"]
	},
    yaxis: {
        labels: {
            show: false,
        }
    },
	legend: {
		show: false,
	},
    grid: {
        show: false,
    },
	dynamicAnimation: {
		enabled: true,
		speed: 350
	}
}

let series = ref([{
    name: 'Total Hours',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}]);

let time = ref('00 Hours 00 Min');

watch(() => props.schema, (value) => {
	let data = [];
	let total_time_in_sec = 0;

	// Looping to add time in the area array
	// Looping to sum total secounds
	Object.keys(value).forEach((key) => {
		data.push( (value[key]) ? (value[key]/3600).toFixed(2) : 0);
		total_time_in_sec += value[key] ?? 0;
	});
    
	time.value  = timeConvert(total_time_in_sec);
	series.value[0].data = data;
},{deep: true});


</script>