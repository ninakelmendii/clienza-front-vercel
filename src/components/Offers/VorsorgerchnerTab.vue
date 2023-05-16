<template>
  <v-row class="d-flex justify-center mt-15 mb-15">
    <v-col
      cols="12"
      xs="12"
      sm="12"
      md="2"
      lg="2"
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
export default {
  name: "VorsorgerchnerTab",
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
    };
  },
};
</script>

<style scoped>
.offer-images {
  min-height: 70px;
  width: 50px;
}
</style>