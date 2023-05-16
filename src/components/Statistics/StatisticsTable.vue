<template>
  <v-row>
    <v-col cols="12" md="12" lg="12">
      <v-data-table
        :headers="headers"
        :items="data"
        :footer-props="{'items-per-page-text':translate('Rows per page'), 'items-per-page-all-text':translate('All')}"
        :search="search"
      >
        <template v-slot:no-data>
          {{translate('No data available')}}
        </template>
        <template v-slot:loading>
          {{translate('Loading items')}}...
        </template>
    </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import * as LANGUAGE from '../../../store/language.json';

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "File name",
          align: "start",
          value: "file_name",
        },
        { text: "Category", value: "category" },
      ],
      data: [
        {
          file_name: "Handout Feedbacks",
          category: "Beratungsportokolle",
        },
        {
          file_name: "Smile Presentation",
          category: "-95.5ASalles News5 PKT",
        },
        {
          file_name: "Handout Feedbacks",
          category: "Beratungsportokolle",
        },
        {
          file_name: "Smile Presentation",
          category: "-95.5ASalles News5 PKT",
        },
        {
          file_name: "Handout Feedbacks",
          category: "Beratungsportokolle",
        },
        {
          file_name: "Smile Presentation",
          category: "-95.5ASalles News5 PKT",
        },
      ],
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
  }
};
</script>

<style scoped>
tbody tr:nth-of-type(odd) {
  background-color: #f7fcfe;
}

.v-data-table {
  border-radius: 10px;
}

.v-data-table tr td {
  border: none !important;
}
</style>