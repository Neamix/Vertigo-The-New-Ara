<template>
    <div class="bg-dark-300 rounded-md p-4 blind-chart h-v_40vh mb-2 overflow-y-scroll">
        <h3 class=" text-v_16 py-2">Running Projects</h3>
        <swiper :slides-per-view="3" :space-between="50" class="h-v_30vh mt-3">
            <swiper-slide class="h-full">
                <div class="bg-dark-400 w-full h-full rounded-lg">
                    asdas
                </div>
            </swiper-slide>
            <swiper-slide class="h-full">
                <div class="bg-dark-400 w-full h-full">
                    asdas
                </div>
            </swiper-slide>
            <swiper-slide class="h-full">
                <div class="bg-dark-400 w-full h-full">
                    asdas
                </div>
            </swiper-slide>
            <swiper-slide class="h-full">
                <div class="bg-dark-400 w-full h-full">
                    asdas
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';

</script>