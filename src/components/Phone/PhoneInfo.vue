<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <v-chip label color="primary">{{lead_index + 1}}/{{total_leads_count}}</v-chip>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6" class="d-flex justify-end">
        <v-btn class="save mr-1" v-show="lead_index !== 0" @click="previousLead" dark icon> <v-icon>mdi-chevron-left</v-icon> </v-btn>
        <v-btn class="save ml-1" v-show="lead_id != all_leads[all_leads.length-1].id" @click="nextLead" dark icon> <v-icon>mdi-chevron-right</v-icon> </v-btn>
      </v-col>

      <v-row style="max-width: max-content; flex-wrap: nowrap; margin-left: 12px;">
        <div style="max-width: max-content" class="data-container"> 
          <h4><span class="prefix">{{ translate("Salutation") }}: </span></h4>
          <h4><span class="prefix">{{translate("First Name")}}: </span></h4>
          <h4><span class="prefix">{{ translate("Last Name") }}: </span></h4>
          <h4><span class="prefix">{{ translate("Email") }}: </span></h4>
          <h4><span class="prefix">{{ translate("Street") }}: </span></h4>
          <h4><span class="prefix">{{ translate("Phone") }}: </span></h4>
          <h4><span class="prefix">{{ translate("ZIP") }}: </span></h4>
          <h4><span class="prefix">{{ translate("Place") }}: </span></h4>
          <h4><span class="prefix">{{ translate("Source") }}: </span></h4>
          <h4><span class="prefix">{{ translate("Lead Date") }}: </span></h4>
          <h4><span class="prefix">{{ translate("Actual Insurance") }}: </span></h4>
        </div>
        <div class="data-container">
          <h4 class="prefix-data">{{ lead_details.salutation }}&nbsp;</h4>
          <h4 class="prefix-data">{{ lead_details.first_name }}&nbsp;</h4>
          <h4 class="prefix-data">{{ lead_details.last_name }}&nbsp;</h4>
          <h4 class="prefix-data">{{ lead_details.email }}&nbsp;</h4>
          <h4 class="prefix-data">{{ lead_details.street }}&nbsp;</h4>
          <h4 class="prefix-data">{{ lead_details.phone }}&nbsp;</h4>
          <h4 class="prefix-data">{{ lead_details.zip }}&nbsp;</h4>
          <h4 class="prefix-data">{{ lead_details.place }}&nbsp;</h4>
          <h4 class="prefix-data">{{ lead_details.source }}&nbsp;</h4>
          <h4 class="prefix-data">{{ lead_details.created_at | moment("DD.MM.YYYY") }}&nbsp;</h4>
          <h4 class="prefix-data">{{ lead_details.company }}&nbsp;</h4>
        </div>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue';
import * as LANGUAGE from '../../store/language.json';

Vue.use(require("vue-moment"));
import axios from "axios";
export default {
  data() {
    return {
      lead_id: 1,
      all_leads: [],
      lead_details: {
        user_id: "",
        salutation: "",
        first_name: "",
        last_name: "",
        email: "",
        birthday: "",
        street_no: "",
        zip: "",
        place: "",
        persons: "",
        company: "",
        fax: "",
        phone: "",
        status_id: "",
        client_type_id: "",
        created_at: "",
      },
      phone: [],
      users: [
        {
          salutation: "Frau",
          firstName: "Jasmina",
          lastName: "Dimitrijevic",
          email: "jdimitrijevic@gmail.com",
          street: "Susswinkeistrase 14",
          mobile: 123123123,
          phone: 176456122,
          zip: "1542(SZ)",
          place: "Reichenburg",
          source: "Eigener Lead",
          lead_date: "09.12.2021, 13:01",
          company: "B-Kind",
        },
      ],

      agents: [
        {
          salutation: "Frau",
          firstName: "Jasmina",
          lastName: "Dimitrijevic",
          birth_date: "21.08.1991",
          agent: "",
          additional_info: "",
          nr_people: "",
          insurance: "",
        },
      ],

      items: [],

      total_leads_count: 0,

      first_render: true
    };
  },

  watch: {
    lead_id: function(val) {
      this.$router.push({
        path: 'phone',
        query: {id: val}
      })
    }, 
    lead_index: function(val) {
      this.lead_details = this.all_leads[val];
      this.lead_id = this.all_leads[val].id;
    }
  },

  computed: {
    lead_index() {
      return this.$store.state.lead_index;
    }
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
    getLeadData(itemId) {
      console.log(itemId);

      axios
          .get("/lead/" + itemId)
          .then((response) => {
            this.lead_details = {};

            this.lead_details.user_id = response.data.data.user_id;
            this.lead_details.salutation = response.data.data.salutation;
            this.lead_details.first_name = response.data.data.first_name;
            this.lead_details.last_name = response.data.data.last_name;
            this.lead_details.email = response.data.data.email;
            this.lead_details.birthday = response.data.data.birthday;
            this.lead_details.street_no = response.data.data.street_no;
            this.lead_details.zip = response.data.data.zip;
            this.lead_details.place = response.data.data.place;
            this.lead_details.persons = response.data.data.persons;
            this.lead_details.company = response.data.data.company;
            this.lead_details.fax = response.data.data.fax;
            this.lead_details.phone = response.data.data.phone;
            this.lead_details.created_at = response.data.data.created_at;

            this.lead_details.status_id = parseInt(response.data.data.status_id);
            this.lead_status = parseInt(response.data.data.status_id);

            this.lead_details.client_type_id = parseInt(response.data.data.client_type_id);
          })
          .catch((error) => {
            console.log(error);
          });
    },

    getPhones(){
      axios.get('/phone').then(response => {
        this.phone = response.data.data;
        console.log('PhoneResponse', response)
      }).catch(error => {
        console.log("Error", error)
      })
    },

    getLeadStatuses() {
      axios
        .get("/leadstatus")
        .then((response) => {
          for (let $i = 0; response.data.length > 0; $i++) {
            this.items.push({
              text: response.data[$i].en,
              value: response.data[$i].id,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    nextLead() {
      this.$store.dispatch('nextLead');
    },

    previousLead() {
      this.$store.dispatch('prevLead');
    },

    getTotalLeadsCount() {
      axios
          .get("/lead/datatable")
          .then((response) => {
            this.total_leads_count = response.data.total;
          })
          .catch((error) => {
            console.log(error);
          });
    },

    getFirstLeadId() {
      axios
          .get("/lead/datatable")
          .then((response) => {
            this.lead_id = response.data.data[0].id;

            this.$router.push({
              path: 'phone',
              query: {id: this.lead_id}
            })
          })
          .catch((error) => {
            console.log(error);
          });
    }

  },

  created() {
    this.getTotalLeadsCount();

    this.$on('nextLead', () => {
      this.nextLead();
    });

    

    axios
        .get('/get_all_leads')
        .then(response => {
          console.log(response);
          this.lead_details = response.data[0];
          this.lead_id = response.data[0].id;
          this.all_leads = response.data;
        });
  },
};
</script>

<style scoped>
.prefix {
  margin-right: 20px;
  font-weight: 400;
}

.save{
  background-color: #36a5dd;
  border-radius: 5px !important;
}

.data-container > h4 {
  padding: 7px 0;
  border-bottom: 1px solid white;
}

</style>