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

          <v-col cols="12" md="12" lg="12" style="margin-top: 24px">
            <DokumenteTable />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NavbarControl from "../Navbar/NavbarControl.vue";
import DokumenteTable from "./DokumenteTable.vue";
import UserControl from "../Navbar/UserControl.vue";
import * as LANGUAGE from '../../store/language.json';

export default {
  name: "DokumenteComponent",
  data() {
    return {
      title: "Dokumente",
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

  components: { DokumenteTable, NavbarControl, UserControl },
};
</script>

<style scoped>
</style>
