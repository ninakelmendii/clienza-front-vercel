<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <UserControl />
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="4" lg="4">
        <LeadsInfo />
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="8" lg="8">
        <LeadsTabs />
      </v-col>
    </v-row>
  </v-container>
</template>
    
<script>
import LeadsInfo from "./LeadsInfo.vue";
import LeadsTabs from "./LeadsTabs.vue";
import UserControl from "@/components/Navbar/UserControl.vue";
export default {
  name: "LeadDetailsComponent",
  data() {
    return {
      title: "Lead Details",
    };
  },
  components: { LeadsInfo, LeadsTabs, UserControl },
};
</script>