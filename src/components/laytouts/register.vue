<script>
import axios from 'axios';

const createUser = async () => {
    const response = await axios.post('http://localhost:8000/graphql', {
        query: `mutation{
            login(email: "beulah.rice@example.net", password:"password")
            }`,
    });

    return response.data.data
}
export default {

    data: () => {
        return {
            openTab: 1,
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

        toggleTabs: function (tabNumber) {
            this.openTab = tabNumber
        }
    },

    mounted() {
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
                <div class="step" :class="{ 'step-active': step === 1, 'step-done': step > 1 }"><span
                        class="step-number">1</span></div>
                <div class="step" :class="{ 'step-active': step === 2, 'step-done': step > 2 }"><span
                        class="step-number">2</span></div>
                <div class="step" :class="{ 'step-active': step === 3, 'step-done': step > 3 }"><span
                        class="step-number">3</span></div>
            </div>

            <transition name="slide-fade">
                <section v-show="step === 1">
                    <form class="form" method="post" action="#" @submit.prevent="next">
                        <div class="form-group py-4">
                            <div class="px-4 d-block">
                                <h3>Company information:</h3>
                            </div>
                            <!-- <div class="px-4">
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
                                        </div> -->
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="customer.firstName" autocomplete='customer.firstName'
                                placeholder="Name"   />
                        </div>
                        <div class="form-group">
                            <input type="email" v-model="customer.firstName" autocomplete='customer.firstName'
                                placeholder="Email"   />
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="customer.firstName" autocomplete='customer.firstName'
                                placeholder="Business Field"   />
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="customer.firstName" autocomplete='customer.firstName'
                                placeholder="Location: City"   />
                            <input type="text" v-model="customer.firstName" autocomplete='customer.firstName'
                                placeholder="Zip Code"   />
                        </div>
                        <div class="form-group">
                            <div class="flex flex-wrap">
                                <h3 class="px-2 py-4">Working Days: </h3>
                                <div class="w-full">
                                    <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
                                        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-default	"
                                                v-on:click="toggleTabs(1)"
                                                v-bind:class="{ 'text-sky-500 bg-white': openTab !== 1, 'text-white bg-pink-600': openTab === 1 }">
                                                Sat
                                            </a>
                                        </li>
                                        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-default	"
                                                v-on:click="toggleTabs(2)"
                                                v-bind:class="{ 'text-sky-500 bg-white': openTab !== 2, 'text-white bg-pink-600': openTab === 2 }">
                                                Sun
                                            </a>
                                        </li>
                                        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-default	"
                                                v-on:click="toggleTabs(3)"
                                                v-bind:class="{ 'text-sky-500 bg-white': openTab !== 3, 'text-white bg-pink-600': openTab === 3 }">
                                                Mon
                                            </a>
                                        </li>
                                        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-default	"
                                                v-on:click="toggleTabs(4)"
                                                v-bind:class="{ 'text-sky-500 bg-white': openTab !== 4, 'text-white bg-pink-600': openTab === 4 }">
                                                Tue
                                            </a>
                                        </li>
                                        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-default	"
                                                v-on:click="toggleTabs(5)"
                                                v-bind:class="{ 'text-sky-500 bg-white': openTab !== 5, 'text-white bg-pink-600': openTab === 5 }">
                                                Wed
                                            </a>
                                        </li>
                                        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-default	"
                                                v-on:click="toggleTabs(6)"
                                                v-bind:class="{ 'text-sky-500 bg-white': openTab !== 6, 'text-white bg-pink-600': openTab === 6 }">
                                                Thurs
                                            </a>
                                        </li>
                                        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-default	"
                                                v-on:click="toggleTabs(7)"
                                                v-bind:class="{ 'text-sky-500 bg-white': openTab !== 7, 'text-white bg-pink-600': openTab === 7 }">
                                                Fri
                                            </a>
                                        </li>
                                    </ul>
                                    <div
                                        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                                        <div class="px-4 py-5 flex-auto">
                                            <div class="tab-content tab-space">
                                                <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                                                    <div class="px-4">
                                                        <input id="holiday" type="radio" value="1"
                                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                        <label
                                                            class="ml-2 text-sm font-medium text-gray-200 dark:text-gray-300"
                                                            for="holiday">Mark as holiday</label>
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="text" v-model="customer.firstName"
                                                            autocomplete='customer.firstName' placeholder="Start time"
                                                              />
                                                        <input type="text" v-model="customer.firstName"
                                                            autocomplete='customer.firstName' placeholder="End time"
                                                              />
                                                    </div>
                                                </div>
                                                <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                                                    <div class="px-4">
                                                        <input id="holiday" type="radio" value="1"
                                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                        <label
                                                            class="ml-2 text-sm font-medium text-gray-200 dark:text-gray-300"
                                                            for="holiday">Mark as holiday</label>
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="text" v-model="customer.firstName"
                                                            autocomplete='customer.firstName' placeholder="Start time"
                                                              />
                                                        <input type="text" v-model="customer.firstName"
                                                            autocomplete='customer.firstName' placeholder="End time"
                                                              />
                                                    </div>
                                                </div>
                                                <div v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">
                                                    <div class="px-4">
                                                        <input id="holiday" type="radio" value="1"
                                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                        <label
                                                            class="ml-2 text-sm font-medium text-gray-200 dark:text-gray-300"
                                                            for="holiday">Mark as holiday</label>
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="text" v-model="customer.firstName"
                                                            autocomplete='customer.firstName' placeholder="Start time"
                                                              />
                                                        <input type="text" v-model="customer.firstName"
                                                            autocomplete='customer.firstName' placeholder="End time"
                                                              />
                                                    </div>
                                                </div>
                                                <div v-bind:class="{ 'hidden': openTab !== 4, 'block': openTab === 4 }">
                                                    <div class="px-4">
                                                        <input id="holiday" type="radio" value="1"
                                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                        <label
                                                            class="ml-2 text-sm font-medium text-gray-200 dark:text-gray-300"
                                                            for="holiday">Mark as holiday</label>
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="text" v-model="customer.firstName"
                                                            autocomplete='customer.firstName' placeholder="Start time"
                                                              />
                                                        <input type="text" v-model="customer.firstName"
                                                            autocomplete='customer.firstName' placeholder="End time"
                                                              />
                                                    </div>
                                                </div>
                                                <div v-bind:class="{ 'hidden': openTab !== 5, 'block': openTab === 5 }">
                                                    <div class="px-4">
                                                        <input id="holiday" type="radio" value="1"
                                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                        <label
                                                            class="ml-2 text-sm font-medium text-gray-200 dark:text-gray-300"
                                                            for="holiday">Mark as holiday</label>
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="text" v-model="customer.firstName"
                                                            autocomplete='customer.firstName' placeholder="Start time"
                                                              />
                                                        <input type="text" v-model="customer.firstName"
                                                            autocomplete='customer.firstName' placeholder="End time"
                                                              />
                                                    </div>
                                                </div>
                                                <div v-bind:class="{ 'hidden': openTab !== 6, 'block': openTab === 6 }">
                                                    <div class="px-4">
                                                        <input id="holiday" type="radio" value="1"
                                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                        <label
                                                            class="ml-2 text-sm font-medium text-gray-200 dark:text-gray-300"
                                                            for="holiday">Mark as holiday</label>
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="text" v-model="customer.firstName"
                                                            autocomplete='customer.firstName' placeholder="Start time"
                                                              />
                                                        <input type="text" v-model="customer.firstName"
                                                            autocomplete='customer.firstName' placeholder="End time"
                                                              />
                                                    </div>
                                                </div>
                                                <div v-bind:class="{ 'hidden': openTab !== 7, 'block': openTab === 7 }">
                                                    <div class="px-4">
                                                        <input id="holiday" type="radio" value="1"
                                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                        <label
                                                            class="ml-2 text-sm font-medium text-gray-200 dark:text-gray-300"
                                                            for="holiday">Mark as holiday</label>
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="text" v-model="customer.firstName"
                                                            autocomplete='customer.firstName' placeholder="Start time"
                                                              />
                                                        <input type="text" v-model="customer.firstName"
                                                            autocomplete='customer.firstName' placeholder="End time"
                                                              />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3>Requests:</h3>
                        <div class="form-group">
                            <input type="text" v-model="customer.firstName" autocomplete='customer.firstName'
                                placeholder="Name"   />
                            <select class="select select-bordered w-full max-w-xs bg-slate-800">
                                <option disabled selected class="bg-slate-800">Who shot first?</option>
                                <option class="bg-slate-800">Han Solo</option>
                                <option class="bg-slate-800">Greedo</option>
                            </select>
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
                    <h3>Attending Profile</h3>
                    <form class="form" method="post" action="#" @submit.prevent="next">
                        <div class="form-group">
                            <input type="text" v-model="customer.address" autocomplete='customer.address'
                                placeholder="Name"   />
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="customer.zipCode" autocomplete='customer.zipCode'
                                placeholder="Rquest Days" minlength="5" maxlength="5"   />
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
                    <h3>Personal information</h3>
                    <form class="form" action="#" @submit.prevent="customerRegister">
                        <div class="form-group">
                            <input type="text" v-model="customer.eMail" autocomplete="customer.eMail" placeholder="Name"
                                  />
                            <input type="email" v-model="customer.eMail" autocomplete="customer.eMail" placeholder="Email"
                                  />
                        </div>
                        <div class="form-group">
                            <input type="password" v-model="customer.birthDay" placeholder="Password"
                                  />
                            <input type="password" v-model="customer.birthDay" placeholder="Conirm Password"
                                  />
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