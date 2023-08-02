<template>
    <div class="bg-dark-300 rounded-md p-4 blind-chart h-[325px] mb-2 overflow-y-scroll">
        <div class="py-2">
            <h3 class=" text-v_16 mb-0">Running Projects</h3>
            <a class="text-v_12 text-gray-500">View All Projects</a>
        </div>
        <swiper :slides-per-view="3" :space-between="50" class="h-[70%] mt-3">
            <swiper-slide class="h-full rounded-md">
                
            </swiper-slide>
            <swiper-slide class="h-full rounded-md">
                <div class="bg-dark-400 w-full h-full rounded-lg p-4">
                    <h3 class=" text-v_17 font-bold">This is a fake project title for testing</h3>
                    <h5 class="text-v_14 text-gray-500">Created at: 20 March 2020</h5>
                    <h3 class=" text-v_14 text-gray-400 mt-5  mb-2">This is a fake project description for testing project to check fittnestt...</h3>
                    <div class="members mt-2 flex">
                        <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2 "/>
                        <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2 "/>
                        <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2"/>
                        <p class="text-gray-500 text-v_14 mb-0 flex items-center">+20 More</p>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide class="h-full rounded-md">
                <div class="bg-dark-400 w-full h-full rounded-lg p-4">
                    <h3 class=" text-v_17 font-bold">This is a fake project title for testing</h3>
                    <h5 class="text-v_14 text-gray-500">Created at: 20 March 2020</h5>
                    <h3 class=" text-v_14 text-gray-400 mt-5 min-h-[30px] mb-8">This is a fake project description for testing project to check fittnestt...</h3>
                    <div class="members mt-2 flex">
                        <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2 "/>
                        <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2 "/>
                        <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2"/>
                        <p class="text-gray-500 text-v_14 mb-0 flex items-center">+20 More</p>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide class="h-full rounded-md">
                <div class="bg-dark-400 w-full h-full rounded-lg p-4">
                    <h3 class=" text-v_17 font-bold">This is a fake project title for testing</h3>
                    <h5 class="text-v_14 text-gray-500">Created at: 20 March 2020</h5>
                    <h3 class=" text-v_14 text-gray-400 mt-5 min-h-[30px] mb-8">This is a fake project description for testing project to check fittnestt...</h3>
                    <div class="members mt-2 flex">
                        <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2 "/>
                        <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2 "/>
                        <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2"/>
                        <p class="text-gray-500 text-v_14 mb-0 flex items-center">+20 More</p>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide class="h-full rounded-md">
                <div class="bg-dark-400 w-full h-full rounded-lg p-4">
                    <h3 class=" text-v_17 font-bold">This is a fake project title for testing</h3>
                    <h5 class="text-v_14 text-gray-500">Created at: 20 March 2020</h5>
                    <h3 class=" text-v_14 text-gray-400 mt-5 min-h-[30px] mb-8">This is a fake project description for testing project to check fittnestt...</h3>
                    <div class="members mt-2 flex">
                        <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2 "/>
                        <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2 "/>
                        <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2"/>
                        <p class="text-gray-500 text-v_14 mb-0 flex items-center">+20 More</p>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide class="h-full rounded-md">
                <div class="bg-dark-400 w-full h-full rounded-lg p-4">
                    <h3 class=" text-v_17 font-bold">This is a fake project title for testing</h3>
                    <h5 class="text-v_14 text-gray-500">Created at: 20 March 2020</h5>
                    <h3 class=" text-v_14 text-gray-400 mt-5 min-h-[30px] mb-8">This is a fake project description for testing project to check fittnestt...</h3>
                    <div class="members mt-2 flex">
                        <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2 "/>
                        <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2 "/>
                        <Avatar :user="{'avatar': undefined,'name':'Jessica Adam'}" class=" mr-2"/>
                        <p class="text-gray-500 text-v_14 mb-0 flex items-center">+20 More</p>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';

</script>