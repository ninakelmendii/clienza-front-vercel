<template>
  <v-card outlined class="offersTab">
    <v-tabs v-model="tab" class="tabs" :background-color="$vuetify.theme.dark ? '' : '#e5eff5'">
      <v-tab v-for="item in items" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :background-color="$vuetify.theme.dark ? '' : '#e5eff5'" v-for="item in items" :key="item.tab">
        <v-card flat>
          <v-card-text>
            <component :is="item.content"></component>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import HealthInsuranceTab from "./HealthInsuranceTab.vue";
import SachUnLebenTab from "./SachUnLebenTab.vue";
import OffertenTab from "./OffertenAnfragen.vue";
export default {
  data() {
    return {
      tab: null,
      items: [
        { tab: "Krankenkasse", content: HealthInsuranceTab },
        { tab: "Sach und Leben", content: SachUnLebenTab },
        { tab: "Offerten Anfragen", content: OffertenTab },
      ],
    };
  },

  components: {
    HealthInsuranceTab,
    SachUnLebenTab,
    OffertenTab,
  },
};
</script>

<style scoped>
.tabs {
  border-top-right-radius: 8px !important;
  border-top-left-radius: 8px !important;
}

.offersTab {
  border-radius: 20px !important;
  border: none;
}

.v-card.v-card--flat.v-sheet.theme--light {
    background: #e5eff5;
}
</style>