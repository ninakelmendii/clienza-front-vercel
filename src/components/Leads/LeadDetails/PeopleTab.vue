<template>
  <v-row>
    <h4 style="padding: 12px">
      {{ translate('Add family member') }}
    </h4>
    <!-- <v-snackbar :color="snackbar.color" timeout="2000" v-model="snackbar.show">
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar> -->
    <SnackBar :data="snackbar" ref="snackbar" />
    <v-container>
      <v-card class="people-card pa-3">
        <v-container>
          <v-row>
            <v-col cols="12" xs="12" sm="12" md="11" lg="11">
              <v-row class="mt-3">
                <v-col cols="12" xs="12" sm="12" md="3" lg="3">
                  <v-text-field
                    v-model="people_data.first_name"
                    filled
                    ::background-color="$vuetify.theme.dark ? '' :  '#fff'"
                    :label="translate('First Name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="3" lg="3">
                  <v-text-field
                    v-model="people_data.last_name"
                    filled
                    ::background-color="$vuetify.theme.dark ? '' :  '#fff'"
                    :label="translate('Last Name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="3" lg="3">
                  <v-select
                      filled
                      v-model="people_data.investment"
                      :items="insurances_list"
                      ::background-color="$vuetify.theme.dark ? '' :  '#fff'"
                      :label="translate('Actual Insurance')"
                  ></v-select>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="3" lg="3">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        ::background-color="$vuetify.theme.dark ? '' :  '#fff'"
                        filled
                        v-model="formated_date"
                        :label="translate('Date')"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        append-icon="mdi-calendar"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="people_data.date_of_birth"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="3" lg="3">
                  <v-select
                    filled
                    v-model="people_data.franchise_id"
                    :items="franchisesList"
                    ::background-color="$vuetify.theme.dark ? '' :  '#fff'"
                    label="Franchise"
                  ></v-select>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="3" lg="3">
                  <v-select
                      filled
                      v-model="people_data.kvg_id"
                      :items="insurances_list"
                      ::background-color="$vuetify.theme.dark ? '' :  '#fff'"
                      label="KVG"
                  ></v-select>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="3" lg="3">
                  <v-select
                      filled
                      v-model="people_data.vvg_id"
                      :items="insurances_list"
                      ::background-color="$vuetify.theme.dark ? '' :  '#fff'"
                      label="VVG"
                  ></v-select>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="3" lg="3">
                  <v-text-field
                    v-model="people_data.price"
                    filled
                    type="number"
                    ::background-color="$vuetify.theme.dark ? '' :  '#fff'"
                    :label="translate('Price')"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="1"
              lg="1"
              class="d-flex justify-center align-center"
            >
              <v-btn
                v-show="!edit_mode"
                color="#fff"
                class="add-btn"
                icon
                @click="insertPeople"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>

              <v-btn
                v-show="edit_mode"
                color="#fff"
                class="add-btn"
                icon
                @click="editPeople"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn
                v-show="edit_mode"
                color="#fff"
                class="add-btn"
                icon
                @click="editPeopleEmitter(false)"
              >
                <v-icon>mdi-cancel</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <PeopleTable ref="peopleTable"  @editPeople="editPeopleEmitter" />
    </v-container>
  </v-row>
</template>

<script>
import PeopleTable from "./PeopleTable.vue";
import axios from "axios";
import SnackBar from "@/components/Snackbar/SnackBar.vue";
import * as LANGUAGE from '../../../store/language.json';

