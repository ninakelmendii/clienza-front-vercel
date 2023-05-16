<template>
  <v-row>
    <v-col
    style="width: 100%"
        cols="12"
        md="6"
        lg="4"
        v-for="items in items"
        :key="items.id"
    >
      <v-card outlined rounded class="stats">
        <v-card-title class="title">{{ items.title }}</v-card-title>
        <v-card-subtitle class="title text-right">{{ items.counter }}</v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    getContractsStatistics() {
      axios
          .get('/contract/dashboard')
          .then((response) => {
            for (let $i = 0; response.data.data.length > 0; $i++) {
              this.items.push({
                title: response.data.data[$i].status,
                counter: response.data.data[$i].total
              })
            }
          })
          .catch((error) => {
            console.log(error)
          })
    }
  },
  mounted() {
    this.getContractsStatistics()
  }
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