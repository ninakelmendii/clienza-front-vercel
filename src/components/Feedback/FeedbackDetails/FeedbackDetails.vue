<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="8" class="d-flex justify-start">
                <NavbarControl />
                <h2 style="display: flex; align-items: center;">{{ translate(title) }}</h2>
              </v-col>
              <v-col cols="12" md="4" style="margin-right: -12px;"><UserControl /></v-col>
            </v-row>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="12" lg="12">
            <FeedbackInfo />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserControl from '@/components/Navbar/UserControl.vue';
import * as LANGUAGE from '../../../store/language.json';
import NavbarControl from '@/components/Navbar/NavbarControl.vue';
import FeedbackInfo from './FeedbackInfo.vue';

export default {
  name: "FeedbackDetailsComponent",
  data() {
    return {
      title: "Feedback Details",
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

  components: { NavbarControl, UserControl, FeedbackInfo },
};
</script>

<style scoped>
</style>
