<template>
    <div style="display: flex; justify-content: space-between;">
        <div style="display: flex">
            <img src="@/assets/images/protocol/SeventhStep.png" class="step-img " />
        </div>
        <div style="width: 100%; text-align: center; margin-left: 25px;">
            <span style="font-weight: 600; font-size: 24px; line-height: 30px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">Welche dieser Themen interessieren dich auch noch?</span>
            <div :class="{ 'bg-white': !$vuetify.theme.dark }" style="padding: 48px; border-radius: 15px; margin-top: 36px;">
                <div class="container-checkbox">
                    <span style="font-weight: 500; font-size: 24px; line-height: 30px;">Immobilien/Eigenheim</span>
                    <input type="checkbox" v-model="info.real_estate" style="width: 24px; height: 24px">
                </div>
                <div class="container-checkbox">
                    <span style="font-weight: 500; font-size: 24px; line-height: 30px;">Steuern</span>
                    <input type="checkbox" v-model="info.stauern" style="width: 24px; height: 24px">
                </div>
                <div class="container-checkbox">
                    <span style="font-weight: 500; font-size: 24px; line-height: 30px;">Kredit</span>
                    <input type="checkbox" v-model="info.credit" style="width: 24px; height: 24px">
                </div>
                <div class="container-checkbox">
                    <span style="font-weight: 500; font-size: 24px; line-height: 30px;">Karriere</span>
                    <input type="checkbox" v-model="info.career" style="width: 24px; height: 24px">
                </div>
                <div class="container-checkbox">
                    <span style="font-weight: 500; font-size: 24px; line-height: 30px;">Bank</span>
                    <input type="checkbox" v-model="info.bank" style="width: 24px; height: 24px">
                </div>
                <div class="container-checkbox">
                    <textarea v-model="info.remarks" placeholder="Bemerkungen" :class="{ 'bg-dark': $vuetify.theme.dark }" style="width: 100%; background-color: #e5eff5; border-radius: 8px; font-size: 24px; padding: 10px" rows="6"></textarea>
                </div>
            </div>
            <v-col cols="12" style="margin-top: 80px;">
            <v-row no-gutters justify="end">
                <v-btn
                color="white"
                class="btn-next-page btn-prev-page"
                @click="$emit('prev-page')"
                >{{translate('Back')}}</v-btn>
            <v-btn
                color="#36A5DD"
                class="btn-next-page"
                @click="$emit('finish-page', info)"
                ><span style="color: white !important">{{ translate('Finish') }}</span></v-btn>
            </v-row>
        </v-col>
        </div>
    </div>
</template>

<script>
    import * as LANGUAGE from '../../store/language.json';

    export default {
        name: 'SeventhStep',
        props: ['defaultData'],
        data(){return{
            menu: false,
            date: null,
            info: {
                real_estate: false,
                stauern: false,
                credit: false,
                career: false,
                bank: false,
                remarks: null
            },
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

<style>
    .container-checkbox {
        display: flex;
        margin-top: 41px;
        justify-content: space-between;
    }

    .container-checkbox:first-child {
        margin-top: 0;
    }

    .bg-white {
        background: white;
    }

    .bg-dark {
        background: #121212 !important;
        color: white;
    }
</style>