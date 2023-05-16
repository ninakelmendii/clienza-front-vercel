<template>
    <div style="display: flex; justify-content: space-between;">
        <div style="display: flex">
            <img src="@/assets/images/protocol/ThirdStep.png" class="step-img " v-if="smallSteps == 1" />
            <img src="@/assets/images/protocol/ThirdSecond.png" class="step-img " v-else-if="smallSteps == 2" />
            <img src="@/assets/images/protocol/ThirdThird.png" class="step-img " v-else-if="smallSteps == 3" />
            <img src="@/assets/images/protocol/ThirdFourth.png" class="step-img " v-else-if="smallSteps == 4" />
            <img src="@/assets/images/protocol/ThirdFifth.png" class="step-img " v-else />
        </div>
        <div style="width: 100%; text-align: center; margin-left: 25px;" v-if="smallSteps == 1">
                <v-row no-gutters style="margin-bottom: 38px;">
                    <v-col cols="12">
                        <h2 style="text-align: start;">3.1</h2>
                    </v-col>
                    <v-col cols="12" md="6">
                        <span style="font-weight: 400; font-size: 24px; line-height: 30px;">Das haben Sie</span>
                    </v-col>
                    <v-col cols="12" md="6">
                        <span style="font-weight: 400; font-size: 24px; line-height: 30px;">Das wünschen Sie</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.have.have_1"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.wish.wish_1"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.have.have_2"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.wish.wish_2"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.have.have_3"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.wish.wish_3"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.have.have_4"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.wish.wish_4"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.have.have_5"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.wish.wish_5"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.have.have_6"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.wish.wish_6"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.have.have_7"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.wish.wish_7"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row style="justify-items: end;" no-gutters class="mt-4" justify="end">
                    <v-btn
                        color="white"
                        class="btn-next-page btn-prev-page"
                        @click="$emit('prev-page')"
                        >{{translate('Back')}}</v-btn>
                    <v-btn
                        color="#36A5DD"
                        class="btn-next-page"
                        @click="smallSteps = 2"
                        >{{ translate('Next') }}</v-btn>
                </v-row>
        </div>
        <div style="width: 100%; text-align: center; margin-left: 25px;" v-if="smallSteps == 2">
                <v-row no-gutters style="margin-bottom: 38px;">
                    <v-col cols="12">
                        <h2 style="text-align: start;">3.2</h2>
                    </v-col>
                    <v-col cols="12" md="6">
                        <span style="font-weight: 400; font-size: 24px; line-height: 30px;">Das haben Sie</span>
                    </v-col>
                    <v-col cols="12" md="6">
                        <span style="font-weight: 400; font-size: 24px; line-height: 30px;">Das wünschen Sie</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.have.have_1"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.wish.wish_1"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.have.have_2"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.wish.wish_2"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.have.have_3"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.wish.wish_3"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.have.have_4"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.wish.wish_4"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.have.have_5"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.wish.wish_5"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.have.have_6"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.wish.wish_6"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.have.have_7"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.second_step.wish.wish_7"
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
                        @click="smallSteps = 3"
                        >{{ translate('Next') }}</v-btn>
                </v-row>
        </div>
        <div style="width: 100%; text-align: center; margin-left: 25px;" v-if="smallSteps == 3">
                <v-row no-gutters style="margin-bottom: 38px;">
                    <v-col cols="12">
                        <h2 style="text-align: start;">3.3</h2>
                    </v-col>
                    <v-col cols="12" md="6">
                        <span style="font-weight: 400; font-size: 24px; line-height: 30px;">Das haben Sie</span>
                    </v-col>
                    <v-col cols="12" md="6">
                        <span style="font-weight: 400; font-size: 24px; line-height: 30px;">Das wünschen Sie</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.third_step.have.have_1"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.third_step.wish.wish_1"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.third_step.have.have_2"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.third_step.wish.wish_2"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.third_step.have.have_3"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.third_step.wish.wish_3"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.third_step.have.have_4"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.third_step.wish.wish_4"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.third_step.have.have_5"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.third_step.wish.wish_5"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.third_step.have.have_6"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.third_step.wish.wish_6"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.third_step.have.have_7"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.third_step.wish.wish_7"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row style="justify-items: end;" no-gutters class="mt-4" justify="end">
                    <v-btn
                        color="white"
                        class="btn-next-page btn-prev-page"
                        @click="smallSteps = 2"
                        >{{translate('Back')}}</v-btn>
                    <v-btn
                        color="#36A5DD"
                        class="btn-next-page"
                        @click="smallSteps = 4"
                        >{{ translate('Next') }}</v-btn>
                </v-row>
        </div>
        <div style="width: 100%; text-align: center; margin-left: 25px;" v-if="smallSteps == 4">
                <v-row no-gutters style="margin-bottom: 38px;">
                    <v-col cols="12">
                        <h2 style="text-align: start;">3.4</h2>
                    </v-col>
                    <v-col cols="12" md="6">
                        <span style="font-weight: 400; font-size: 24px; line-height: 30px;">Das haben Sie</span>
                    </v-col>
                    <v-col cols="12" md="6">
                        <span style="font-weight: 400; font-size: 24px; line-height: 30px;">Das wünschen Sie</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fourth_step.have.have_1"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fourth_step.wish.wish_1"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fourth_step.have.have_2"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fourth_step.wish.wish_2"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fourth_step.have.have_3"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fourth_step.wish.wish_3"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fourth_step.have.have_4"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fourth_step.wish.wish_4"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fourth_step.have.have_5"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fourth_step.wish.wish_5"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fourth_step.have.have_6"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fourth_step.wish.wish_6"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fourth_step.have.have_7"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fourth_step.wish.wish_7"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row style="justify-items: end;" no-gutters class="mt-4" justify="end">
                    <v-btn
                        color="white"
                        class="btn-next-page btn-prev-page"
                        @click="smallSteps = 3"
                        >{{translate('Back')}}</v-btn>
                    <v-btn
                        color="#36A5DD"
                        class="btn-next-page"
                        @click="smallSteps = 5"
                        >{{ translate('Next') }}</v-btn>
                </v-row>
        </div>
        <div style="width: 100%; text-align: center; margin-left: 25px;" v-if="smallSteps == 5">
                <v-row no-gutters style="margin-bottom: 38px;">
                    <v-col cols="12">
                        <h2 style="text-align: start;">3.5</h2>
                    </v-col>
                    <v-col cols="12" md="6">
                        <span style="font-weight: 400; font-size: 24px; line-height: 30px;">Das haben Sie</span>
                    </v-col>
                    <v-col cols="12" md="6">
                        <span style="font-weight: 400; font-size: 24px; line-height: 30px;">Das wünschen Sie</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fifth_step.have.have_1"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fifth_step.wish.wish_1"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fifth_step.have.have_2"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fifth_step.wish.wish_2"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fifth_step.have.have_3"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fifth_step.wish.wish_3"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fifth_step.have.have_4"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fifth_step.wish.wish_4"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fifth_step.have.have_5"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fifth_step.wish.wish_5"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fifth_step.have.have_6"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fifth_step.wish.wish_6"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fifth_step.have.have_7"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            solo
                            class="input-protocol"
                            v-model="info.fifth_step.wish.wish_7"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row style="justify-items: end;" no-gutters class="mt-4" justify="end">
                    <v-btn
                        color="white"
                        class="btn-next-page btn-prev-page"
                        @click="smallSteps = 4"
                        >{{translate('Back')}}</v-btn>
                    <v-btn
                        color="#36A5DD"
                        class="btn-next-page"
                        @click="$emit('next-page', info)"
                        >{{ translate('Next') }}</v-btn>
                </v-row>
        </div>
    </div>
