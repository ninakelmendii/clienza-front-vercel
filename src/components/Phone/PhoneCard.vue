<template>
  <div>
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
             {{ translate('Cancel') }}
          </v-btn>
          <v-btn
            color="primary"
            @click="updateDateTimeLeadStatus"
          >
            {{ translate('Confirm') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <SnackBar :data="snackbar" ref="snackbar"></SnackBar>
    <v-col cols="12" xs="12" sm="12" md="12" lg="12">
    <v-card outlined rounded class="pa-5 phone-card">
      <div v-for="info in lead_last_note" :key="info.id">
        <v-list-item three-line>
          <v-list-item-content>
            <p class="text mb-4">{{ info.created_at | moment("DD.MM.YYYY, HH:mm") }}</p>
            <v-list-item-title class="text-h6 mb-1">
              {{ getKvg.text || ''}}
            </v-list-item-title>

            <v-list-item-subtitle class="mt-4" v-if="info.note">{{ info.note }}</v-list-item-subtitle>
            <v-list-item-subtitle class="mt-4" v-else>{{ translate("Empty") }}</v-list-item-subtitle>
            <!-- <v-list-item-subtitle>{{ info.date }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ info.content }}</v-list-item-subtitle> -->
          </v-list-item-content>

          <!-- <v-list-item-avatar tile size="80"><v-icon large>mdi-email-fast-outline</v-icon></v-list-item-avatar> -->
        </v-list-item>
      </div>
    </v-card>
  </v-col>

    <div>
      <v-row class="d-flex justify-end">
        <v-col cols="6" class="mt-5 d-flex justify-end" v-if="current_lead" style="width: 100%; flex: 1">
          <v-chip large label class="status-btn ruckruf" style="width: 100%; flex: 1">
            <div>
              <h4 style="text-align: start ;">{{ translate(current_lead.status.en) }}</h4>
              <p>{{ scheduled_at | moment("DD.MM.YYYY HH:mm") }}</p>
            </div>
          </v-chip>
        </v-col>
        <v-col cols="6" class="mt-5 d-flex justify-end" style="width: 100%; flex: 1">
          <v-chip large label color="primary" style="width: 100%; flex: 1; flex-basis: min-content; font-weight: bold; font-size: 18px;">{{ current_lead.phone }}</v-chip>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="4"  v-for="status in lead_statuses" :key="status.id">
          <div>
            <v-btn class="status-btn" @click="updateLeadStatus(status.id)" block>{{translate(status.name)}}</v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as LANGUAGE from '../../store/language.json';
import SnackBar from "../Snackbar/SnackBar.vue";

export default {
  data() {
    return {
      snackbar: {
        show: false,
        message: null,
        color: null,
      },
      lead_last_note: [{
        id: 0,
        created_at: '',
        note: ''
      }],
      menu: false,
      kvg: [],

      insurances_list: [],

      infos: [
        {
          date: "15.12.2021, 10:48",
          title: "300 Franchise / standard",
          name: "Ricard Dimitrijevic",
          content:
            "Schickt mir die Police uber email bis 15.12.2021 um 20: Uhr",
        },
      ],
      lead_statuses: [],

      current_lead: {
        kvg_id: 1
      },
      items: [],
      status_date_time_modal: false,

      lead_calendar: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),

      current_selected_status_id: 0,
      
      hour: new Date().getHours(),
      hourRules: [
        v => v != '' || 'Field is required!',
        v => v >= 8 || '0 is the minimum',
        v => v < 20 || 'Value should be smaller than 24'
      ],
      minute: new Date().getMinutes(),
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

    getInsurances() {
      axios
          .get("/insurances")
          .then((response) => {

            console.log('insurances', response.data.data);
            console.log('current_lead', this.current_lead);
            for (let $i = 0; response.data.data.length > 0; $i++) {
              this.insurances_list.push({
                text: response.data.data[$i].name,
                value: response.data.data[$i].id,
              });
            }

            const current_insurance = response.data.data.filter(insurance => insurance.id == this.current_lead.kvg_id);

            this.kvg = current_insurance;
          })
          .catch((error) => {
            console.log(error);
          });
    },

    getLeadLastNote() {
      axios
        .get("/leadnote/" + this.$router.currentRoute.query.id)
        .then((response) => {
          this.lead_last_note = [response.data.data[response.data.data.length-1]];
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
              console.log(response.data[$i].en);
              this.lead_statuses.push({
                name: response.data[$i].en,
                id: response.data[$i].id,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },

    updateLeadStatus(status_id, is_scheduled = false) {
      var date = new Date(`${this.lead_calendar} ${this.hour}:${this.minute}`);
      var offset = 1; // CET is 1 hour ahead of UTC
      var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
      var cet = new Date(utc + (3600000*offset));

      const need_schedule = [2, 8, 13];

      if(need_schedule.includes(status_id) && !is_scheduled) {
        this.current_selected_status_id = status_id;
        this.status_date_time_modal = true;
        return;
      }

      axios
        .put('/leadstatus/' + this.$router.currentRoute.query.id, {
          status: status_id,
          scheduled_at: cet
        })
        .then(() => {
          this.snackbar = {
            message: "Data updated successfully",
            color: "success",
            show: true,
            error: false
          };

          this.$refs.snackbar.toggleSnackbar();
          
          this.updateCurrentLeadStatus();

          this.$store.dispatch('nextLead');
        })
        .catch((error) => console.log(error))
        
    },

    updateDateTimeLeadStatus() {
      this.updateLeadStatus(this.current_selected_status_id, true);
      this.status_date_time_modal = false;
      this.this.updateCurrentLeadStatus();
    },

    updateCurrentLeadStatus(shouldChange = false){
      if(this.$router.currentRoute.query.id == undefined) {
        setTimeout(() => {
          this.updateCurrentLeadStatus();
        }, 300);
        return;
      }
      axios.get('/lead/' +  this.$router.currentRoute.query.id).then(response => {
        const current_info = {
          status: response.data.data.status,
          scheduled_at: response.data.data.scheduled_at,
          phone: response.data.data.phone,
          kvg_id: response.data.data.kvg_id,
          vvg_id: response.data.data.vvg_id
        };

        console.log(response);

        this.current_lead = current_info;
      });

      if(shouldChange) {
        this.$router.push({
          path: 'phone',
          query: {id: parseInt(this.$router.currentRoute.query.id)+1}
        })
      }
    },
    init() {
      this.getLeadStatuses();
      this.updateCurrentLeadStatus();
      this.getLeadLastNote();
      this.getInsurances();
    }
  },

  mounted() {
    let interval = null;

    interval = setInterval(() => {
      if(this.$router.currentRoute.query.id != undefined) {
        this.init();
        clearInterval(interval);
        console.log("asdlkjaslkdadasdjl");
      }
    }, 150);
  },

  watch: {
    '$route' () {
      this.updateCurrentLeadStatus();
    }
  },

  computed: {
    scheduled_at(){
      const leads_have_scheduled = [2, 8, 13];

      if(leads_have_scheduled.includes(this.current_lead.status.id)) {
        return this.current_lead.scheduled_at.scheduled_at;
      } else return null;
    },

    getKvg() {
      return this.insurances_list.find(ins => ins.value == this.current_lead.kvg_id);
    }
  },

  components: {
    SnackBar
  }
};
</script>

<style scoped>
.phone-card {
  border-radius: 5px !important;
  border: none;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.theme--light.status-btn {
  background: #fff !important;
}

.ruckruf{
  padding-top: 15px;
  border: 1px solid #36A5DD;
  text-align: center;
}
</style>