<template>
    <v-row no-gutters>
        <v-col cols="12">
            <v-row no-gutters class="images-container" justify="center">
                <v-col cols="8" lg="1">
                    <img src="@/assets/images/protocol/FifthStep/1.png" alt="First"/>
                    <span>Liquidität</span>
                </v-col>
                <v-col cols="8" lg="1">
                    <img src="@/assets/images/protocol/FifthStep/2.png" alt="Second"/>
                    <span>Lebensstandard erhalten</span>
                </v-col>
                <v-col cols="8" lg="1">
                    <img src="@/assets/images/protocol/FifthStep/3.png" alt="Third"/>
                    <span>Auto anschaffen</span>
                </v-col>
                <v-col cols="8" lg="1">
                    <img src="@/assets/images/protocol/FifthStep/4.png" alt="Fourth"/>
                    <span>Sicherheit fur meine Kinder</span>
                </v-col>
                <v-col cols="8" lg="1">
                    <img src="@/assets/images/protocol/FifthStep/5.png" alt="Fifth"/>
                    <span>Weiterbildung</span>
                </v-col>
                <v-col cols="8" lg="1">
                    <img src="@/assets/images/protocol/FifthStep/6.png" alt="Sixth"/>
                    <span>Eigenheim</span>
                </v-col>
                <v-col cols="8" lg="1">
                    <img src="@/assets/images/protocol/FifthStep/7.png" alt="Seventh"/>
                    <span>Weltreise/Reisen</span>
                </v-col>
                <v-col cols="8" lg="1">
                    <img src="@/assets/images/protocol/FifthStep/8.png" alt=""/>
                    <span>Andere</span>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12" class="fifth-container">
            <v-row justify="center">
                <v-col cols="10" lg="1"></v-col>
                <v-col cols="10" lg="3">Ziel</v-col>
                <v-col cols="10" lg="3">Budget</v-col>
                <v-col cols="10" lg="3">Zeitraum</v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="10" lg="1">1.</v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="items" v-model="info.goal.goal_1"></v-select>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-text-field type="number" v-model="info.budget.budget_1"></v-text-field>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="second_items" v-model="info.zeitraum.zeitraum_1"></v-select>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="10" lg="1">2.</v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="items" v-model="info.goal.goal_2"></v-select>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-text-field type="number" v-model="info.budget.budget_2"></v-text-field>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="second_items" v-model="info.zeitraum.zeitraum_2"></v-select>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="10" lg="1">3.</v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="items" v-model="info.goal.goal_3"></v-select>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-text-field type="number" v-model="info.budget.budget_3"></v-text-field>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="second_items" v-model="info.zeitraum.zeitraum_3"></v-select>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="10" lg="1">4.</v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="items" v-model="info.goal.goal_4"></v-select>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-text-field type="number" v-model="info.budget.budget_4"></v-text-field>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="second_items" v-model="info.zeitraum.zeitraum_4"></v-select>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="10" lg="1">5.</v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="items" v-model="info.goal.goal_5"></v-select>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-text-field type="number" v-model="info.budget.budget_5"></v-text-field>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="second_items" v-model="info.zeitraum.zeitraum_5"></v-select>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="10" lg="1">6.</v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="items" v-model="info.goal.goal_6"></v-select>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-text-field type="number" v-model="info.budget.budget_6"></v-text-field>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="second_items" v-model="info.zeitraum.zeitraum_6"></v-select>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="10" lg="1">7.</v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="items" v-model="info.goal.goal_7"></v-select>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-text-field type="number" v-model="info.budget.budget_7"></v-text-field>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="second_items" v-model="info.zeitraum.zeitraum_7"></v-select>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="10" lg="1">8.</v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="items" v-model="info.goal.goal_8"></v-select>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-text-field type="number" v-model="info.budget.budget_8"></v-text-field>
                </v-col>
                <v-col cols="10" lg="3">
                    <v-select :items="second_items" v-model="info.zeitraum.zeitraum_8"></v-select>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="12"> 
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
                    ><span style="color: white !important">{{ translate('Next') }}</span></v-btn>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    import * as LANGUAGE from '../../store/language.json';

    export default {
        name: 'FifthStep',
        props: ['defaultData'],
        data(){return {
            items: ["Liquidität", "Lebensstandard erhalten", "Auto anschaffen", "Sicherheit fur meine Kinder", "Weiterbildung", "Eigenheim", "Weltreise/Reisen", "Andere"],
            second_items: [
            "1 Monat bis 1 Jahr",
            "1 Jahr bis 5 Jahre",
            "5 Jahre bis 10 Jahre",
            "10 Jahre bis 15 Jahre",
            "Mehr als 15 Jahre",
            ],
            info: {
                goal: {
                    goal_1: "",
                    goal_2: "",
                    goal_3: "",
                    goal_4: "",
                    goal_5: "",
                    goal_6: "",
                    goal_7: "",
                    goal_8: "",

                },
                budget: {
                    budget_1: '',
                    budget_2: '',
                    budget_3: '',
                    budget_4: '',
                    budget_5: '',
                    budget_6: '',
                    budget_7: '',
                    budget_8: '',
                },
                zeitraum: {
                    zeitraum_1: "",
                    zeitraum_2: "",
                    zeitraum_3: "",
                    zeitraum_4: "",
                    zeitraum_5: "",
                    zeitraum_6: "",
                    zeitraum_7: "",
                    zeitraum_8: "",
                }
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

<style>
    .images-container > div {
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    
    .images-container > div > img {
        border-radius: 15px;
    }

    .images-container {
        gap: 30px;
    }

    .fifth-container {
        text-align: center;
        margin-top: 50px;
    }
</style>