</template>

<script>
    import * as LANGUAGE from '../../store/language.json';
    export default {
        name: 'ThirdStep',
        props: ['defaultData'],
        data(){return{
            smallSteps: 1,
            info: {
                have: {
                    have_1: "",
                    have_2: "",
                    have_3: "",
                    have_4: "",
                    have_5: "",
                    have_6: "",
                    have_7: "",
                },
                wish: {
                    wish_1: "",
                    wish_2: "",
                    wish_3: "",
                    wish_4: "",
                    wish_5: "",
                    wish_6: "",
                    wish_7: "",
                },
                second_step: {
                    have: {
                        have_1: "",
                        have_2: "",
                        have_3: "",
                        have_4: "",
                        have_5: "",
                        have_6: "",
                        have_7: "",
                    },
                    wish: {
                        wish_1: "",
                        wish_2: "",
                        wish_3: "",
                        wish_4: "",
                        wish_5: "",
                        wish_6: "",
                        wish_7: "",
                    },
                },
                third_step: {
                    have: {
                        have_1: "",
                        have_2: "",
                        have_3: "",
                        have_4: "",
                        have_5: "",
                        have_6: "",
                        have_7: "",
                    },
                    wish: {
                        wish_1: "",
                        wish_2: "",
                        wish_3: "",
                        wish_4: "",
                        wish_5: "",
                        wish_6: "",
                        wish_7: "",
                    },
                },
                fourth_step: {
                    have: {
                        have_1: "",
                        have_2: "",
                        have_3: "",
                        have_4: "",
                        have_5: "",
                        have_6: "",
                        have_7: "",
                    },
                    wish: {
                        wish_1: "",
                        wish_2: "",
                        wish_3: "",
                        wish_4: "",
                        wish_5: "",
                        wish_6: "",
                        wish_7: "",
                    },
                },
                fifth_step: {
                    have: {
                        have_1: "",
                        have_2: "",
                        have_3: "",
                        have_4: "",
                        have_5: "",
                        have_6: "",
                        have_7: "",
                    },
                    wish: {
                        wish_1: "",
                        wish_2: "",
                        wish_3: "",
                        wish_4: "",
                        wish_5: "",
                        wish_6: "",
                        wish_7: "",
                    },
                },
            }
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
            bindParams() {
                if(this.defaultData != undefined) {
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