<template>
  <v-container>
    <v-row style="margin-left: 12px;">
      <v-col cols="12" md="8" class="d-flex justify-start">
        <NavbarControl />
        <h2 style="display: flex; align-items: center;">{{ title }}</h2>
      </v-col>
      <v-col cols="12" md="4"><UserControl /></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <v-row>
          <v-col cols="12" md="12" lg="12">
            <LeadsTable />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import LeadsTable from "./LeadsTable.vue";
import NavbarControl from "../Navbar/NavbarControl.vue";
import UserControl from "../Navbar/UserControl.vue";

export default {
  name: "LeadsComponent",
  data() {
    return {
      title: "Leads",
    };
  },
  components: { LeadsTable, NavbarControl, UserControl },
};
</script>