<template>
  <v-row class="mt-15 mb-15">
    <SnackBar :data="snackbar" ref="snackbar"></SnackBar>
    <v-col
      cols="12"
      v-for="card in cards.slice(0, 1)"
      :key="card.id"
    >
      <v-card
        outlined
        rounded
        max-width="280"
        class="card application-card pa-3"
        :class="card.class"
      >
        <div class="d-flex justify-center">
          <div class="application-status" :class="card.class">
            <v-icon class="mt-2" dark>{{ card.icon }}</v-icon>
          </div>
        </div>

        <v-row>
          <v-col cols="12" xs="12" sm="12" md="12" lg="12">
            <v-select v-model="default_status" v-if="$helperPlugin.ifAdmin()" flat label="Status" :items="application_status_data" v-on:change="updateStatus(card.id, $event)"> </v-select>
            <p v-else style="margin-top: 5px">{{ card.status }}</p>
          </v-col>

          <!-- <v-col cols="12" xs="12" sm="12" md="3" lg="3" class="d-flex" v-if="downloadUrl">
            <v-btn @click="downloadPdfFile" icon color="grey"><svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.0388 6.26446C17.9756 6.27315 17.9132 6.28326 17.844 6.28326C17.7987 6.28326 17.759 6.27404 17.7163 6.27049V21.9656C17.7163 22.5261 17.2606 22.9827 16.6991 22.9827H2.03443C1.47337 22.9827 1.0173 22.5259 1.0173 21.9656L1.01713 2.0445C1.01713 1.48345 1.47337 1.02738 2.03425 1.02738H13.4875C13.1554 0.796421 12.9835 0.407422 12.9718 0.0102539H2.03448C0.913043 0.0102539 0 0.922751 0 2.04473V21.9654C0 23.0868 0.912997 23.9998 2.03448 23.9998H16.6992C17.8217 23.9998 18.7337 23.0868 18.7337 21.9654V6.66126C18.433 6.60928 18.2015 6.46382 18.0388 6.26444L18.0388 6.26446Z" fill="black" fill-opacity="0.56"/>
              <path d="M18.2244 7.18387C18.2225 7.18387 18.2184 7.1844 18.2138 7.18387H13.0383C12.752 7.18387 12.5205 6.95593 12.5205 6.67531V0.508893C12.5205 0.294251 12.6578 0.103028 12.8632 0.0303019C13.0677 -0.0429604 13.298 0.0196583 13.4374 0.185341L18.5603 6.28818C18.6722 6.38184 18.7419 6.52056 18.7419 6.67578C18.7423 6.95605 18.511 7.18384 18.2245 7.18384L18.2244 7.18387ZM13.5561 6.16675H17.1169L13.5561 1.92505V6.16675Z" fill="black" fill-opacity="0.56"/>
              <path d="M14.0565 15.8832H4.67678C3.5548 15.8832 2.6423 14.9707 2.6423 13.8488V11.115C2.6423 9.99306 3.5548 9.08057 4.67678 9.08057H14.0561C15.178 9.08057 16.0905 9.99306 16.0905 11.115V13.8488C16.0909 14.9707 15.1786 15.8832 14.0566 15.8832H14.0565ZM4.67678 10.0978C4.11572 10.0978 3.65966 10.5541 3.65966 11.115V13.8487C3.65966 14.4097 4.1159 14.8658 4.67678 14.8658H14.0561C14.6171 14.8658 15.0732 14.4096 15.0732 13.8487V11.115C15.0732 10.5539 14.6169 10.0978 14.0561 10.0978H4.67678Z" fill="black" fill-opacity="0.56"/>
              <path d="M6.27289 10.814C6.50793 10.814 6.70927 10.8421 6.87813 10.8979C7.04647 10.9535 7.18537 11.0301 7.29411 11.1278C7.40338 11.2256 7.48374 11.3403 7.53625 11.4732C7.58804 11.6059 7.61359 11.7494 7.61359 11.9036C7.61359 12.0699 7.58662 12.2225 7.53376 12.3612C7.48037 12.5001 7.39841 12.6197 7.28914 12.7183C7.17988 12.8169 7.03991 12.8948 6.87157 12.9501C6.70323 13.006 6.50331 13.034 6.27287 13.034H5.87002V14.1484H5.09644V10.8135H6.27286L6.27289 10.814ZM6.27289 12.4506C6.47423 12.4506 6.61933 12.4024 6.70767 12.3067C6.79619 12.2106 6.84036 12.0758 6.84036 11.9039C6.84036 11.8276 6.82918 11.7579 6.8063 11.6953C6.78342 11.6327 6.74883 11.5787 6.70199 11.534C6.65516 11.4893 6.59662 11.4542 6.52549 11.4297C6.45436 11.4053 6.37045 11.3932 6.27271 11.3932H5.86986V12.4506L6.27289 12.4506Z" fill="black" fill-opacity="0.56"/>
              <path d="M11.0337 12.4812C11.0337 12.7223 10.992 12.9445 10.9086 13.1485C10.8258 13.352 10.7082 13.5285 10.5577 13.6775C10.4066 13.826 10.2251 13.942 10.0119 14.0253C9.79885 14.1087 9.56274 14.1499 9.30338 14.1499H8.00739V10.8149H9.30338C9.56272 10.8149 9.79882 10.8572 10.0119 10.9411C10.2249 11.025 10.4066 11.141 10.5577 11.2889C10.7089 11.4369 10.8258 11.6128 10.9086 11.8163C10.992 12.0203 11.0337 12.2415 11.0337 12.4812V12.4812ZM10.2413 12.4812C10.2413 12.3164 10.22 12.1674 10.1772 12.0347C10.1345 11.902 10.0729 11.7896 9.99312 11.697C9.91329 11.6044 9.81466 11.5338 9.69918 11.4845C9.5837 11.4351 9.45155 11.4101 9.30343 11.4101H8.78565V13.5549H9.30343C9.45137 13.5549 9.58371 13.5301 9.69918 13.4806C9.81519 13.4313 9.91329 13.36 9.99312 13.2675C10.0729 13.1755 10.1345 13.063 10.1772 12.9303C10.2198 12.7975 10.2413 12.6469 10.2413 12.4812V12.4812Z" fill="black" fill-opacity="0.56"/>
              <path d="M12.27 11.41V12.2548H13.4098V12.8519H12.27V14.1499H11.4924V10.8149H13.6391V11.4101L12.27 11.41Z" fill="black" fill-opacity="0.56"/>
              </svg>
            </v-btn>
          </v-col> -->
        </v-row>
        <div class="d-flex justify-center" style="margin-top: 10px">
          <v-img :src="require(`@/assets/images/offers/${kvg_name}.png`)" max-width="100"></v-img>
        </div>
        <h4 class="title text-center mt-5">{{ card.title }}</h4>
        <ul class="text-center">
          <li>{{ translate('Beginning') }}: {{ card.created_at | moment('DD[.]MM[.]YYYY')}}</li>
          <!-- <li class="mt-1">{{ translate('End') }}: {{ card.end | moment('DD[.]MM[.]YYYY')}}</li> -->
          <li>{{ translate(card.label) }}: {{ card.updated_at | moment('DD[.]MM[.]YYYY')}}</li>
        </ul>
        <v-row no-gutters justify="center" class="mt-3" v-if="downloadUrl != undefined && downloadUrl.id">
          <v-btn @click="downloadPdfFile" color="primary" >{{ translate('Download') }} 
            <svg style="margin-left: 10px;" width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5688 7.159L8.46605 9.42109V1H7.72982V9.4224L5.62623 7.15878L5.08684 7.66084L8.09712 10.8986L11.1081 7.66084L10.5688 7.159Z" fill="white" stroke="white" stroke-width="0.4"/>
                <path d="M15.1949 18.7483H1V4.5542H5.60822V5.29044H1.73606V18.0121H14.4586V5.29044H10.5869V4.5542H15.1947L15.1949 18.7483Z" fill="white" stroke="white" stroke-width="0.4"/>
              </svg>
          </v-btn>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
    
