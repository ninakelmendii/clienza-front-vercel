<template>
  <v-card outlined class="offersTab">
    <v-tabs v-model="tab" :background-color="$vuetify.theme.dark ? '' : '#e5eff5'" class="tabs">
      <v-tab v-for="item in items" :key="item.tab">
        {{ translate(item.tab) }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
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
import PeopleTab from "./PeopleTab.vue";
import NotesTab from "./NotesTab.vue";
import HistoryTab from "./HistoryTab.vue";
import ConsulationProtocolTab from "./ConsulationProtocolTab.vue";
import * as LANGUAGE from '../../../store/language.json';

export default {
  data() {
    return {
      tab: null,
      items: [
        { tab: "Family members", content: PeopleTab },
        { tab: "Notes", content: NotesTab },
        { tab: "History", content: HistoryTab },
        { tab: "Consultation Protocol", content: ConsulationProtocolTab },
      ],
    };
  },

  methods: {
    translate(word) {
      let wordIndex = null;

      LANGUAGE.forEach((lng, index) => {
        if(lng.english.toLowerCase() == word.toLowerCase()) {
          wordIndex = index;
        }
      });

      if(wordIndex === null) {
        return word;
      }

      if(this.$store.state.language == 'german') {
        return LANGUAGE[wordIndex].german;
      } else {
        return LANGUAGE[wordIndex].english;
      }
    },
  },

  components: { PeopleTab, NotesTab, HistoryTab, ConsulationProtocolTab },
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

.theme--light.v-card {
    background-color: #e5eff5 !important;
}
</style>