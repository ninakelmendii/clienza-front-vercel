<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="4" lg="4">
        <v-text-field
          v-model="search"
          rounded
          filled
          background-color="white"
          :label="translate('Search')"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4">
        <v-select
          v-model="search"
          rounded
          filled
          background-color="white"
          :label="translate('Status')"
          prepend-inner-icon="mdi-filter-outline"
        ></v-select>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4">
        <v-select
          v-model="search"
          rounded
          filled
          background-color="white"
          :label="translate('Feedback zu spat')"
          prepend-inner-icon="mdi-comment-quote-outline"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import * as LANGUAGE from '../../store/language.json';

  export default {
    name: "FeedbackFilters",
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
  }
</script>