<script>
import Vue from 'vue';
import MGraph from './../../../services/mgraph';
import * as LANGUAGE from '../../store/language.json';
import SnackBar from '../Snackbar/SnackBar.vue';

Vue.use(require("vue-moment"));
import axios from "axios";

export default {
  name: "ApplicationTab",
  data() {
    return {
      snackbar: {
      show: false,
      message: null,
      color: null,
      },
      items: [
        {
          text: 'Pending',
          value: 1,
        },
        {
          text: 'Accepted',
          value: 2,
        },
        {
          text: 'Commissioned',
          value: 5,
        },
        {
          text: 'Archived',
          value: 4,
        },
        {
          text: 'Declined',
          value: 3,
        },
      ],
      application_status: '',
      cards: [],
      application_status_data: [],
      downloadUrl: null,
      default_status: null,
      insurances: [],
      kvg_name: null
    };
  },

  components: {SnackBar},

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
    getCustomerApplications(){
      axios.get('application/customer/' + this.$router.currentRoute.params.client_id).then(response => {
        this.cards = [];

        console.log("-----", response.data);

          for (let $i = 0; response.data.data.length > 0; $i++) {

            let newData = response.data.data[$i];

            if (response.data.data[$i].status == 'Pending') {
              newData.color = 'pending'
              newData.label = response.data.data[$i].status
              newData.class = 'pending'
              newData.icon = 'mdi-timer-sand-complete'
              this.default_status = 1;
            }

            if (response.data.data[$i].status == 'Accepted') {
              newData.color = 'success'
              newData.label = response.data.data[$i].status
              newData.class = 'accepted'
              newData.icon = 'mdi-check'
              this.default_status = 2;
            }

            if (response.data.data[$i].status == 'Declined') {
              newData.color = 'error'
              newData.label = response.data.data[$i].status
              newData.class = 'declined'
              newData.icon = 'mdi-close'
              this.default_status = 3;
            }

            if (response.data.data[$i].status == 'Archived') {
              newData.color = 'grey'
              newData.label = response.data.data[$i].status
              newData.class = 'archived'
              newData.icon = 'mdi-check'
              this.default_status = 5;
            }

            if (response.data.data[$i].status == 'Commissioned') {
              newData.color = 'primary'
              newData.label = response.data.data[$i].status
              newData.class = 'commissioned'
              newData.icon = 'mdi-timer-sand-complete'
              this.default_status = 4;
            }

            this.cards.push(newData)
          }
        
      }).catch(error => {
        console.log(error)
      })
    },

    getInsurances() {
      axios
            .get('/customer/' + this.$router.currentRoute.params.client_id)
            .then(res => {
              const {kvg_id} = res.data.data;

              axios
                  .get('/insurances')
                  .then(response => {
                    const insurances = response.data.data;

                    this.kvg_name = insurances.find(i => i.id == kvg_id).name.toLowerCase();
                  })
                  .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

      
    },

    getSingleLogo(id) {
      return this.insurances.find(ins => ins.id == id).name;
    },

    updateCustomerMandateStatus(status_id) {
      axios
          .get('/application/update_status' + this.$router.currentRoute.params.client_id, {
            params: {
              status_id: status_id
            }
          })
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {console.log(error)})
    },

    updateStatus(application_id, event){
      axios
          .post('/application/update_status/' + application_id, {
            status_id: event
          })
          .then(() => {
            this.snackbar = {
              message: "Data updated successfully",
              color: "success",
              error: false,
            };

            this.$refs.snackbar.toggleSnackbar(true);

            this.getCustomerApplications();
            this.default_status = event;
            // window.location.reload();
          })
          .catch((error) => {console.log(error)})
    },

    getApplicationsStatuses() {
      axios
        .get("/application/statuses")
        .then((response) => {
          for (let $i = 0; response.data.data.length > 0; $i++) {
            this.application_status_data.push({
              text: this.translate(response.data.data[$i].name),
              value: response.data.data[$i].id,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async downloadPdfFile(){
      axios
          .get('download_internal?id=' + this.downloadUrl.id, { responseType: 'blob' })
          .then(res =>  {
              const file = window.URL.createObjectURL(res.data);
              let documentUrl = document.createElement('a');

              documentUrl.href = file;
              documentUrl.download = (this.downloadUrl.filename);
              document.body.appendChild(documentUrl);
              documentUrl.click();

              documentUrl.remove();
              window.URL.revokeObjectURL(file);
          })
          .catch(err => console.log(err));
    },

    async getDownloadUrl() {
      axios
          .get('/internal_documents?category=policies&customer_id=' + this.$router.currentRoute.params.client_id)
          .then(response => {
            this.downloadUrl = response.data.data[0];
          }).catch(err => console.log(err));

      this.downloadUrl = await MGraph.getCustomerDownloadFileLink(this.$router.currentRoute.params.client_id);
    }
  },

  async mounted() {
    this.getCustomerApplications();
    this.getApplicationsStatuses();
    this.getDownloadUrl();
    this.getInsurances();
  },
};
</script>


<style scoped>
.title,
.subtitle {
  color: #36a5dd;
  margin: 10px 0 15px 0;
}

.card {
  border: solid 1px #ecf1f6;
}

li {
  list-style: none;
}

.v-application ul,
.v-application ol {
  padding-left: unset;
}

.application-card.accepted {
  padding: 35px;
  border-radius: 20px !important;
  border-bottom: solid 10px green;
}
.application-card.pending {
  border-radius: 20px !important;
  border-bottom: solid 10px orange;
}
.application-card.declined {
  border-radius: 20px !important;
  border-bottom: solid 10px red;
}
.application-card.archived {
  border-radius: 20px !important;
  border-bottom: solid 10px grey;
}
.application-card.commissioned {
  border-radius: 20px !important;
  border-bottom: solid 10px #36a5dd;
}

div.application-status {
  margin-top: -30px;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  text-align: center;
}

.application-status.accepted {
  background: green !important;
}

.application-status.pending {
  background: orange !important;
}

.application-status.declined {
  background: red !important;
}

.application-status.archived {
  background: grey !important;
}

.application-status.commissioned {
  background: #36a5dd !important;
}
</style>