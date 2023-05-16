<template>
  <v-container>
    <v-row style="flex-wrap: wrap">
      <v-snackbar class="snackbar-popup" v-model="snackbar" color="success" :timeout="timeout">
        {{text}}
      </v-snackbar>
      <v-col>
        <v-row>
          <v-col class="remove-padding data-container">
            <h4><span class="prefix">{{ translate("Salutation") }}: </span></h4>
            <h4><span class="prefix">{{ translate("First Name") }}: </span></h4>
            <h4><span class="prefix">{{ translate("Last Name") }}: </span></h4>
            <h4><span class="prefix">{{ translate("Email") }}: </span></h4>
            <h4><span class="prefix">{{ translate("Street") }}: </span></h4>
            <h4><span class="prefix">{{ translate("Phone") }}: </span></h4>
            <h4><span class="prefix">{{ translate("ZIP") }}: </span></h4>
            <h4><span class="prefix">{{ translate("Place") }}: </span></h4>
            <h4><span class="prefix">{{ translate("Source") }}: </span></h4>
            <h4><span class="prefix">{{ translate("Canton") }}: </span></h4>
            <h4><span class="prefix">{{ translate("Language") }}: </span></h4>
            <h4><span class="prefix">{{ translate("Lead Date") }}: </span></h4>
            <h4><span class="prefix">{{ translate("Actual Insurance") }}: </span></h4>
          </v-col>
          <v-col class="remove-padding data-container">
            <h4>{{ create_customer_data.salutation }}&nbsp;</h4>
            <h4>{{ create_customer_data.first_name }}&nbsp;</h4>
            <h4>{{ create_customer_data.last_name }}&nbsp;</h4>
            <h4>{{ create_customer_data.email }}&nbsp;</h4>
            <h4>{{ create_customer_data.street }}&nbsp;</h4>
            <h4>{{ create_customer_data.phone }}&nbsp;</h4>
            <h4>{{ create_customer_data.zip }}&nbsp;</h4>
            <h4>{{ create_customer_data.place }}&nbsp;</h4>
            <h4>{{ create_customer_data.source_id }}&nbsp;</h4>
            <h4>{{ create_customer_data.canton_id }}&nbsp;</h4>
            <h4>{{ create_customer_data.lang }}&nbsp;</h4>
            <h4>{{ create_customer_data.created_at }}&nbsp;</h4>
            <h4>{{ create_customer_data.company }}&nbsp;</h4>
          </v-col>
        </v-row>
      </v-col>


      <v-col cols="12">
        <!-- <v-divider inset></v-divider> -->
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <div v-for="member in member_data" :key="member.id">
          <h4><span class="prefix">First Name: </span>{{ member.first_name }}</h4>
          <h4><span class="prefix">Last Name: </span>{{ member.last_name }}</h4>
          <h4><span class="prefix">Date Of Birth: </span>{{ member.date_of_birth }}</h4>
          <h4><span class="prefix">Investment: </span>{{ member.investment }}</h4>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
    
<script>
import axios from "axios";
import * as LANGUAGE from '../../store/language.json';

export default {
  data() {
    return {
      snackbar: false,
      timeout: 2000,
      dialog: false,

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

      get_customer_data: [],

      client_types: [],
      canton_select: [],
      lang_select: [],
      source_id: [],

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

      member_data: [],

      items: [
        "Not Interested",
        "Not Reached",
        "Call Back",
        "Scheduled",
        "Pending",
        "Accepted",
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
    

    getClientTypes() {
      axios
          .get("/client/types")
          .then((response) => {
            for (let $i = 0; response.data.data.length > 0; $i++) {
              this.client_types.push({
                text: response.data.data[$i].name,
                value: response.data.data[$i].id,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },

    getCantonSelect() {
      axios
          .get("/canton")
          .then((response) => {
            for (let $i = 0; response.data.length > 0; $i++) {
              this.canton_select.push({
                text: response.data[$i].name,
                value: response.data[$i].id,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },

    getLangSelect() {
      axios
          .get("/languages")
          .then((response) => {
            for (const [key, value] of Object.entries(response.data)) {
              this.lang_select.push({
                text: value,
                value: key,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },

    getSourceSelect() {
      axios
          .get("/sources")
          .then((response) => {
            for (let $i = 0; response.data.data.length > 0; $i++) {
              this.source_id.push({
                text: response.data.data[$i].name,
                value: response.data.data[$i].id,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getCustomer(customer_id) {
      axios
          .get("/customer/" + customer_id)
          .then((response) => {

            this.create_customer_data = {};

            this.get_customer_data.push(response.data.data);

            this.create_customer_data.salutation = response.data.data.salutation;
            this.create_customer_data.first_name = response.data.data.first_name;
            this.create_customer_data.last_name = response.data.data.last_name;
            this.create_customer_data.email = response.data.data.email;
            this.create_customer_data.street_no = response.data.data.street_no;
            this.create_customer_data.birthday = response.data.data.birthday;
            this.create_customer_data.zip = response.data.data.zip;
            this.create_customer_data.place = response.data.data.place;
            this.create_customer_data.phone = response.data.data.phone;
            this.create_customer_data.fax = response.data.data.fax;
            this.create_customer_data.client_type_id = parseInt(response.data.data.client_type_id);
            this.create_customer_data.user_id = response.data.data.user_id;
            this.create_customer_data.canton_id = parseInt(response.data.data.canton_id);
            this.create_customer_data.lang = response.data.data.lang;
            this.create_customer_data.source_id = parseInt(response.data.data.source_id);
          })
          .catch((error) => {
            console.log(error);
          });
    },

    updateCustomer(customer_id) {
      axios
          .put("/customer/" + customer_id, this.create_customer_data)
          .then((response) => {
            this.snackbar = {
              message: response.data.message,
              color: "success",
              show: true,
            };
          })
          .catch((error) => {
            this.snackbar = {
              message: error.response.data.message,
              color: "error",
              show: true,
            };
          });
    },

    update(customer_id) {
      this.close();
      this.updateCustomer(customer_id);
    },

    getMemberData(member_id) {
      axios
          .get("lead/people/" + member_id)
          .then((response) => {
            this.member_data = [];
            this.member_data.push(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
    },

  },

  watch: {
    $route (to){
      let memberId = to.query.member
      this.getMemberData(memberId)
    }
  },

  mounted() {
    this.getCustomer(this.$router.currentRoute.params.client_id);
    this.getClientTypes();
    this.getCantonSelect();
    this.getLangSelect();
    this.getSourceSelect();
  },

};
</script>
    
<style scoped>
.prefix {
  margin-right: 20px;
  /* color: rgba(0, 0, 0, 0.87); */
  font-weight: 400;
}

.buttons {
  background: #36a5dd !important;
  border-radius: 6px !important;
  color: #fff !important;
  box-shadow: none;
}

.remove-padding {
  padding: 0;
  flex-grow: 0;
  flex-basis: content;
}

.data-container > h4 {
  padding: 7px 0;
  border-bottom: 1px solid white;
}
</style>