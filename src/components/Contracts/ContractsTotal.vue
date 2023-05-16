<template>
  <v-row>
    <v-col cols="12" lg="6">
      <v-card outlined rounded class="stats">
        <v-card-title class="title">Nr. of customers</v-card-title>
        <v-card-subtitle class="title text-right">{{ items }}</v-card-subtitle>
      </v-card>
    </v-col>

    <v-col cols="12" lg="6">
      <v-card outlined rounded class="stats">
        <v-card-title class="title">Anzahl Total</v-card-title>
        <v-card-subtitle class="title text-right">{{ items }}</v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>
  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      items: 0,
    };
  },
  methods: {
    getCustomersDatatable() {
      axios
        .get("/customer/datatable")
        .then((response) => {
          console.log("customers", response.data.total);
          this.items = response.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getCustomersDatatable();
  },
};
</script>
  
  <style scoped>
.title {
  font-size: 16px !important;
}

.stats {
  background-color: #36a5dd;
  color: #fff;
  border-radius: 5px;
}
.title {
  color: #fff !important;
  background: #36a5dd;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
    5px 5px 20px rgba(54, 165, 221, 0.2);
  border-radius: 8px;
}
</style>