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
      <v-card class="d-flex justify-center pa-10 offers" outlined rounded>
        <v-img :src="item.image" class="offer-images"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import smile from '@/assets/images/smile.svg'
import dextra from '@/assets/images/dextra.svg'
import visana from "@/assets/images/visana.svg";
import ecohub from '@/assets/images/ecohub.svg'
import automate from '@/assets/images/automate.svg'
import generali from '@/assets/images/generali.svg'
import zugerberg from '@/assets/images/zugerberg.svg'

export default {
  name: "SachunLeben",
  data() {
    return {
      items: [
        {
          id: 1,
          image: smile,
        },
        {
          id: 2,
          image: dextra,
        },
        {
          id: 3,
          image: visana,
        },
        {
          id: 4,
          image: ecohub,
        },
        {
          id: 5,
          image: automate,
        },
        {
          id: 6,
          image: generali,
        },
        {
          id: 7,
          image: zugerberg,
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