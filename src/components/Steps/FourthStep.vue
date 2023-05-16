<template>
    <div :class="{ 'fourth-step-container': !$vuetify.theme.dark }" style="display: flex; justify-content: space-between;">
        <v-col cols="12" lg="5">
             <!-- First part -->
            <v-col cols="12">
                <span style="font-weight: 600; font-size: 24px; line-height: 30px;">Wo stehen Sie heute</span>
                <v-row no-gutters justify="space-between" style="margin-top: 24px">
                    <span style="font-weight: 400; font-size: 18px; line-height: 21px; font-family: Montserrat;">Einnahmen</span>
                    <span style="font-weight: 400; font-size: 18pgex; line-height: 21px; font-family: Montserrat;">Betrag(in CHF)</span>
                </v-row>
                <div :class="{ 'bg-white': !$vuetify.theme.dark }" style="padding: 24px; border-radius: 15px; margin-top: 24px;">
                    <span class="normal-text">Anzahl Monatslöhne:</span>
                    <v-row no-gutters justify="space-between" style="margin-top: 16px; margin-bottom: 24px;">
                        <div>
                            <input type="radio" v-model="info.revenue.yearly_payments" value="12"> 12x
                        </div>
                        <div>
                            <input type="radio" v-model="info.revenue.yearly_payments" value="13"> 13x (falls 13x, Jahreslohn / 12)
                        </div>
                    </v-row>
                    <span class="normal-text">
                        Wie viel verdienen Sie monatlich?
                    </span>
                    <v-row style="margin-top: 24px;">
                        <v-col cols="12" md="6">
                            <span class="normal-text">Brutto Monatslöhne</span>
                            <v-text-field v-model="info.revenue.bruto_wage" type="number"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <span class="normal-text">Netto Monatslöhne</span>
                            <v-text-field v-model="info.revenue.neto_wage" type="number"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <span>Welche zusätzlichen regelmässigen Einnahmen haben Sie monatlich?</span>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="info.revenue.monthly_regular_wage" type="number"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="mt-8">
                        <v-col cols="12" md="6">
                            <span>Welche einmaligen Zuflusse haben Sie?</span>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="info.revenue.unique_inflows" type="number"></v-text-field>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
            <!-- Second part -->
            <v-col cols="12" style="margin-top: 60px;">
                <span style="font-weight: 600; font-size: 24px; line-height: 30px;">Wo stehen Sie heute</span>
                <v-row no-gutters justify="space-between" style="margin-top: 24px">
                    <span style="font-weight: 400; font-size: 18px; line-height: 21px; font-family: Montserrat;">Einnahmen Partner</span>
                    <span style="font-weight: 400; font-size: 18pgex; line-height: 21px; font-family: Montserrat;">Betrag(in CHF)</span>
                </v-row>
                <div :class="{ 'bg-white': !$vuetify.theme.dark }" style="padding: 24px; border-radius: 15px; margin-top: 24px;">
                    <span class="normal-text">Anzahl Monatslöhne:</span>
                    <v-row no-gutters justify="space-between" style="margin-top: 16px; margin-bottom: 24px;">
                        <div>
                            <input type="radio" v-model="info.revenue_partner.yearly_payments" value="12"> 12x
                        </div>
                        <div>
                            <input type="radio" v-model="info.revenue_partner.yearly_payments" value="13"> 13x (falls 13x, Jahreslohn / 12)
                        </div>
                    </v-row>
                    <span class="normal-text">
                        Wie viel verdienen Sie monatlich?
                    </span>
                    <v-row style="margin-top: 24px;">
                        <v-col cols="12" md="6">
                            <span class="normal-text">Brutto Monatslöhne</span>
                            <v-text-field v-model="info.revenue_partner.bruto_wage" type="number"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <span class="normal-text">Netto Monatslöhne</span>
                            <v-text-field v-model="info.revenue_partner.neto_wage" type="number"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <span>Welche zusätzlichen regelmässigen Einnahmen haben Sie monatlich?</span>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="info.revenue_partner.monthly_regular_wage" type="number"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="mt-8">
                        <v-col cols="12" md="6">
                            <span>Welche einmaligen Zuflusse haben Sie?</span>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="info.revenue_partner.unique_inflows" type="number"></v-text-field>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-col>
        
        <v-col cols="12" lg="7">
            <v-row no-gutters justify="space-between">
                <span style="font-weight: 500; font-family: Montserrat; font-size: 20px; line-height: 25px;">Ausgaben (monatlich)</span>
                <span style="font-weight: 500; font-family: Montserrat; font-size: 20px; line-height: 25px;">Betrag (in CHF)</span>
            </v-row>
            <div :class="{ 'bg-white': !$vuetify.theme.dark }" style="border-radius: 15px; padding: 24px 16px; margin-top: 24px;">
                <v-row no-gutters justify="space-between" align="center">
                    <v-col>
                        <span>Wohnen (Miete, Nebenkosten)</span>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="info.expenses.housing" type="number"></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" align="center">
                    <v-col>
                        <span>Steuern</span> 
                    </v-col>
                    <v-col>
                        <v-text-field v-model="info.expenses.steuern" type="number"></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" align="center">
                    <v-col>
                        <span>Krankenkasse</span>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="info.expenses.health_insurance" type="number"></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" align="center">
                    <v-col>
                        <span>Versicherungen (z.B. Auto, Hausrat, Rechtsschutz, usw)</span>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="info.expenses.insurance" type="number"></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" align="center">
                    <v-col>
                        <span>Essen, Trinken (Rauchen)</span>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="info.expenses.eating_drinking" type="number"></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" align="center">
                    <v-col>
                        <span>Mobilität (Leasing, Treibstoff, ÖV, Strassenabgaben)</span>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="info.expenses.mobility" type="number"></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" align="center">
                    <v-col>
                        <span>Internet, Telefon, Fernsehen, Serafe</span>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="info.expenses.internet_telefon" type="number"></v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between" align="center">
                    <v-col>
                        <span>Sonstiges (Hobbys, Kredit, Alimente)</span>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="info.expenses.other" type="number"></v-text-field>
                    </v-col>
                </v-row>
            </div>
            <div style="margin-top: 36px; display: flex; justify-content: space-between; flex-direction: column;">
                <v-col cols="12" lg="6">
                    <span style="font-weight: 400; font-size: 20px; line-height: 25px;">Summe Einnahmen (E)</span>
                    <v-text-field label="CH" readonly solo type="number" style="margin-top: 16px; border-radius: 15px;" v-model="info.total_revenue"></v-text-field>
                
                    <span style="font-weight: 400; font-size: 20px; line-height: 25px;">Summe Ausgaben (A)</span>
                    <v-text-field label="CH" readonly solo type="number" style="margin-top: 16px; border-radius: 15px;" v-model="info.total_expenses"></v-text-field>

                    <span style="font-weight: 400; font-size: 20px; line-height: 25px;">Budget (E-A)</span>
                    <v-text-field label="CH" readonly solo type="number" style="margin-top: 16px; border-radius: 15px;" v-model="info.budget"></v-text-field>
                </v-col>
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
            </div>
        </v-col>
    </div>
