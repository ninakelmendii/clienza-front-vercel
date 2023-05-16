<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <v-row>
          <v-col cols="12" md="12" lg="12">
            <h3>Preis - Leistung</h3>
            <p>Was ist ihnen wichtiger?</p>
          </v-col>

          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="3"
            lg="3"
            class="d-flex align-center"
          >
            <v-btn-toggle color="primary" v-model="preis_leistung" mandatory>
              <v-btn class="select-btn"> Preis </v-btn>
              <v-btn class="select-btn"> Leistung </v-btn>
            </v-btn-toggle>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="9" lg="9">
            <v-switch v-model="switch1" inset label="Rauchen Sie?"></v-switch>
            <v-switch
              v-model="switch2"
              inset
              label="Sind ihre jahrlichen Gesundheitskosten hoher als CHF 1'700?"
            ></v-switch>
          </v-col>

          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="4"
            lg="4"
            class="d-flex align-center"
          >
            <v-btn-toggle color="primary" v-model="insurance" mandatory>
              <v-btn class="insurance-btn">
                <svg width="21" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.9782 3.53323C17.7416 3.28508 16.7869 2.3304 16.5388 1.09381C16.4109 0.462359 15.8548 0 15.2119 0H4.8714C4.23233 0 3.67238 0.458593 3.54449 1.09C3.30014 2.3079 2.31534 3.28892 1.09381 3.53323C0.462359 3.66111 0 4.21727 0 4.86015V11.8817C0 15.6743 1.89817 19.1739 5.07456 21.2449L8.68674 23.5978C9.10014 23.8647 9.56999 24 10.04 24C10.5098 24 10.9796 23.8647 11.3856 23.5978L14.9903 21.2486C18.1702 19.1775 20.0684 15.6708 20.0684 11.8743V4.86068C20.0722 4.2178 19.6098 3.66166 18.9784 3.53376L18.9782 3.53323ZM19.1098 11.8776C19.1098 15.347 17.3732 18.5496 14.4676 20.4474L10.8592 22.8003C10.3555 23.131 9.72401 23.131 9.20902 22.8003L5.59685 20.4474C2.69502 18.5492 0.962187 15.3507 0.962187 11.8811V4.85957C0.962187 4.67164 1.0937 4.51383 1.28163 4.4761C2.90549 4.15285 4.16077 2.89739 4.48784 1.28115C4.52539 1.09322 4.68338 0.961704 4.87131 0.961704H15.2118C15.3997 0.961704 15.5576 1.09322 15.5953 1.28115C15.9185 2.89739 17.174 4.15285 18.7902 4.4761C18.9782 4.51366 19.1097 4.67165 19.1097 4.85957L19.1098 11.8776Z" fill="black"/>
                <path d="M11.2009 8.72801L9.55839 10.2615L8.87799 9.58114C8.69006 9.39321 8.38569 9.39321 8.19759 9.58114C8.00966 9.76906 8.00966 10.0734 8.19759 10.2615L9.20488 11.2688C9.29885 11.3628 9.42292 11.408 9.54319 11.408C9.65965 11.408 9.77992 11.3666 9.87024 11.2801L11.8511 9.43073C12.0467 9.25025 12.0541 8.94587 11.8736 8.75033C11.7007 8.55877 11.3964 8.54752 11.201 8.72801L11.2009 8.72801Z" fill="black"/>
                <path d="M10.0315 5.10059C7.27624 5.10059 5.03223 7.34465 5.03223 10.0998C5.03223 12.8587 7.27629 15.1026 10.0315 15.1026C12.7903 15.1026 15.0343 12.8586 15.0343 10.0998C15.0381 7.3446 12.7904 5.10059 10.0315 5.10059ZM10.0315 14.144C7.80248 14.144 5.99083 12.3286 5.99083 10.0995C5.99083 7.87049 7.80261 6.05888 10.0315 6.05888C12.2605 6.05888 14.0759 7.87066 14.0759 10.0995C14.0759 12.3322 12.2643 14.144 10.0315 14.144Z" fill="black"/>
                </svg>
                      Standard</v-btn
              >
              <v-btn class="insurance-btn">
                <v-icon left>mdi-home</v-icon> Hausarzt
              </v-btn>
              <v-btn class="insurance-btn">
                <v-icon left>mdi-hospital-box</v-icon> HMO
              </v-btn>
              <v-btn class="insurance-btn">
                <v-icon left>mdi-phone</v-icon> Telemedizin
              </v-btn>
              <v-btn class="insurance-btn">
                <v-icon left>mdi-share-variant</v-icon> Diverse
              </v-btn>
            </v-btn-toggle>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="12" lg="12">
            <v-slider
              v-model="selected"
              :tick-labels="ticksLabels"
              :max="5"
              step="1"
              ticks="always"
              tick-size="6"
            ></v-slider>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="12" lg="12">
            <h3>Ambulante Deckung</h3>
          </v-col>

          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="4"
            lg="4"
            class="d-flex align-center"
          >
            <v-btn-toggle
              color="primary"
              v-model="ambulante_deckung_one"
              mandatory
              multiple
            >
              <v-btn class="insurance-btn">
                <v-icon left>mdi-pill</v-icon> Hausarzt</v-btn
              >
              <v-btn class="insurance-btn">
                <v-icon left>mdi-car</v-icon> Transport
              </v-btn>
              <v-btn class="insurance-btn">
                <v-icon left>mdi-airplane</v-icon> Auslandsshtz
              </v-btn>
              <v-btn class="insurance-btn">
                <v-icon left>mdi-dumbbell</v-icon> Gesundheits
              </v-btn>
            </v-btn-toggle>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="12" lg="12">
            <h3></h3>
          </v-col>

          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="4"
            lg="4"
            class="d-flex align-center"
          >
            <v-btn-toggle
              color="primary"
              v-model="ambulante_deckung_two"
              mandatory
              multiple
            >
              <v-btn class="insurance-btn">
                <v-icon left>mdi-umbrella</v-icon> Pravention</v-btn
              >
              <v-btn class="insurance-btn">
                <v-icon left>mdi-leaf</v-icon> Alternativemedizin
              </v-btn>
              <v-btn class="insurance-btn">
                <v-icon left>mdi-glasses </v-icon> Brille/Sehhilfe
              </v-btn>
              <v-btn class="insurance-btn">
                <v-icon left>mdi-tooth</v-icon> Zahnstellungs
              </v-btn>
            </v-btn-toggle>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="12" lg="12">
            <h3>Spitalwahl</h3>
          </v-col>

          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="4"
            lg="4"
            class="d-flex align-center"
          >
            <v-btn-toggle color="primary" v-model="spitalwahl" mandatory multiple>
              <v-btn class="insurance-btn">
                <v-icon left>mdi-hospital-building</v-icon> Allgemein</v-btn
              >
              <v-btn class="insurance-btn">
                <v-icon left>mdi-hospital-marker</v-icon> Halbprivat
              </v-btn>
              <v-btn class="insurance-btn">
                <v-icon left>mdi-heart-pulse</v-icon> Privat
              </v-btn>
              <v-btn class="insurance-btn">
                <v-icon left>mdi-hospital</v-icon> Flexibel
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="12" lg="12" class="d-flex justify-end">
          <v-btn @click="goBack" class="mr-2">Back</v-btn>
          <v-btn color="primary" class="ml-2">Finish</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
