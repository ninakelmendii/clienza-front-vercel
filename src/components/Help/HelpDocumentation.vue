<template>
  <v-container>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "HelpDocumentation",
  data() {
    return {};
  },

  methods: {
    getHelp() {
      axios
        .get("/help")
        .then((response) => {
          console.log("GET HELP", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.getHelp();
  },
};
</script>

<style scoped>
</style>