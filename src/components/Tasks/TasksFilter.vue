<template>
  <v-row class="d-flex justify-start">
    <v-col cols="6" md="6" lg="6"
      ><v-switch
        v-model="showCompleted"
        inset
        label="Show completed task"
      ></v-switch
    ></v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      showCompleted: false,
    };
  },
};
</script>