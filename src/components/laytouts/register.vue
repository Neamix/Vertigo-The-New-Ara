<script>
import axios from 'axios';

const createUser = async() => {
        const response = await axios.post('http://localhost:8000/graphql',{
            query: `mutation{
            login(email: "beulah.rice@example.net", password:"password")
            }`,
        });

        return response.data.data
       }
export default {
    
    data: () => {
        return {
            steps: {},
            step: 1,
            customer: {
                gender: "1",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                zipCode: "",
                city: "",
                birthDay: "",
                termOfService: "",
                pinCode: "",
                eMail: ""
            },
            hasSeenCongrats: false,
            tempCustomer: {
                gender: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                zipCode: "",
                city: "",
                birthDay: "",
                termOfService: "",
                pinCode: "",
                eMail: ""
            },
        };
    },
    methods: {
        prev() {
            this.step--;
        },

        next() {
            this.step++;
        },

        customerRegister: function () {
            this.hasSeenCongrats = true;
        },

        
    },

    mounted(){
       const asas = createUser()
       console.log(asas)       
    }
}
</script>
<template>
    <div class="min-h-screen">
        <section class="pen-description">
            <h1>Vertigo <br>New Sign up!</h1>
        </section>
        <section class="register" v-if="!hasSeenCongrats">
            <div class="register-icon">
                <img class="register-icon-item" src="../../../src/assets/images/logos/fav.png" alt="vue logo">
            </div>
            <h2 class="register-title">Sign up for a new account</h2>

            <div class="register-stepper my-12">
                <div class="step" :class="{'step-active' : step === 1, 'step-done': step > 1}"><span
                        class="step-number">1</span></div>
                <div class="step" :class="{'step-active' : step === 2, 'step-done': step > 2}"><span
                        class="step-number">2</span></div>
                <div class="step" :class="{'step-active' : step === 3, 'step-done': step > 3}"><span
                        class="step-number">3</span></div>
            </div>

            <transition name="slide-fade">
                <section v-show="step === 1">
                    <form class="form" method="post" action="#" @submit.prevent="next">
                        <div class="form-group py-4">
                            <div class="px-4">
                                <input id="loyaltyCivilityMr" type="radio" value="1" v-model="customer.gender"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label class="ml-2 text-sm font-medium text-gray-200 dark:text-gray-300"
                                    for="loyaltyCivilityMr">Mr.</label>
                            </div>
                            <div class="px-4">

                                <input id="loyaltyCivilityMrs" type="radio" value="2" v-model="customer.gender"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label class="ml-2 text-sm font-medium text-gray-200 dark:text-gray-300"
                                    for="loyaltyCivilityMrs">Mrs.</label>
                            </div>
                        </div>

                        <div class="form-group">
                            <input type="text" v-model="customer.firstName" autocomplete='customer.firstName'
                                placeholder="First name" required />
                            <input type="text" v-model="customer.lastName" autocomplete='customer.lastName'
                                placeholder="Last name" required />
                        </div>

                        <div class="form-group">
                            <input type="tel" v-model="customer.phoneNumber" autocomplete="customer.phoneNumber"
                                placeholder="Phone number" required />
                        </div>
                        <div class="cta" data-style="see-through" data-alignment="right" data-text-color="custom">
                            <p class="cta-color">
                                <span class="link_wrap">
                                    <input type="submit" value="Next" class="link_text" />
                                    <span class="arrow-next"></span>
                                </span>
                            </p>
                        </div>
                    </form>
                </section>
            </transition>
            <transition name="slide-fade">
                <section v-show="step === 2">
                    <form class="form" method="post" action="#" @submit.prevent="next">
                        <div class="form-group">
                            <input type="text" v-model="customer.address" autocomplete='customer.address'
                                placeholder="Address" required />
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="customer.zipCode" autocomplete='customer.zipCode'
                                placeholder="Zip Code" minlength="5" maxlength="5" required />
                            <input type="text" v-model="customer.city" autocomplete='customer.city' placeholder="City"
                                required />
                        </div>

                        <div class="form-group cta-step">
                            <div class="cta prev">
                                <p class="cta-color">
                                    <span class="link_wrap">
                                        <a class="link_text" href="#" @click.prevent="prev()"><span
                                                class="arrow-prev"></span>Previous
                                        </a>
                                    </span>
                                </p>
                            </div>
                            <div class="cta">
                                <p class="cta-color">
                                    <span class="text"></span>
                                    <span class="link_wrap">
                                        <input type="submit" value="Next" class="link_text" />
                                        <span class="arrow-next"></span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </form>
                </section>
            </transition>
            <transition name="slide-fade">
                <section v-show="step === 3">
                    <form class="form" action="#" @submit.prevent="customerRegister">
                        <div class="form-group">
                            <input type="email" v-model="customer.eMail" autocomplete="customer.eMail"
                                placeholder="Email" required />
                        </div>
                        <div class="form-group">
                            <input type="date" v-model="customer.birthDay" placeholder="Birthday ('day'/'month'/'year')"
                                required />
                        </div>

                        <div class="form-group cta-step">
                            <div class="cta prev">
                                <p class="cta-color">
                                    <span class="link_wrap">
                                        <a class="link_text" href="#" @click.prevent="prev()"><span
                                                class="arrow-prev"></span>Previous
                                        </a>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="register-btn">
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </section>
            </transition>
        </section>
        <section class="congrats register" v-if="hasSeenCongrats">
            <div class="register-icon">
                <img class="register-icon-item" src="../../../src/assets/images/logos/fav.png" alt="vue logo">

            </div>
            <h2 class="congrats-title">Thank you !</h2>
            <p class="congrats-subtitle">
                You have successfully created your account and joined <br />
                <strong>Vertigo Team</strong>
            </p>
        </section>
        <section class="pen-description">

        </section>
    </div>
</template>