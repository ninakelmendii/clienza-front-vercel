<template>
  <v-row class="d-flex justify-center mt-15 mb-15">
    <v-col
      cols="12"
      xs="12"
      sm="12"
      md="3"
      lg="3"
      v-for="item in items"
      :key="item.id"
    >
      <v-card class="d-flex justify-center pa-10 offers" style="background-color: white; opacity: .95;" outlined rounded>
        <v-img :src="item.image" style="background-size: contain" class="offer-images"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import innova from '@/assets/images/innova.svg'
import sanitas from '@/assets/images/sanitas.svg'
import visana from '@/assets/images/visana.svg'
import helsana from '@/assets/images/helsana.svg'
import css from '@/assets/images/css.svg'
import groupemutuel from '@/assets/images/groupemutuel.svg'
import concordia from '@/assets/images/concordia.svg'
import swica from '@/assets/images/swica.svg'
import sympany from '@/assets/images/sympany.svg'
export default {
  name: "HealthInsurance",
  data() {
    return {
      items: [
        {
          id: 1,
          image: innova
        },
        {
          id: 2,
          image: sanitas,
        },
        {
          id: 3,
          image: visana
        },
        {
          id: 4,
          image: helsana,
        },
        {
          id: 5,
          image: css,
        },
        {
          id: 6,
          image: groupemutuel,
        },
        {
          id: 7,
          image: concordia,
        },
        {
          id: 8,
          image: swica,
        },
        {
          id: 9,
          image: sympany,
        },
      ],
    };
  },
};
</script>

<style scoped>
.offers {
  border-radius: 8px !important;
  border: none !important;
  width: 70%;
  height: 140px;
  box-shadow: rgba(182, 230, 250, 0.4) 0px 8px 24px;
  transition: .3s ease-in-out;
}

.offers:hover {
  box-shadow: none;
  cursor: pointer;
}
</style>    