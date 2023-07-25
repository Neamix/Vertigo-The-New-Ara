<template>
    <div class="card bg-base-100 shadow-xl  relative h-full">
        <div class="card-body bg-dark-300 rounded-md p-4 blind-chart h-5">
            <h3 class=" text-v_16">Members Statistics </h3>
            <VueApexCharts width="100%" height="90%" type="bar" :options="options" :series="series"></VueApexCharts>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

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
    data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
}]);
</script>