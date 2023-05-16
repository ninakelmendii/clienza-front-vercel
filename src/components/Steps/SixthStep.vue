<template>
    <v-row no-gutters>
        <v-col cols="11" lg="5">
            <v-row no-gutters style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-weight: 500; font-size: 24px; margin-bottom: 24px">
                Aktuell
                <v-col style="visibility: hidden;">
                    <v-row>
                        <div style="width: 50%;">
                        <v-menu
                            ref="menu"
                            v-model="menu_2"
                            :close-on-content-click="false"
                            :return-value.sync="lead_calendar"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="lead_calendar"
                                :label="translate('Date')"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="lead_calendar"
                            :min="new Date().toISOString()"
                            :first-day-of-week="1"
                            :allowed-dates="allowedDates"
                            no-title
                            scrollable
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(lead_calendar)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                        </div>
                        <div
                        style="width: 50%;  padding: 0 10px;"
                        >
                        <v-form style="display: flex; gap: 10px;" ref="formSchedule">
                            <v-text-field
                                v-model="hour"
                                :rules="hourRules"
                                :label="translate('Hour')"
                                type="number"
                                style="width: 50%"
                            />
                            <v-text-field
                                v-model="minute"
                                :rules="minuteRules"
                                :label="translate('Minutes')"
                                type="number"
                                style="width: 50%"
                            />
                        </v-form>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
            <div class="inputs_container">
                <div v-for="(h) in have" :key="h" class="step-title-container">
                    <!-- <h1 class="step-title">2.{{ step_title(index) + 1 }}</h1> -->
                    <v-text-field
                        solo
                        class="input-protocol"
                        readonly
                        :value="h"
                    ></v-text-field>
                </div>
            </div>
            <!-- <div>
                <label class="insurance_container">
                    <input type="checkbox" value="first_insurance" v-model="info.actual.hi_1">
                    <div class="insurance-radio">
                            {{ "Krankasen" | capitalize }}
                    </div>
                </label>
                <label class="insurance_container">
                    <input type="checkbox" value="second_insurance" v-model="info.actual.hi_2">
                    <div class="insurance-radio">
                            {{ "AUTOVERSICHERUNG" | capitalize }}
                    </div>
                </label>
                <label class="insurance_container">
                    <input type="checkbox" value="third_insurance" v-model="info.actual.hi_3">
                    <div class="insurance-radio">
                            {{ "RECHTSSCHUTZ" | capitalize }}
                    </div>
                </label>
                <label class="insurance_container">
                    <input type="checkbox" value="fourth_insurance" v-model="info.actual.hi_4">
                    <div class="insurance-radio">
                            {{ "HAUSRAT/PRIVATHAFTPFLICHT" | capitalize }}
                    </div>
                </label>
                <label class="insurance_container">
                    <input type="checkbox" value="fifth_insurance" v-model="info.actual.hi_5">
                    <div class="insurance-radio">
                            {{ "ALTERVORSORGE" | capitalize }}
                    </div>
                </label>
            </div> -->
        </v-col>
        <v-col cols="11" lg="1" class="divider">
            <div></div>
        </v-col>
        <v-col cols="11" lg="5">
            <v-row no-gutters style="gap: 40px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-weight: 500; font-size: 24px; margin-bottom: 24px">
                <span>Soll Termin</span>
                <v-col>
                    <v-row>
                        <div style="width: 50%;">
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="lead_calendar"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                :label="translate('Date')"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="info.dated"
                            :min="new Date().toISOString()"
                            :first-day-of-week="1"
                            :allowed-dates="allowedDates"
                            no-title
                            scrollable
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(lead_calendar)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                        </div>
                        <div
                        style="width: 50%;  padding: 0 10px;"
                        >
                        <v-form style="display: flex; gap: 10px;" ref="formSchedule">
                            <v-text-field
                                v-model="info.hour"
                                :rules="hourRules"
                                :label="translate('Hour')"
                                type="number"
                                style="width: 50%"
                            />
                            <v-text-field
                                v-model="info.minutes"
                                :rules="minuteRules"
                                :label="translate('Minutes')"
                                type="number"
                                style="width: 50%"
                            />
                        </v-form>
                        </div>
                    </v-row>
                </v-col>
            </v-row>
            <div class="inputs_container">
                <div v-for="w in wish" :key="w">
                    <v-text-field
                        solo
                        class="input-protocol"
                        readonly
                        :value="w"
                    ></v-text-field>
                </div>
            </div>
            <!-- <div>
                <label class="insurance_container">
                    <input type="checkbox" value="first_insurance_2" v-model="info.dated_hi.hi_1">
                    <div class="insurance-radio">
                            {{ "Krankasen" | capitalize }}
                    </div>
                </label>
                <label class="insurance_container">
                    <input type="checkbox" value="second_insurance_2" v-model="info.dated_hi.hi_2">
                    <div class="insurance-radio">
                            {{ "AUTOVERSICHERUNG" | capitalize }}
                    </div>
                </label>
                <label class="insurance_container">
                    <input type="checkbox" value="third_insurance_2" v-model="info.dated_hi.hi_3">
                    <div class="insurance-radio">
                            {{ "RECHTSSCHUTZ" | capitalize }}
                    </div>
                </label>
                <label class="insurance_container">
                    <input type="checkbox" value="fourth_insurance_2" v-model="info.dated_hi.hi_4">
                    <div class="insurance-radio">
                            {{ "HAUSRAT/PRIVATHAFTPFLICHT" | capitalize }}
                    </div>
                </label>
                <label class="insurance_container">
                    <input type="checkbox" value="fifth_insurance_2" v-model="info.dated_hi.hi_5">
                    <div class="insurance-radio">
                            {{ "ALTERVORSORGE" | capitalize }}
                    </div>
                </label>
            </div> -->
        </v-col>
        <v-col cols="12" style="margin-top: 80px;">
            <v-row no-gutters justify="end">
                <v-btn
                color="white"
                class="btn-next-page btn-prev-page"
                @click="$emit('prev-page')"
                >{{ translate('Back') }}</v-btn>
            <v-btn
                color="#36A5DD"
                class="btn-next-page"
                @click="$emit('next-page', info)"
                ><span style="color: white !important">{{translate('Next')}}</span></v-btn>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import * as LANGUAGE from '../../store/language.json';

    export default {
        name: 'SixthStep',
        props: ['defaultData', 'thirdStep'],
        data(){return {
            first_ins: null,
            second_ins: null,
            third_ins: null,
            fourth_ins: null,
            fifth_ins: null,
            menu_2: false,
            date_2: null,
            info: {
                dated: null,
                hour: null,
                minutes: null,
                actual: {
                    hi_1: '',
                    hi_2: '',
                    hi_3: '',
                    hi_4: '',
                    hi_5: '',
                },
                dated_hi: {
                    hi_1: '',
                    hi_2: '',
                    hi_3: '',
                    hi_4: '',
                    hi_5: '',
                }
            },
            insurances: [
                { name: 'KRANKENKASSE' },
                { name: 'AUTOVERSICHERUNG' },
                { name: 'RECHTSSCHUTZ' },
                { name: 'HAUSRAT/PRIVATHAFTPFLICHT' },
                { name: 'ALTERVORSORGE' },
            ],

            have: [],
            wish: []
        }},
        filters: {
            capitalize: function (value) {
                if (!value) return ''
                return value.toUpperCase();
            }
        },
        computed: {
            date() {
                if (!this.info.dated) return null

                const [year, month, day] = this.info.dated.split('-')
                return `${day}.${month}.${year}`;
            },
        },
        methods: {
            step_title(index){
                return Math.floor((index+1) / 7);
            },

            fill_have(third_step = []) {
                const have = [];

                if(third_step.length == 0) this.have = have;

                const have1 = Object.values(third_step.have);
                const have2 = Object.values(third_step.second_step.have);
                const have3 = Object.values(third_step.third_step.have);
                const have4 = Object.values(third_step.fourth_step.have);
                const have5 = Object.values(third_step.fifth_step.have);

                have.push(...have1, ...have2, ...have3, ...have4, ...have5);

                this.have = have;
            },
            
            fill_wish(third_step = []) {
                const wish = [];

                if(third_step.length == 0) this.wish = wish;

                const wish1 = Object.values(third_step.wish);
                const wish2 = Object.values(third_step.second_step.wish);
                const wish3 = Object.values(third_step.third_step.wish);
                const wish4 = Object.values(third_step.fourth_step.wish);
                const wish5 = Object.values(third_step.fifth_step.wish);

                wish.push(...wish1, ...wish2, ...wish3, ...wish4, ...wish5);

                this.wish = wish;
            },

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
                    this.info = this.defaultData;
                }
            }
        },
        mounted() {
            console.log(this.thirdStep);
        },

        watch: {
            thirdStep:{
                handler(val){
                    console.log(val);
                    this.fill_have(val);
                    this.fill_wish(val);
                },
                deep: true
            }
        },

        created() {
            this.bindParams();
            setTimeout(() => {
                this.bindParams();
            }, 1000);
        },
    }
</script>

<style>
    .step-title-container > h1 {
        display: none;
    }


    .step-title-container:nth-child(7n+5) > h1, .step-title-container:first-child > h1  {
        display: block;
    }

    .insurance-radio {
        padding: 24px;
        background-color: #CACACA;
        color: white;
        font-weight: 700;
        font-size: 20px;
        line-height: 25px;
        border-radius: 5px;
    }

    .insurance_container > input {
        appearance: none;
    }

    input:checked ~ .insurance-radio {
        background-color: #36A5DD;
    }

    .insurance-radio {
        margin-top: 20px;
    }

    .divider {
        display: flex;
        justify-content: center;
    }

    .divider > div {
        background-color: #1A1F3A;
        width: 15px;
    }
    
</style>