export default {
  data() {
    return {
      snackbar: {
        show: false,
        message: null,
        error: false,
      },
      lead_status_data: [],

      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      activePicker: null,

      edit_mode: false,

      people_data: {
        first_name: "",
        last_name: "",
        investment: "",
        date_of_birth: "",
        kvg_id: '',
        vvg_id: '',
        price: "",
        franchise_id: ''
      },
      get_people_data: [],

      franchisesList: [],

      insurances_list: [],

      edit_people_id: 0
    };
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
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
    moneyFormat(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    saveDate(date) {
      this.$refs.menu.save(date);
    },

    getInsurances() {
      axios
          .get("/insurances")
          .then((response) => {
            for (let $i = 0; response.data.data.length > 0; $i++) {
              this.insurances_list.push({
                text: response.data.data[$i].name,
                value: response.data.data[$i].id,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },

    getLeadStatuses() {
      axios
        .get("/leadstatus")
        .then((response) => {
          for (let $i = 0; response.data.length > 0; $i++) {
            this.lead_status_data.push({
              text: response.data[$i].en,
              value: response.data[$i].id,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getPeople(people_id) {
      console.log(this.$router.currentRoute.params.client_id);

      let url = "lead/people/";

      if(this.$router.currentRoute.params.client_id != undefined) {
        url = "customer_people/";
      }

      axios
        .get(url + people_id)
        .then((response) => {
          this.people_data = {};
          this.get_people_data.push(response.data.data);

          this.people_data.first_name = response.data.data.first_name;
          this.people_data.last_name = response.data.data.last_name;
          this.people_data.investment = parseInt(response.data.data.investment);
          this.people_data.date_of_birth = response.data.data.date_of_birth;
          this.people_data.kvg_id = parseInt(response.data.data.kvg_id);
          this.people_data.vvg_id = parseInt(response.data.data.vvg_id);
          this.people_data.franchise_id = parseInt(response.data.data.franchise_id);
          this.people_data.price = response.data.data.price;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    insertPeople() {
      this.people_data.lead_id = this.$router.currentRoute.params.id;
      
      if(this.$router.currentRoute.params.id == undefined) {
        this.people_data.lead_id = this.$router.currentRoute.params.client_id;

        const current_data = {
          customer_id: this.$router.currentRoute.params.client_id,
          first_name: this.people_data.first_name,
          last_name: this.people_data.last_name,
          date_of_birth: this.people_data.date_of_birth,
          franchise_id: this.people_data.franchise_id,
          investment: this.people_data.investment,
          kvg_id: this.people_data.kvg_id,
          vvg_id: this.people_data.vvg_id,
          price: this.people_data.price,
        };

        axios
             .post('customer_people', current_data)
             .then(response => {
               console.log(response.data)
               this.$refs.peopleTable.getItemsTable();
               this.people_data = {
                 first_name: "",
                 last_name: "",
                 investment: "",
                 date_of_birth: "",
                 kvg_id: '',
                 vvg_id: '',
                 price: "",
                 franchise_id: ''
               };

               this.openSnackBar("Data saved successfully");
             })
             .catch(() => {
              this.openSnackBar("Fill in all fields", true);
             });

        return;
      }

      axios
        .post("lead/people", this.people_data)
        .then((response) => {
          console.log(response.data);

          this.people_data = {};
          
          this.openSnackBar("Data saved successfully");

          this.$refs.peopleTable.getItemsTable();
        })
        .catch(() => {
          // this.snackbar = {
          //   message: error.response.data.message,
          //   color: "error",
          //   show: true,
          // };

          this.openSnackBar("Fill in all fields", true);
        });
    },

    openSnackBar(message = "", error = false) {
      this.snackbar = {
        message,
        error
      }

      this.$refs.snackbar.toggleSnackbar(true);
    },

    editPeople() {
      this.people_data.lead_id = this.$router.currentRoute.params.id;
      
      let current_data = false;
      let url = "lead/people/";

      if(this.$router.currentRoute.params.client_id != undefined) {
        current_data = {
          customer_id: this.$router.currentRoute.params.client_id,
          first_name: this.people_data.first_name,
          last_name: this.people_data.last_name,
          date_of_birth: this.people_data.date_of_birth,
          franchise_id: this.people_data.franchise_id,
          investment: this.people_data.investment,
          kvg_id: this.people_data.kvg_id,
          vvg_id: this.people_data.vvg_id,
          price: this.people_data.price,
        };

        url = "customer_people/"
      }


      axios
        .patch(url + this.edit_people_id, current_data || this.people_data)
        .then(() => {
          this.openSnackBar("Data saved successfully");

          this.$refs.peopleTable.getItemsTable();
        })
        .catch(() => {
          this.openSnackBar("Fill in all fields", true);
        });
    },

    editPeopleEmitter(mode, people_id) {
      this.edit_mode = mode;
      if (mode === false) {
        this.people_data = {}
      }
      this.edit_people_id = people_id
      this.getPeople(people_id);
    },

    getFranchises() {
      axios
        .get("franchises")
        .then((response) => {
          for (let $i = 0; response.data.data.length > 0; $i++) {
            this.franchisesList.push({
              text: response.data.data[$i].label,
              value: response.data.data[$i].id,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getLeadStatuses();
    this.getFranchises();
    this.getInsurances();
  },
  components: { PeopleTable, SnackBar },
  computed: {
    formated_date() {
      if (!this.people_data.date_of_birth) return null

      const [year, month, day] = this.people_data.date_of_birth.split('-')
      return `${day}.${month}.${year}`
    }
  }
};
</script>

<style scoped>
.theme--light .v-card.people-card {
  background: #ecf1f6 !important;
  box-shadow: none;
}

.v-btn.add-btn {
  background: #36a5dd;
}
</style>
