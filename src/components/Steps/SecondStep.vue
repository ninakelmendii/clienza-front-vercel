<template>
    <div>
        <div v-show="smallSteps == 1">
            <div style="display: flex; justify-content: space-between;">
                <div style="display: flex">
                    <img src="@/assets/images/protocol/SecondStep.png" class="step-img " />
                </div>
                <div style="width: 100%; text-align: center; margin-left: 25px;">
                    <v-row no-gutters>
                        <h1 style="width: 100%; text-align: start;">2.1</h1>
                        <h1 style="font-weight: 500; font-size: 20px; line-height: 25px; margin-bottom: 16px;">{{ translate("Questions") }}</h1>
                        <br>
                        <!-- <div style="width: 100%; text-align: start;">
                            <p>Wann hatten Sie Ihr letztes Gesprach mit ihrem/ihrer Kundenberater/in im Bereich Finanzen?</p>
                        </div> -->
                        <div style="width: 100%">
                            <v-textarea
                                v-model="info.hobbys"
                                solo
                                rows="3"
                                label="Wann hatten Sie Ihr letztes Gespräch mit ihrem/ihrer Kundenberater/in im Bereich Finanzen?"
                                class="input-protocol"
                            ></v-textarea>
                        </div>
                    </v-row>
                    <v-row no-gutters>
                        <span style="font-weight: 400; font-size: 18px; line-height: 20px; margin-top: 36px; font-family: Ubuntu;">{{ translate('How satisfied were you with the conversation (scale 1-10)?') }}</span>
                        <v-col cols="12" style="margin-top: 24px;">
                            <v-row no-gutters justify="space-between">
                                <input type="radio" style="width: 25px; height: 25px" value="1" v-model="info.rate">
                                <input type="radio" style="width: 25px; height: 25px" value="2" v-model="info.rate">
                                <input type="radio" style="width: 25px; height: 25px" value="3" v-model="info.rate">
                                <input type="radio" style="width: 25px; height: 25px" value="4" v-model="info.rate">
                                <input type="radio" style="width: 25px; height: 25px" value="5" v-model="info.rate">
                                <input type="radio" style="width: 25px; height: 25px" value="6" v-model="info.rate">
                                <input type="radio" style="width: 25px; height: 25px" value="7" v-model="info.rate">
                                <input type="radio" style="width: 25px; height: 25px" value="8" v-model="info.rate">
                                <input type="radio" style="width: 25px; height: 25px" value="9" v-model="info.rate">
                                <input type="radio" style="width: 25px; height: 25px" value="10" v-model="info.rate">
                            </v-row>
                            <v-row justify="space-between" no-gutters>
                                <span style="width: 25px; text-align: center; font-weight: 400; font-size: 14px; color: #0E0D0D;">1</span>
                                <span style="width: 25px; text-align: center; font-weight: 400; font-size: 14px; color: #0E0D0D;">10</span>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field
                            solo
                            class="input-protocol"
                            label="Was war positiv an ihrem Gespräch?"
                            v-model="info.questions.question_1"
                        ></v-text-field>
                        <v-text-field
                            solo
                            class="input-protocol"
                            label="Was war negativ an ihrem Gespräch?"
                            v-model="info.questions.question_2"
                        ></v-text-field>
                        <v-text-field
                            solo
                            class="input-protocol"
                            label="Welche Erwatungen hatten Sie und wurden sie erfüllt?"
                            v-model="info.questions.question_3"
                        ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="mt-3" no-gutters justify="end">
                        <v-btn
                            color="white"
                            class="btn-next-page btn-prev-page"
                            @click="$emit('prev-page')"
                            >{{ translate('Back') }}</v-btn>
                        
                        <v-btn
                            color="#36A5DD"
                            class="btn-next-page"
                            @click="smallSteps = 2"
                            >{{translate('Next')}}</v-btn>
                    </v-row>
                </div>
            </div> 
        </div>
        <div v-show="smallSteps == 2">
            <div style="width: 100%; text-align: center;">
                <v-row no-gutters style="margin-bottom: 38px;">
                    <v-col cols="12" class="mb-2">
                        <h1 style="text-align: start;">2.2</h1>
                    </v-col>
                    <v-col cols="12" md="6">
                        <span style="font-weight: 400; font-size: 24px; line-height: 30px; display: flex;">Welche Erwartungen haben Sie an das heutige Gespräch?</span>
                    </v-col>
                    <v-col cols="12" md="6">
                        <span style="font-weight: 400; font-size: 24px; line-height: 30px; display: flex;">Welche Erwartungen haben ich unser Gespräch?</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.first.first"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.second.first"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.first.second"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.second.second"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.first.third"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.second.third"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.first.fourth"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.second.fourth"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.first.fifth"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.second.fifth"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.first.sixth"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.second.sixth"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.first.seventh"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.second.seventh"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row style="justify-items: end;" no-gutters class="mt-4" justify="end">
                    <v-btn
                        color="white"
                        class="btn-next-page btn-prev-page"
                        @click="smallSteps = 1"
                        >{{translate('Back')}}</v-btn>
                    <v-btn
                        color="#36A5DD"
                        class="btn-next-page"
                        @click="$emit('next-page', info)"
                        >{{ translate('Next') }}</v-btn>
                </v-row>
            </div>
        </div>
    </div>
</template>

<script>
    import * as LANGUAGE from '../../store/language.json';

    export default {
        name: 'SecondStep',
        props: ['defaultData'],
        data(){return{
            menu: false,
            date: null,
            info: {
                main_question: "",
                rate: 0,
                questions: {
                    question_1: '',
                    question_2: '',
                    question_3: '',
                },
                second_step: {
                    first: {
                        first: null,
                        second: null,
                        third: null,
                        fourth: null,
                        fifth: null,
                        sixth: null,
                        seventh: null,
                    },
                    second: {
                        first: null,
                        second: null,
                        third: null,
                        fourth: null,
                        fifth: null,
                        sixth: null,
                        seventh: null,
                    }
                }
            },
            smallSteps: 1,
        }},
        computed: {
            birthday() {
                if (!this.date) return null

                const [year, month, day] = this.date.split('-')
                return `${day}.${month}.${year}`;
            },
        },
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
            bindParams() {
                if(this.defaultData != undefined) {
                    console.log(this.defaultData);
                    this.info = this.defaultData;
                }
            }
        },
        created() {
            this.bindParams();
            setTimeout(() => {
                this.bindParams();
            }, 1000);
        }
    }
</script>

<style>
    .col-md-6, .col-12 {
        padding-top: 0;
        padding-bottom: 0;
    }
</style>