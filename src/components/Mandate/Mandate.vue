<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <v-row>
          <v-col>
            <v-row>
              <v-col cols="12" md="8" class="d-flex justify-start">
                <NavbarControl />
                <h2 style="display: flex; align-items: center;">{{ title }}</h2>
              </v-col>
              <v-col cols="12" md="4"><UserControl /></v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="12" lg="12">
            <MandateTable />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NavbarControl from "../Navbar/NavbarControl.vue";
import MandateTable from "./MandateTable.vue";
import UserControl from "../Navbar/UserControl.vue";

export default {
  name: "MandateComponents",
  data() {
    return {
      title: "Mandate",
    };
  },
  components: { MandateTable, NavbarControl, UserControl },
};
</script>

<style scoped>
</style>
