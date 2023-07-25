<template>
    <div class="card bg-base-100 shadow-xl small_chart_box relative">
        <div class="card-body bg-dark-300 rounded-md p-4 blind-chart h-5">
            <h3 class=" text-v_16">{{  chart_name  }}</h3>
            <h2 class="text-v_15 font-bold">{{ overall_hours }} Hours {{ overall_min }} Min</h2>
            <VueApexCharts width="100%" height="60%" type="area" :options="options" :series="series"></VueApexCharts>
        </div>
    </div>
</template>

<script setup>
import { ref,watch,defineProps } from "vue";
import VueApexCharts from "vue3-apexcharts";

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

let overall_hours = ref(0);
let overall_min = ref(0);

watch(
  () => props.schema,
  () => {
	series.value.data = props.schema;
	console.log(series.value)
	console.log("This watch should activate but it doesn't", props.schema);
  }
);

watch(props.schema,(value) => {
	series.value[0].data = value;
	let total_time  = value.reduce((a,b) => a + b);
	overall_hours.value   = Math.floor( total_time / 3600);
	overall_min.value     = Math.floor(total_time % 3600 / 60);

});

</script>