<template>
    <div>
        <div v-if="finished" style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
            <span style="margin-bottom: 100px; font-weight: 600; font-size: 24px; line-height: 30px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">{{ translate('The data has been submitted.') }}</span>
            <v-btn color="#36A5DD" style="padding: 25px 70px" @click="$router.push('/leadsdetails/' + $router.currentRoute.params.id)">
                <span style="color: white">{{ translate('Back') }}</span>
            </v-btn>
        </div>
        <div class="remove-shadows" v-else>
            <v-row justify="end" no-gutters>
                <v-btn color="transparent" @click="$router.push('/leadsdetails/' + $router.currentRoute.params.id)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-row>
            <template>
                <v-stepper v-model="step" style="border:none;" :style="!$vuetify.theme.dark && 'background-color: #e5eff5;'">
                    <v-stepper-header style="background-color: transparent">
                        <v-stepper-step
                            :complete="step > 1"
                            step="1"
                            class="step"
                        >
                            <span class="step-text">Vorstellung</span>
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step
                            :complete="step > 2"
                            step="2"
                            class="step"
                        >
                            <span class="step-text">Erwartungen</span>
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="3" :complete="step > 3" class="step">
                            <span class="step-text">Ist & Soll Situation</span>
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="4" :complete="step > 4" class="step">
                            <span class="step-text">Budgetplanung</span>
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="5" :complete="step > 5" class="step">
                            <span class="step-text">Ziele</span>
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="6" :complete="step > 6" class="step">
                            <span class="step-text">Zusammenfassung</span>
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="7"  class="step">
                            <span class="step-text">Zukunft</span>
                        </v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items style="margin-top: 40px;">
                        <v-stepper-content step="1">
                            <FirstStep @next-page="nextPage" :defaultData="protocol[0]" />
                        </v-stepper-content>

                        <v-stepper-content step="2">
                            <SecondStep @next-page="nextPage" @prev-page="prevPage" :defaultData="protocol[1]" />
                        </v-stepper-content>

                        <v-stepper-content step="3">
                            <ThirdStep @next-page="nextPage" @prev-page="prevPage" :defaultData="protocol[2]" />
                        </v-stepper-content>

                        <v-stepper-content step="4">
                            <FourthStep @next-page="nextPage" @prev-page="prevPage" :defaultData="protocol[3]" />
                        </v-stepper-content>

                        <v-stepper-content step="5">
                            <FifthStep @next-page="nextPage" @prev-page="prevPage" :defaultData="protocol[4]" />
                        </v-stepper-content>

                        <v-stepper-content step="6">
                            <SixthStep @next-page="nextPage" @prev-page="prevPage" :defaultData="protocol[5]" :thirdStep="info[2]" />
                        </v-stepper-content>

                        <v-stepper-content step="7">
                            <SeventhStep @finish-page="finishPage" @prev-page="prevPage" :defaultData="protocol[6]" />
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </template>
        </div>
    </div>
</template>

<script>
    import FirstStep from '@/components/Steps/FirstStep.vue';
    import SecondStep from '@/components/Steps/SecondStep.vue';
    import ThirdStep from '@/components/Steps/ThirdStep.vue';
    import FourthStep from '@/components/Steps/FourthStep.vue';
    import FifthStep from '@/components/Steps/FifthStep.vue';
    import SixthStep from '@/components/Steps/SixthStep.vue';
    import SeventhStep from '@/components/Steps/SeventhStep.vue';
    import axios from 'axios';
    import * as LANGUAGE from './../store/language.json';

    export default {
        name: 'StepsProtocol',
        data(){return{
            step: 1,
            finished: false,
            info: [],
            protocol: []
        }},

        methods: {
            translate(word) {
                let wordIndex = null;

                LANGUAGE.forEach((lng, index) => {
                    if(lng.english.toLowerCase() == word.toLowerCase()) {
                    wordIndex = index;
                    }
                });

                if(wordIndex === null) {
                    return word;
                }

                if(this.$store.state.language == 'german') {
                    return LANGUAGE[wordIndex].german;
                } else {
                    return LANGUAGE[wordIndex].english;
                }
            },
            nextPage(info){
                if(this.info[this.step - 1]) {
                    this.info[this.step - 1] = info;
                } else {
                    this.info.push(info);
                }

                this.step = this.step + 1;
            },
            prevPage(){
                this.step = this.step - 1;
            },
            finishPage(info) {
                this.info.push(info)
                this.finished = true;
                this.$nextTick(() => {
                    this.addProtocol();
                })
            },
            addProtocol() {
                axios
                    .post('/protocol', {
                        protocol_id: this.$router.currentRoute.params.protocol_id,
                        lead_id: this.$router.currentRoute.params.id,
                        protocol: JSON.stringify(this.info)
                    }).then(res => console.log(res.data))
            },
            getProtocol(){
                axios
                    .get('/protocol/'+this.$router.currentRoute.params.protocol_id)
                    .then(res => this.protocol = JSON.parse(JSON.parse(res.data.protocol.protocol_info)))
                    .catch(err => console.log(err));
           } 
        },

        created(){
            this.getProtocol();
        },

        components: {
            FirstStep,
            SecondStep,
            ThirdStep,
            FourthStep,
            FifthStep,
            SixthStep,
            SeventhStep
        }
    }
</script>

<style>
    .remove-shadows * {
        box-shadow: none !important;
    }

    .step {
        display: block;
        text-align: center;
        width: min-content;
        font-family: Ubuntu;
    }

    .step-img {
        height: 600px;
        width: 360px;
        border-radius: 44px;
    }

    @media only screen and(max-width: 1000px){
        .step-img {
            display: none;
        }
    }

    .step-text {
        padding-top: 5px;
        font-family: Ubuntu;
    }
    

    .input-protocol {
        border-radius: 15px;
    }

    .btn-disabled {
        opacity: .5;
    }

    .btn-next-page {
        color: white !important; 
        width: 120px !important;
        height: 50px !important; 
        border-radius: 15px !important; 
        font-size: 18px !important; 
        font-weight: 500 !important;
        font-family: Montserrat !important;
    }

    .btn-prev-page {
        color: black !important;
        margin-right: 8px;
    }
</style>