<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <v-row>
          <v-col cols="12">
            <v-row style="margin-left: 12px;">
              <v-col cols="12" md="8" class="d-flex justify-start">
                <NavbarControl />
                <h2 style="display: flex; align-items: center;">{{ translate(title) }}</h2>
              </v-col>
              <v-col cols="12" md="4"><UserControl /></v-col>
            </v-row>
          </v-col>

          <!-- <v-col cols="12" md="6">
            <FeedbackFilters />
          </v-col> -->

          <!-- <v-col cols="12" xs="12" sm="12">
            <FeedbackStats />
          </v-col> -->

          <v-col cols="12" xs="12" sm="12" md="12" lg="12">
            <FeedbackTable />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
// import FeedbackFilters from "./FeedbackFilters.vue";
import FeedbackTable from "./FeedbackTable.vue";
// import FeedbackStats from "./FeedbackStats.vue";
import NavbarControl from "../Navbar/NavbarControl.vue";
import UserControl from "../Navbar/UserControl.vue";
import * as LANGUAGE from '../../store/language.json';

export default {
  name: "FeedbackComponent",
  data() {
    return {
      title: "Feedback",
    };
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
  },
  components: { FeedbackTable, NavbarControl, UserControl },
};
</script>