</template>

<script>
import * as LANGUAGE from '../../store/language.json';
    export default {
        name: 'FourthStep',
        props: ['defaultData'],
        data(){return{
            info: {
                revenue: {
                    yearly_payments: 12,
                    bruto_wage: 0,
                    neto_wage : 0,
                    monthly_regular_wage: 0,
                    unique_inflows: 0,
                },
                revenue_partner: {
                    yearly_payments: 12,
                    bruto_wage: 0,
                    neto_wage : 0,
                    monthly_regular_wage: 0,
                    unique_inflows: 0,
                },
                expenses: {
                    housing: 0,
                    steuern: 0,
                    health_insurance: 0,
                    insurance: 0,
                    eating_drinking: 0,
                    mobility: 0,
                    internet_telefon: 0,
                    other: 0,
                },
                total_revenue: 0,
                total_expenses: 0,
                budget: 0,
            },
        }},
        watch: {
            info: {
                handler(val) {
                    const revenueTotal = ((parseInt(val.revenue.neto_wage || 0) + parseInt(val.revenue.monthly_regular_wage || 0) + parseInt(val.revenue.unique_inflows || 0)) * parseInt(val.revenue.yearly_payments || 0));
                    const revenuePartnerTotal = ((parseInt(val.revenue_partner.neto_wage || 0) + parseInt(val.revenue_partner.monthly_regular_wage || 0) + parseInt(val.revenue_partner.unique_inflows || 0)) * parseInt(val.revenue_partner.yearly_payments || 0));
                
                    const expensesTotal = parseInt(val.expenses.housing || 0) + parseInt(val.expenses.steuern || 0) + parseInt(val.expenses.health_insurance || 0) + parseInt(val.expenses.insurance || 0) + parseInt(val.expenses.eating_drinking || 0) + parseInt(val.expenses.mobility || 0) + parseInt(val.expenses.internet_telefon || 0) + parseInt(val.expenses.other || 0);
 
                    const totalRevenueYearly = revenueTotal + revenuePartnerTotal;
                    const expensesYearly = expensesTotal * 12;

                    this.info.total_expenses = expensesYearly;
                    this.info.total_revenue = totalRevenueYearly;

                    this.info.budget = totalRevenueYearly - expensesYearly;
                },
                deep: true
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
    .fourth-step-container * {
        color: #333333;
    }

    .normal-text {
        font-weight: 400; 
        font-size: 16px; 
        font-family: Montserrat; 
        line-height: 20px;
    }

    .bg-white {
        background: white;
    }
</style>