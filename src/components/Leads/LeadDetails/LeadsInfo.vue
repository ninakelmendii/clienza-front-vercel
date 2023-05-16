<template>
  <v-container>
    <v-dialog
      v-model="status_date_time_modal"
      width="500"
      
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2" style="padding: 16px 16px 10px">
          {{translate('Set a date and time')}}
        </v-card-title>

        <v-col>
          <v-row>
            <div style="width: 50%;">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="lead_calendar"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="lead_calendar"
                    :label="translate('Date')"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="lead_calendar"
                  :min="new Date().toISOString()"
                  :first-day-of-week="1"
                  :allowed-dates="allowedDates"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                  >
                    {{translate('Cancel')}}
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(lead_calendar)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </div>
            <div
              style="width: 50%;  padding: 0 10px;"
            >
              <v-form style="display: flex; gap: 10px;" ref="formSchedule">
                <v-text-field
                  v-model="hour"
                  :rules="hourRules"
                  :label="translate('Hour')"
                  type="number"
                  style="width: 50%"
                />
                <v-text-field
                  v-model="minute"
                  :rules="minuteRules"
                  :label="translate('Minutes')"
                  type="number"
                  style="width: 50%"
                />
              </v-form>
            </div>
          </v-row>
        </v-col>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="status_date_time_modal = false"
          >
             {{translate('Cancel')}}
          </v-btn>
          <v-btn
            color="primary"
            @click="updateDateTimeLeadStatus"
          >
            {{translate('Confirm')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <!-- <v-snackbar v-model="snackbar" color="success" :timeout="timeout">
        {{ translate(text) }}
      </v-snackbar> -->

      <SnackBar :data="snackbar" ref="snackbar" />
      <v-col cols="12" md="12" lg="12" class="px-0 mb-4">
        <v-row>
          <v-col cols="12" md="4" lg="4" class="d-flex justify-start px-0">
            <v-btn @click="$router.push('/leads')" class="buttons"
            >
              <v-icon>mdi-chevron-left</v-icon>
              {{ translate('Back') }}
            </v-btn
            >
          </v-col>
          <v-col cols="12" md="8" lg="8" class="d-flex justify-end" no-gutters>
            <v-col
                cols="12"
                xs="12" 
                sm="12"
                md="12"
                lg="12"
                class="pt-0"
                no-gutters
            >
              <v-select no-gutters v-model="lead_status_id" label="Status" :items="lead_status_data" class="px-0"></v-select>
            </v-col>
            <v-btn @click="snackbar = true" icon class="buttons"
            >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.3677 20.0003H2.63161C1.93361 20.0003 1.26433 19.7229 0.770772 19.2295C0.277344 18.7359 0 18.0667 0 17.3687V2.6326C0 1.93459 0.277362 1.26532 0.770772 0.771755C1.26433 0.278328 1.93361 0.000983279 2.63161 0.000983279H14.7363C14.8762 0.000278415 15.0107 0.0550806 15.1101 0.153586L19.8468 4.89027C19.9453 4.98966 20.0001 5.12411 19.9994 5.26403V17.3687C19.9994 18.0667 19.722 18.736 19.2286 19.2296C18.735 19.723 18.0658 20.0004 17.3678 20.0004L17.3677 20.0003ZM2.63161 1.05352C2.21275 1.05352 1.81113 1.21987 1.51511 1.51591C1.21909 1.81195 1.05272 2.21356 1.05272 2.63242V17.3685C1.05272 17.7873 1.21907 18.189 1.51511 18.485C1.81115 18.781 2.21275 18.9474 2.63161 18.9474H17.3677C17.7865 18.9474 18.1882 18.781 18.4842 18.485C18.7802 18.1889 18.9466 17.7873 18.9466 17.3685V5.47939L14.5204 1.0532L2.63161 1.05352Z" fill="white"/>
              <path d="M9.9996 15.7892C9.30159 15.7892 8.63232 15.512 8.13894 15.0185C7.64537 14.525 7.36816 13.8558 7.36816 13.1578C7.36816 12.4598 7.64535 11.7905 8.13894 11.2971C8.63236 10.8036 9.30159 10.5264 9.9996 10.5264C10.6976 10.5264 11.3669 10.8036 11.8603 11.2971C12.3538 11.7906 12.631 12.4598 12.631 13.1578C12.631 13.8558 12.3538 14.5251 11.8603 15.0185C11.3668 15.512 10.6976 15.7892 9.9996 15.7892ZM9.9996 11.5789C9.58091 11.5789 9.17929 11.7453 8.88309 12.0413C8.58705 12.3375 8.4207 12.7391 8.4207 13.1578C8.4207 13.5765 8.58705 13.9781 8.88309 14.2743C9.17931 14.5703 9.58092 14.7367 9.9996 14.7367C10.4183 14.7367 10.8199 14.5703 11.1161 14.2743C11.4121 13.9781 11.5785 13.5765 11.5785 13.1578C11.5785 12.7391 11.4121 12.3375 11.1161 12.0413C10.8199 11.7453 10.4183 11.5789 9.9996 11.5789Z" fill="white"/>
              <path d="M13.1574 7.32617H6.84177C6.14377 7.32617 5.4745 7.0488 4.98111 6.55539C4.48755 6.06183 4.21034 5.39256 4.21034 4.69455V0.526359C4.21034 0.235779 4.44595 0 4.73652 0H14.1309C14.5706 0 14.9923 0.174806 15.3033 0.485668C15.6141 0.796512 15.7888 1.21819 15.7888 1.65784V4.69455C15.7888 5.39256 15.5116 6.06183 15.018 6.55539C14.5246 7.04882 13.8554 7.32617 13.1574 7.32617ZM5.26288 1.05254V4.69455V4.69438C5.26288 5.11324 5.42923 5.51486 5.72527 5.81088C6.02149 6.10692 6.4231 6.27327 6.84177 6.27327H13.1574C13.576 6.27327 13.9777 6.10692 14.2739 5.81088C14.5699 5.51484 14.7363 5.11323 14.7363 4.69438V1.65766C14.7334 1.32462 14.464 1.05534 14.1309 1.05254L5.26288 1.05254Z" fill="white"/>
            </svg>
            </v-btn
            >
          </v-col>
        </v-row>
      </v-col>
      <v-row style="max-width: max-content; flex-wrap: nowrap;">
        <div style="max-width: max-content" class="data-container">
          <h4><span class="prefix">{{ translate("Salutation") }}: </span></h4>
          <h4><span class="prefix">{{ translate("First Name") }}: </span></h4>
          <h4><span class="prefix">{{ translate("Last Name") }}: </span></h4>
          <h4><span class="prefix">{{ translate("Email") }}: </span></h4>
          <h4><span class="prefix">{{ translate("Street") }}: </span></h4>
          <h4><span class="prefix">{{ translate("Tel Nr") }}: </span></h4>
          <h4><span class="prefix">{{ translate("ZIP") }}: </span></h4>
          <h4><span class="prefix">{{ translate("Place") }}: </span></h4>
          <h4><span class="prefix">{{ translate("Source") }}: </span></h4>
          <h4><span
              class="prefix">{{translate("Lead Date")}}: </span>
          </h4>
          <h4><span class="prefix">{{ translate("Actual insurance company") }}: </span></h4>
        </div>

        <div class="data-container">
          <h4>{{ lead_details.salutation }}&nbsp;</h4>
          <h4>{{ lead_details.first_name }}&nbsp;</h4>
          <h4>{{ lead_details.last_name }}&nbsp;</h4>
          <h4>{{ lead_details.email }}&nbsp;</h4>
          <h4>{{ lead_details.street_no }}&nbsp;</h4>
          <h4>{{ lead_details.phone }}&nbsp;</h4>
          <h4>{{ lead_details.zip }}&nbsp;</h4>
          <h4>{{ lead_details.place }}&nbsp;</h4>
          <h4>{{ lead_details.source }}&nbsp;</h4>
          <h4>{{ lead_details.created_at | moment("DD.MM.YYYY HH:mm") }}&nbsp;</h4>
          <h4>{{ lead_details.company }}&nbsp;</h4>
        </div>
      </v-row>

      <!-- <v-col
          cols="12"
          xs="12"
          sm="12"
          md="12"
          lg="12"
          class="mt-4"
      >
        <v-select no-gutters v-model="lead_status_id" label="Status" :items="lead_status_data" class="px-0"></v-select>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import MGraph from './../../../../services/mgraph';
import * as LANGUAGE from '../../../store/language.json';
import SnackBar from '@/components/Snackbar/SnackBar.vue';

Vue.use(require('vue-moment'));
import axios from "axios";

export default {
  data() {
    return {
      menu: false,
      lead_calendar: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
      first_render: true,
      changedDateTime: false,
      status_date_time_modal: false,
      status_date_time_value: new Date(),
      old_val_status: '',
      snackbar: {
        message: '',
        error: false
      },
      text: `Lead Status Updated Successfully`,
      timeout: 2000,
      users: [
        {
          salutation: "",
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          mobile: "",
          phone: "",
          zip: "",
          place: "",
          source: "",
          lead_date: "",
          company: "",
        },
      ],
      lead_status_id: '',
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

      lead_status_data: [],

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

      lead_status: '',

      hour: '',
      hourRules: [
        v => v != '' || 'Field is required!',
        v => v >= 8 || '0 is the minimum',
        v => v < 20 || 'Value should be smaller than 24'
      ],
      minute: '',
      minuteRules: [
        v => v != '' || 'Field is required!',
        v => v >= 0 || '0 is the minimum',
        v => v < 60 || 'Value should be smaller than 60'
      ]
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
    allowedDates(val){
      const day = new Date(val).getDay();

      if(day != 0 && day != 6) return val;
    },

    //todo this endpoint doesnt work, change it when the backend guys provide working endpoint
    updateLeadStatus(triggerNotif) {
      var date = new Date(`${this.lead_calendar} ${this.hour}:${this.minute}`);
      var offset = 1; // CET is 1 hour ahead of UTC
      var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
      var cet = new Date(utc + (3600000*offset));

      axios
          .put("/leadstatus/" + this.$router.currentRoute.params.id, {
            status: this.lead_status_id,
            scheduled_at: cet
          })
          .then(() => {
            if (triggerNotif) {
              this.snackbar = {
                message: 'Data updated successfully',
                error: false
              };

              this.$refs.snackbar.toggleSnackbar(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },

   async updateDateTimeLeadStatus() {
      if(!this.$refs.formSchedule.validate()) return;

      this.status_date_time_modal = false;
      this.changedDateTime = true;


      const params = {
          "subject": `${this.lead_details.first_name} ${this.lead_details.last_name} - ${this.lead_details.user_id}`,
          "start": {
            "dateTime": this.lead_calendar,
            "timeZone": "UTC"
          },
          "end": {
            "dateTime": this.lead_calendar,
            "timeZone": "UTC"
          }
        }

      await MGraph.createEvent(params);

      this.updateLeadStatus(true);
    },

    getLeadData(itemId) {
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
            this.lead_status_id = parseInt(response.data.data.status_id);
            this.lead_status = parseInt(response.data.data.status_id);

            this.lead_details.client_type_id = parseInt(response.data.data.client_type_id);
          })
          .catch((error) => {
            console.log(error);
          });
    },

    getLeadStatuses() {
      axios
          .get('/leadstatus')
          .then((response) => {

            for (let $i = 0; response.data.length > 0; $i++) {
              this.lead_status_data.push({text: this.translate(response.data[$i].en), value: response.data[$i].id})
            }

          })
          .catch((error) => {
            console.log(error)
          })
    },
  },

  watch: {
    lead_status_id: function (newVal, oldVal) {

      const needsDateTime = [2, 8, 13];

      if(needsDateTime.includes(newVal) && !this.first_render) {
        this.old_val_status = oldVal;
        this.status_date_time_modal = true;
        return;
      }
      
      let triggerNotif = false;
      if (oldVal !== '') {
        triggerNotif = true
      }

      this.first_render = false;
      this.lead_status = newVal;
      this.updateLeadStatus(triggerNotif);
    },
    status_date_time_modal: function(newVal) {
      if(!newVal) {
        this.$nextTick(() => {
          if(!this.changedDateTime) {
            this.lead_status_id = this.old_val_status;
          } else {
            this.changedDateTime = false;
          }
        })
      }
    }
  },

  mounted() {
    this.getLeadData(this.$route.params.id);
    this.getLeadStatuses();
  },

  components: {
    SnackBar
  }

};
</script>

<style scoped>
/* h4 {
  margin-top: 15px;
} */

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

.data-container > h4 {
  padding: 7px 0;
  border-bottom: 1px solid white;
}
</style>