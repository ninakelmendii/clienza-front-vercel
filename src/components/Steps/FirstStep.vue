<template>
    <div style="display: flex; justify-content: space-between;">
        <div style="display: flex;" class="d-none d-sm-none d-md-flex">
            <img src="@/assets/images/protocol/FirstStep.png" class="step-img " />
        </div>
        <div style="width: 100%; text-align: center; margin-left: 25px;">
            <v-row no-gutters>
                <v-col cols="12" md="6">
                    <v-text-field
                        :label="translate('Name')"
                        v-model="info.first_name"
                        solo
                        class="input-protocol"
                        style="margin-right: 12px;"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        :label="translate('Last name')"
                        v-model="info.last_name"
                        solo
                        style="margin-left: 12px;"
                        class="input-protocol"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        :label="translate('Street')+'/Nr.'"
                        v-model="info.street_nr"
                        solo
                        class="input-protocol"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        label="PLZ/Ort"
                        v-model="info.plz"
                        solo
                        class="input-protocol"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="info.birthday_date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="birthday"
                                :label="translate('Birthday')"
                                class="input-protocol"
                                readonly
                                solo
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="info.birthday_date"
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
                            @click="$refs.menu.save(info.birthday_date)"
                        >
                            OK
                        </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        :label="translate('Hobbys')"
                        v-model="info.hobby"
                        solo
                        class="input-protocol"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        :label="translate('Profession')"
                        v-model="info.profession"
                        solo
                        class="input-protocol"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        :label="translate('Number of persons in the household')"
                        v-model="info.nr_family_members"
                        type="number"
                        solo
                        class="input-protocol"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters style="height: 100%; margin-top: 50px;" justify="end">
                <div>
                    <v-btn
                        color="#36A5DD"
                        class="btn-next-page"
                        @click="$emit('next-page', info)"
                        >{{ translate('Next') }}</v-btn>
                </div>
            </v-row>
        </div>
    </div>
</template>

<script>
import * as LANGUAGE from '../../store/language.json';

    export default {
        name: 'FirstStep',
        props: ['defaultData'],
        data(){return{
            menu: false,
            info: {
                first_name: '',
                last_name: '',
                street_nr: '',
                plz: '',
                profession: '',
                nr_family_members: null,
                birthday_date: null,
                hobby: null,
            },
        }},
        computed: {
            birthday() {
                if (!this.info.birthday_date) return null

                const [year, month, day] = this.info.birthday_date.split('-')
                return `${day}.${month}.${year}`;
            },
            canNextPage() {
                if(this.info.name != '' && this.info.vorname != '' && this.info.strasse != '' && this.info.plz != '' &&  this.info.beruf != '' && this.date != null) {
                    return true;
                }

                return false;
            }
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
                    console.log('running');
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