<template>
  <v-row>
    <v-col>
      <v-text-field
        rounded
        filled
        label="Search"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-select
        :items="items"
        rounded
        filled
        label="Select date"
        prepend-inner-icon="mdi-calendar-outline"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        :items="items"
        rounded
        filled
        label="Status"
        prepend-inner-icon="mdi-filter-multiple-outline"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        :items="items"
        rounded
        filled
        label="Type of Task"
        prepend-inner-icon="mdi-filter-variant"
      ></v-select>
    </v-col>
    <v-col>
      <v-select
        :items="items"
        rounded
        filled
        label="Provisionsanfrag"
        prepend-inner-icon="mdi-invert-colors"
      ></v-select>
    </v-col>

    <v-col class="d-flex justify-end mt-1">
      <v-btn large color="primary" @click="goToRequest">
        <v-icon>mdi-plus</v-icon> New Request
      </v-btn>
    </v-col>

    <v-col cols="12" md="12" lg="12" sm="12">
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        :footer-props="{'items-per-page-text':translate('Rows per page'), 'items-per-page-all-text':translate('All')}"
      >
        <template v-slot:loading>
          {{translate('Loading items')}}...
        </template>
        <template v-slot:no-data>
          {{translate('No data available')}}
        </template>
    </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
import * as LANGUAGE from '../../store/language.json';

export default {
  name: "OffertenTab",
  data() {
    return {
      items: [
        {
          id: 1,
          image: "https://i.ibb.co/V2c8FfN/Group-1979.png",
        },
        {
          id: 2,
          image: "https://i.ibb.co/V2c8FfN/Group-1979.png",
        },
        {
          id: 3,
          image: "https://i.ibb.co/V2c8FfN/Group-1979.png",
        },
        {
          id: 4,
          image: "https://i.ibb.co/V2c8FfN/Group-1979.png",
        },
        {
          id: 5,
          image: "https://i.ibb.co/V2c8FfN/Group-1979.png",
        },
      ],

      headers: [
        {
          text: "Date",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Status", value: "calories" },
        { text: "Nr. of Insurances", value: "fat" },
        { text: "Type Of Offer", value: "carbs" },
        { text: "Corporate Client", value: "protein" },
        { text: "Name", value: "iron" },
        { text: "Company", value: "iron" },
        { text: "Agent", value: "iron" },
      ],

      desserts: [],
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
    goToRequest() {
      this.$router.push("/request");
    },
  },
};
</script>

<style scoped>
.offer-images {
  min-height: 70px;
  width: 50px;
}
</style>