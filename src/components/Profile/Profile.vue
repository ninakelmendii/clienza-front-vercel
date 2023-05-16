<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <v-row>
          <v-col cols="12" md="12" lg="12" class="d-flex">
            <h2>{{ translate(title) }}</h2>
            <UserControl />
          </v-col>

          <v-col cols="12" md="12" lg="12">
            <ProfileCards />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import ProfileCards from "./ProfileCards.vue";
import * as LANGUAGE from '../../store/language.json';
import UserControl from "../Navbar/UserControl.vue";

export default {
  name: "ProfileComponent",
  data() {
    return {
      title: "Profile",
    };
  },
  components: {
    ProfileCards,
    UserControl
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
  }
};
</script>
  
<style scoped>
@import url("@/assets/style/style.css");
</style>
  