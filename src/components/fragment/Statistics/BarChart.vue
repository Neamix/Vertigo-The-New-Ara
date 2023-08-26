<template>
    <div class="card bg-base-100 shadow-xl  relative h-full">
        <div class="card-body bg-dark-300 rounded-md p-4 blind-chart h-5">
            <h3 class=" text-v_16"></h3>
            <VueApexCharts width="100%" height="95%" type="bar" :options="options" :series="series"></VueApexCharts>
        </div>
    </div>
</template>

<script setup>
import { ref,watch,defineProps } from "vue";
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps(['schema','chart_name']);

let  options = {
    plotOptions: {
        bar: {
            columnWidth: 20,
            borderRadius: 10,
            borderRadiusApplication: 'end',
        }
    },
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
            show: true,
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
    name: 'Members',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}]);

watch(() => props.schema, (value) => {
    let data = [];

    Object.keys(value).forEach((key) => {
		data.push(value[key] ?? 0);
	});

    series.value[0].data = data;
},{deep: true});
</script>