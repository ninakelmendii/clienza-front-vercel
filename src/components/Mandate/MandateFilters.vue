<template>
  <v-row>
    <v-col cols="12" md="3" lg="3">
      <v-text-field
        v-model="search"
        rounded
        filled
        background-color="white"
        label="Search"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="3" lg="3">
      <v-select
        v-model="date"
        :items="items"
        rounded
        filled
        background-color="white"
        label="Select date"
        prepend-inner-icon="mdi-calendar-outline"
      ></v-select>
    </v-col>

    <v-col cols="12" md="3" lg="3">
      <v-select
        v-model="insurance"
        :items="items"
        rounded
        filled
        background-color="white"
        label="Insurance"
        prepend-inner-icon="mdi-shield-outline"
      ></v-select>
    </v-col>

    <v-col cols="12" md="3" lg="3">
      <v-select
        v-model="status"
        :items="items"
        rounded
        filled
        background-color="white"
        label="Status Color"
        prepend-inner-icon="mdi-invert-colors"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
};
</script>

<style scoped>
</style>