export default {
  name: "RequestComponent",
  data() {
    return {
      title: "New Request",
      preis_leistung: undefined,
      switch1: true,
      switch2: false,
      insurance: undefined,
      value: 0,
      selected: 0,
      ticksLabels: [300, 500, 1000, 1500, 2000, 2500],
      ambulante_deckung_one: undefined,
      ambulante_deckung_two: undefined,
      spitalwahl: undefined,
    };
  },

  methods: {
    goBack(){
      history.back();
    }
  }
};
</script>
  
<style scoped>
.theme--light.v-btn-toggle:not(.v-btn-toggle--group),
.theme--dark.v-btn-toggle:not(.v-btn-toggle--group) {
  background: transparent;
}

.select-btn {
  padding: 23px !important;
  border-radius: 35px !important;
  width: 50% !important;
  border: none !important;
  margin: 0 30px 0 0;
}

.insurance-btn {
  padding: 23px !important;
  border-radius: 10px !important;
  width: 50% !important;
  border: none !important;
  margin: 0 30px 0 0;
}

button.select-btn.v-btn.v-item--active.v-btn--active.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default,
button.insurance-btn.v-btn.v-item--active.v-btn--active.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default {
  background: #36a5dd;
  color: #fff;
  height: 55px !important;
}

button.insurance-btn.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default,
button.select-btn.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--default {
  background: #fff;
  height: 55px !important;
}
</style>
  