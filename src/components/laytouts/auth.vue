<template>
 <div class="w-100 p-6" style="background-color: white;">
    <div class="w-100 flex items-center bg-white md:flex-row dark:bg-gray-800">
        <div class="flex flex-col justify-between p-4 leading-normal w-4/12 px-12">
            <h3 class="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">LOGO Vertigo</h3>
            <h1 class="mb-6 text-7xl font-bold tracking-tight text-gray-700 dark:text-white">Sign into your account</h1>
            <p class="mb-6 text-7xl font-bold tracking-tight text-gray-700 dark:text-white">Let's Start your jurney</p>
            <form action="">
                <input type="text" placeholder="Email" class="input input-bordered input-sm min-w-full max-w-xs mb-4" />
                <input type="text" placeholder="Password" class="input input-bordered input-sm min-w-full max-w-xs mb-4" />
                <button class="btn btn-sm w-full">Login</button>
            </form>
        </div>
        <div class="w-4/6 relative">
            <!-- <img class="object-cover w-full  h-96 md:h-auto" style="border-top-left-radius: 50px;border-bottom-left-radius: 50px;" src="../../assets/images/layouts/login.jpg" alt=""> -->
            <Splide :options="{ rewind: true }" aria-label="My Favorite Images">
                <SplideSlide>
                    <img class="object-cover w-full  h-96 md:h-auto" style="border-top-left-radius: 50px;border-bottom-left-radius: 50px;" src="../../assets/images/layouts/login.jpg" alt="">
                </SplideSlide>
                <SplideSlide>
                    <img class="object-cover w-full  h-96 md:h-auto" style="border-top-left-radius: 50px;border-bottom-left-radius: 50px;" src="../../assets/images/layouts/login2.jpg" alt="">
                </SplideSlide>
            </Splide>
            <div class="absolute bottom-4 left-6 w-4/6">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, in eligendi delectus expedita pariatur et doloribus provident excepturi reprehenderit, ut quos optio molestiae totam magni consectetur harum omnis similique ex?</p>
                <h2>Aviola</h2>
            </div>
        </div>
    </div>
 </div>
</template>
<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
export default {
  components: {
    Splide,
    SplideSlide,
  },
} 
</script>