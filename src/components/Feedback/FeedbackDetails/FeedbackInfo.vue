<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" lg="12" class="px-0 mb-4">
        <v-row>
          <v-col cols="12" md="2" lg="2" class="d-flex justify-start px-0">
            <v-btn @click="$router.push('/feedback')" class="buttons"
            >
              <v-icon>mdi-chevron-left</v-icon>
              {{ translate('Back') }}
            </v-btn
            >
          </v-col>
          <v-col v-if="isAdmin" cols="12" md="10" lg="10" :class="{ 'justify-start p-0': $vuetify.breakpoint.smAndDown, 'justify-end': $vuetify.breakpoint.mdAndUp }" class="d-flex flex-wrap dialog-buttons" no-gutters>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              :class="{'mr-2': $vuetify.breakpoint.smAndDown, 'ml-2': $vuetify.breakpoint.mdAndUp }"
              @click="openAbgeschlossenDialog"
            >
            {{translate('Completed')}}
              <v-dialog
                v-model="abgeschlossenDialog"
                activator="parent"
                width="600"
              >
                <AbgeschlossenDialog :item="feedback_details" :close="closeAbgeschlossenDialog" />
              </v-dialog>
            </v-btn>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              :class="{'mr-2': $vuetify.breakpoint.smAndDown, 'ml-2': $vuetify.breakpoint.mdAndUp }"
              @click="openFolgeTerminDialog"
            >
              {{translate('Follow-up date')}}
              <v-dialog
                v-model="folgeTerminDialog"
                activator="parent"
                width="600"
              >
                <FolgeTermin :item="feedback_details" :close="closeFolgeTerminDialog" />
              </v-dialog>
            </v-btn>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              :class="{'mr-2': $vuetify.breakpoint.smAndDown, 'ml-2': $vuetify.breakpoint.mdAndUp }"
              @click="openPendentDialog()"
            >
              {{ translate('Pending ') }}
              <v-dialog
                v-model="pendentDialog"
                activator="parent"
                width="600"
              >
                <Pendent :item="feedback_details" :close="closePendentDialog" />
              </v-dialog>
            </v-btn>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              :class="{'mr-2': $vuetify.breakpoint.smAndDown, 'ml-2': $vuetify.breakpoint.mdAndUp }"
              @click="openMJVDialog()"
            >
              {{ translate('MJV') }}
              <v-dialog
                v-model="mjvDialog"
                activator="parent"
                width="600"
              >
                <MJVDialog :item="feedback_details" :close="closeMJVDialog" />
              </v-dialog>
            </v-btn>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              :class="{'mr-2': $vuetify.breakpoint.smAndDown, 'ml-2': $vuetify.breakpoint.mdAndUp }"
              @click="openBehandlungDialog()"
            >
              {{ translate('In progress') }}
              <v-dialog
                v-model="behandlungDialog"
                activator="parent"
                width="600"
              >
                <BehandlungDialog :item="feedback_details" :close="closeBehandlungDialog" />
              </v-dialog>
            </v-btn>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              :class="{'mr-2': $vuetify.breakpoint.smAndDown, 'ml-2': $vuetify.breakpoint.mdAndUp }"
              @click="openKeinBeratungDialog()"
            >
              {{ translate('No consultation') }}
              <v-dialog
                v-model="keinBeratungDialog"
                activator="parent"
                width="600"
              >
                <KeineBeratung :item="feedback_details" :close="closeKeinBeratungDialog" />
              </v-dialog>
            </v-btn>
            <v-btn
              v-if="feedback_details.isAbschluss"
              color="primary"
              dark
              class="mb-2"
              :class="{'mr-2': $vuetify.breakpoint.smAndDown, 'ml-2': $vuetify.breakpoint.mdAndUp }"
              @click="openKeinAbschlussDialog()"
            >
              {{ translate('No conclusion') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-row style="max-width: max-content;">
        <div style="max-width: max-content" class="data-container">
          <h4 v-if="feedback_details?.salutation"><span class="prefix">{{ translate("Salutation") }}: </span></h4>
          <h4 v-if="feedback_details?.firstName"><span class="prefix">{{ translate("First Name") }}: </span></h4>
          <h4 v-if="feedback_details?.lastName"><span class="prefix">{{ translate("Last Name") }}: </span></h4>
          <h4 v-if="feedback_details?.email"><span class="prefix">{{ translate("Email") }}: </span></h4>
          <h4 v-if="feedback_details?.address"><span class="prefix">{{ translate("Street") }}: </span></h4>
          <h4 v-if="feedback_details?.phone"><span class="prefix">{{ translate("Tel Nr") }}: </span></h4>
          <h4 v-if="feedback_details?.zip"><span class="prefix">{{ translate("ZIP") }}: </span></h4>
          <h4 v-if="feedback_details?.location"><span class="prefix">{{ translate("Place") }}: </span></h4>
          <h4 v-if="feedback_details?.source"><span class="prefix">{{ translate("Source") }}: </span></h4>
          <h4 v-if="feedback_details?.created_at"><span class="prefix">{{ translate("Created date") }}: </span></h4>
          <h4 v-if="feedback_details?.company"><span class="prefix">{{ translate("Company") }}: </span></h4>
          <h4 v-if="feedback_details?.followUpAppointment"><span class="prefix">{{ translate("Follow-up date") }}: </span></h4>
          <h4 v-if="feedback_details?.pendingFeedback"><span class="prefix">{{ translate("Pending") }}: </span></h4>
          <h4 v-if="feedback_details?.recordNote"><span class="prefix">{{ translate("In progress") }}: </span></h4>
          <h4 v-if="feedback_details?.contractFile"><span class="prefix">{{ translate("MJV File") }}: </span></h4>
          <h4 v-if="feedback_details?.contractExpiration"><span class="prefix">{{ translate("MJV Contract expiration") }}: </span></h4>
          <h4 v-if="feedback_details?.kvgAbgschlossen"><span class="prefix">{{ translate("Kvg") }}: </span></h4>
          <h4 v-if="feedback_details?.modelInsurance"><span class="prefix">{{ translate("Kvg insurance model") }}: </span></h4>
          <h4 v-if="feedback_details?.franchise"><span class="prefix">{{ translate("KVG Deductible") }}: </span></h4>
          <h4 v-if="feedback_details?.accidentCoverage"><span class="prefix">{{ translate("KVG Accident Coverage") }}: </span></h4>
          <h4 v-if="feedback_details?.vvgInsuranceType"><span class="prefix">{{ translate("VVG Insurance Type") }}: </span></h4>
          <h4 v-if="feedback_details?.vvgContract"><span class="prefix">{{ translate("VVG Insurance") }}: </span></h4>
          <h4 v-if="feedback_details?.other"><span class="prefix">{{ translate("Others") }}: </span></h4>
          <h4 v-if="feedback_details?.consultationFeedback"><span class="prefix">{{ translate("No consultation") }}: </span></h4>
          <h4 v-if="feedback_details?.consultationFile"><span class="prefix">{{ translate("None Consultation file") }}: </span></h4>
        </div>

        <div class="data-container">
          <h4 v-if="feedback_details?.salutation">{{ feedback_details?.salutation }}&nbsp;</h4>
          <h4 v-if="feedback_details?.firstName">{{ feedback_details?.firstName }}&nbsp;</h4>
          <h4 v-if="feedback_details?.lastName">{{ feedback_details?.lastName }}&nbsp;</h4>
          <h4 v-if="feedback_details?.email">{{ feedback_details?.email }}&nbsp;</h4>
          <h4 v-if="feedback_details?.address">{{ feedback_details?.address }}&nbsp;</h4>
          <h4 v-if="feedback_details?.phone">{{ feedback_details?.phone }}&nbsp;</h4>
          <h4 v-if="feedback_details?.zip">{{ feedback_details?.zip }}&nbsp;</h4>
          <h4 v-if="feedback_details?.location">{{ feedback_details?.location }}&nbsp;</h4>
          <h4 v-if="feedback_details?.source">{{ feedback_details?.source }}&nbsp;</h4>
          <h4 v-if="feedback_details?.created_at">{{ feedback_details?.created_at | moment("DD.MM.YYYY HH:mm") }}&nbsp;</h4>
          <h4 v-if="feedback_details?.company">{{ feedback_details?.company }}&nbsp;</h4>
          <h4 v-if="feedback_details?.followUpAppointment">{{ formatDate(feedback_details?.followUpAppointment) }}&nbsp;</h4>
          <h4 v-if="feedback_details?.pendingFeedback">{{ formatDate(feedback_details?.pendingFeedback) }}&nbsp;</h4>
          <h4 v-if="feedback_details?.recordNote">{{ feedback_details?.recordNote }}&nbsp;</h4>
          <h4 v-if="feedback_details?.contractFile">
            <a :href="feedback_details?.contractFile" target="_blank">
            {{ extractFilename(feedback_details?.contractFile) }}
            </a>
          </h4>
          <h4 v-if="feedback_details?.contractExpiration">{{ formatYear(feedback_details?.contractExpiration) }}&nbsp;</h4>
          <h4 v-if="feedback_details?.kvgAbgschlossen">{{ feedback_details?.kvgAbgschlossen }}&nbsp;</h4>
          <h4 v-if="feedback_details?.modelInsurance">{{ feedback_details?.modelInsurance }}&nbsp;</h4>
          <h4 v-if="feedback_details?.franchise">{{ feedback_details?.franchise }}&nbsp;</h4>
          <h4 v-if="feedback_details?.accidentCoverage">{{ feedback_details?.accidentCoverage }}&nbsp;</h4>
          <h4 v-if="feedback_details?.vvgInsuranceType">{{ feedback_details?.vvgInsuranceType }}&nbsp;</h4>
          <h4 v-if="feedback_details?.vvgContract">
            <a :href="feedback_details?.vvgContract" target="_blank">
              {{ extractFilename(feedback_details?.vvgContract) }}
            </a>
          </h4>
          <h4 v-if="feedback_details?.other">
            <a :href="feedback_details?.other" target="_blank">
              {{ extractFilename(feedback_details?.other) }}
            </a>
          </h4>
          <h4 v-if="feedback_details?.consultationFeedback">{{ feedback_details?.consultationFeedback }}&nbsp;</h4>
          <h4 v-if="feedback_details?.consultationFile">
            <a :href="feedback_details?.consultationFile" target="_blank">
              {{ extractFilename(feedback_details?.consultationFile) }} 
            </a>
          </h4>

        </div>
        <v-col class="p-0">
          <h2 v-if="feedback_details.persons.length > 0">{{ translate('Persons') }}</h2>
          <v-data-table 
              v-if="feedback_details.persons.length > 0"
              :headers="translatedHeaders" 
              :items="feedback_details.persons" 
              :loading="loading"
              :options.sync="options"
              :footer-props="{'items-per-page-text':translate('Rows per page'), 'items-per-page-all-text':translate('All')}"
            >
              <template v-slot:no-data>
                {{translate('No data available')}}
              </template>
              <template v-slot:loading>
                {{translate('Loading items')}}...
              </template>
              <template v-slot:[`item.firstName`]="{ item }">
                {{ item.firstName }}
              </template>
              <template v-slot:[`item.lastName`]="{ item }">
                {{ item.lastName }}
              </template>
              <template v-slot:[`item.date`]="{ item }">
                {{ formatDate(item.date) }}
              </template>
              <template v-slot:[`item.unfalldeckung`]="{ item }">
                {{ item.unfalldeckung }}
              </template>
              <template v-slot:[`item.cost`]="{ item }">
                €{{ item.cost }}
              </template>
              <template v-slot:[`item.kvg`]="{ item }">
                {{ item.kvg.toUpperCase() }}
              </template>
              <template v-slot:[`item.vvg`]="{ item }">
                {{ item.vvg.toUpperCase() }}
              </template>
          </v-data-table>
        </v-col>
      </v-row>

     
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
Vue.use(require('vue-moment'));
import axios from "axios";
import * as LANGUAGE from '../../../store/language.json';
import FolgeTermin from '../../Dialogs/FolgeTermin.vue';
import Pendent from '@/components/Dialogs/PendentDialog.vue';
import MJVDialog from '@/components/Dialogs/MJVDialog.vue';
import BehandlungDialog from '@/components/Dialogs/BehandlungDialog.vue';
import KeineBeratung from '@/components/Dialogs/KeineBeratung.vue';
import AbgeschlossenDialog from '@/components/Dialogs/AbgeschlossenDialog.vue';

export default {
  data() {
    return {
      headers: [
        { text: 'First Name', value: 'firstName' },
        { text: 'Last Name', value: 'lastName' },
        { text: 'Franchise', value: 'cost' },
        { text: 'Accident coverage', value: 'unfalldeckung' },
        { text: 'KVG', value: 'kvg' },
        { text: 'VVG', value: 'vvg' },
        { text: 'Date', value: 'date' }
      ],
      feedback_details: {
        userId: "",
        salutation: "",
        firstName: "",
        lastName: "",
        email: "",
        birthday: "",
        address: "",
        zip: "",
        location: "",
        persons: [],
        company: "",
        fax: "",
        phone: "",
        status_id: "",
        client_type_id: "",
        created_at: "",
        followUpAppointment: "",
        pendingFeedback: "",
        recordNote: "",
        contractFile: "",
        contractExpiration: "",
        isAbschluss: false,
      },
      abgeschlossenDialog: false,
      folgeTerminDialog: false,
      pendentDialog: false,
      mjvDialog: false,
      behandlungDialog: false,
      keinBeratungDialog: false,
      keinAbschlussDialog: false,
      isAdmin: false,
    };
  },
  created() {
    this.getFeedbackData(this.$route.params.id);
  },
  watch: {
    abgeschlossenDialog: function() {
      this.getFeedbackData(this.$route.params.id);
    },
    folgeTerminDialog: function() {
      this.getFeedbackData(this.$route.params.id);
    },
    pendentDialog: function() {
      this.getFeedbackData(this.$route.params.id);
    },
    mjvDialog: function() {
      this.getFeedbackData(this.$route.params.id);
    },
    behandlungDialog: function() {
      this.getFeedbackData(this.$route.params.id);
    },
    keinBeratungDialog: function() {
      this.getFeedbackData(this.$route.params.id);
    },
    keinAbschlussDialog: function() {
      this.getFeedbackData(this.$route.params.id);
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    formatYear(date) {
      const options = { year: 'numeric'};
      return new Date(date).toLocaleDateString(undefined, options);
    },
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
    getFeedbackData(itemId) {
      axios
          .get("/feedback/" + itemId)
          .then((response) => {
            this.feedback_details = response.data.data
          })
          .catch((error) => {
            console.log(error);
          });
    },
    openAbgeschlossenDialog() {
      this.abgeschlossenDialog = true;
    },
    closeAbgeschlossenDialog() {
      this.abgeschlossenDialog = false;
    },
    openFolgeTerminDialog() {
      this.folgeTerminDialog = true;
    },
    closeFolgeTerminDialog() {
      this.folgeTerminDialog = false;
    },
    openPendentDialog() {
      this.pendentDialog = true;
    },
    closePendentDialog() {
      this.pendentDialog = false;
    },
    openMJVDialog() {
      this.mjvDialog = true;
    },
    closeMJVDialog() {
      this.mjvDialog = false;
    },
    openBehandlungDialog() {
      this.behandlungDialog = true;
    },
    closeBehandlungDialog() {
      this.behandlungDialog = false;
    },
    openKeinBeratungDialog() {
      this.keinBeratungDialog = true;
    },
    closeKeinBeratungDialog() {
      this.keinBeratungDialog = false;
    },
    openKeinAbschlussDialog() {
      this.keinAbschlussDialog = true;
    },
    closeKeinAbschlussDialog() {
      this.keinAbschlussDialog = false;
    },
    extractFilename(url) {
      const parts = url.split('/');
      return parts[parts.length - 1];
    }
  },
  computed: {
    translatedHeaders() {
      return this.headers.map(header => {
        return {
          text: this.translate(header.text),
          value: header.value
        };
      });
    }
  },
  mounted() {
    if (this.$helperPlugin.ifAdmin()) {
      this.isAdmin = true;
    }
  },
  components: { FolgeTermin, Pendent, MJVDialog, BehandlungDialog, KeineBeratung, AbgeschlossenDialog }
};
</script>

<style scoped>
.prefix {
  margin-right: 20px;
  font-weight: 400;
}

.buttons {
  background: #36a5dd !important;
  border-radius: 6px !important;
  color: #fff !important;
  box-shadow: none;
}
.data-container:nth-child(2) {
  margin-right: 20px;
  width: 300px;
}
@media only screen and (max-width: 1280px) {
  .data-container {
    margin-bottom: 20px;
  }
  .data-container h4 {
    height: 40px;
    line-height: 1;
    display: flex;
    align-items: center;
  }
}
@media only screen and (max-width: 550px) {
  .data-container {
    width: 45%!important;
    font-size: 12px;
  }
  .dialog-buttons {
    overflow-x: auto;
  }
}
.data-container > h4 {
  padding: 7px 0;
  border-bottom: 1px solid white;
}
h2 {
  text-align: left;
}
.v-data-table {
  margin-top: 20px;
}
</style>