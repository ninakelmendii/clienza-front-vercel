<template>
    <v-text-field
      v-model="search"
      rounded
      filled
      background-color="white"
      label="Search"
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>
</template>

<script>
export default {
  name: "SearchField",

  data() {
    return {
      search: "",
    };
  },
};
</script>