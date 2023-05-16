<template>
  <v-row>
    <v-col
      cols="12"
      xs="1"
      sm="1"
      md="2"
      lg="2"
      v-for="items in 12"
      :key="items.id"
    >
      <v-card outlined rounded class="stats">
        <v-card-title class="title">Anzahl KVG</v-card-title>
        <v-card-subtitle class="title text-right">3</v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Anzahl KVG",
          counter: 3,
        },
      ],
    };
  },
};
</script>

<style scoped>
.title {
  font-size: 16px !important;
}

.stats {
  border: 1px solid #36a5dd;
  box-shadow: 5px 3px 2px rgba(54, 165, 221, 0.3);
  border-radius: 5px;
}
</style>