<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" lg="12">
        <v-row>
          <v-col cols="12">
            <UserControl />
          </v-col>
          <v-col cols="12" md="12" lg="12" class="d-flex justify-start">
            <div class="d-flex">
              <NavbarControl />
              <h2>{{ translate(title) }}</h2>
            </div>
          </v-col>

          <v-col cols="12" md="12" lg="4">
            <ApplicationsInfo />
          </v-col>

          <v-col cols="12" md="12" lg="8">
            <ApplicationsTabs />
          </v-col>

          <v-col cols="12">
            <PeopleTab />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
    
  <script>
import ApplicationsInfo from "./ApplicationsInfo.vue";
import ApplicationsTabs from "./ApplicationsTabs.vue";
import NavbarControl from "../Navbar/NavbarControl.vue";
import PeopleTab from "../Leads/LeadDetails/PeopleTab.vue";
import UserControl from "../Navbar/UserControl.vue";
import * as LANGUAGE from '../../store/language.json';

export default {
  name: "ApplicationsComponent",
  data() {
    return {
      title: "Applications",
      create_customer_data: {
        salutation: "",
        first_name: "",
        last_name: "",
        email: "",
        street_no: "",
        birthday: "",
        zip: "",
        place: "",
        phone: "",
        fax: "",
        client_type_id: "1",
        user_id: "",
        canton_id: "",
        lang: "",
        source_id: ""
      },
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
  components: { ApplicationsInfo, ApplicationsTabs, NavbarControl, PeopleTab, UserControl },
};
</script>