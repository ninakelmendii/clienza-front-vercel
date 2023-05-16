<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <v-row>
          <v-row style="margin-left: 12px;">
            <v-col cols="12" md="8" class="d-flex justify-start">
              <NavbarControl />
              <h2 style="display: flex; align-items: center;">{{ translate(title) }}</h2>
            </v-col>
            <v-col cols="12" md="4"><UserControl /></v-col>
          </v-row>

          <v-col cols="12" md="12" lg="12" style="margin-top: 24px;">
            <TasksTable />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TasksTable from "./TasksTable.vue";
import NavbarControl from "../Navbar/NavbarControl.vue";
import UserControl from "../Navbar/UserControl.vue";
import * as LANGUAGE from '../../store/language.json';

export default {
  name: "TasksComponent",
  data() {
    return {
      title: "Tasks",
    };
  },
  components: {
    TasksTable,
    NavbarControl,
    UserControl
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
  }
};
</script>

<style scoped>
@import url("@/assets/style/style.css");

.calendar {
  background: #ecf1f6;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
