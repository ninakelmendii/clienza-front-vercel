<template>
  <v-row>
    <SnackBar :data="snackbar" ref="snackbar"></SnackBar>
    <v-dialog
      v-model="editModal"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          {{ translate("Comment") }}
        </v-card-title>

        <v-card-text>
          <v-textarea
            :label="translate('Comment')"
            v-model="comment"
            rows="4"
          ></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="editModal = false"
          >
            {{ translate('Close') }}
          </v-btn>
          <v-btn
            color="primary"
            @click="updateCommission"
          >
           {{ translate('Finish') }} 
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row justify="space-between">
      <v-col cols="12" xs="12" sm="12" md="4" lg="4">
        <!-- <v-text-field
          v-model="search"
          rounded
          filled
          background-color="white"
          :label="translate('Search')"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field> -->
      </v-col>
      <v-col cols="12" xs='12' md="4" lg="4">
        <div class="d-flex justify-end align-center">
          <v-select
            v-model="active_filter"
            :items="filters"
            :value="filters[0]"
          >
          </v-select>
        </div>
      </v-col>
    </v-row>
    <v-col class="table-container" cols="12" md="12" lg="12">
      <v-data-table
        :headers="headers"
        :items="data"
        :search="search"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalTableData"
        :footer-props="{'items-per-page-text':translate('Rows per page'), 'items-per-page-all-text':translate('All')}"
      >
        <template v-slot:loading>
          {{translate('Loading items')}}...
        </template>
        <template v-slot:no-data>
          {{translate('No data available')}}
        </template>
        <template v-slot:[`item.agent_name`]="{ item }">
          <div  @click="$router.push('/feedback/' + item.id)" v-if="item.user != null">
            {{ item.user.first_name }} {{ item.user.last_name }}
          </div>
        </template>

        <template v-slot:[`item.edit_comment`]="{ item }">
          <v-btn v-if="item.feedback_comment != null" icon @click="openEditModal(item, false)">
            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.4821 8.94807L5.00602 12.298C4.98108 12.4757 5.03437 12.6553 5.15222 12.7902C5.26992 12.9251 5.44034 13.0017 5.61888 13H5.6944L9.08546 12.5772V12.577C9.22097 12.5599 9.34679 12.4977 9.44298 12.4006L16.1473 5.65393C16.6788 5.1571 16.9865 4.46458 16.9996 3.73522C17.0127 3.0059 16.7301 2.30261 16.2167 1.7869C15.7035 1.27119 15.0035 0.987279 14.2777 1.00044C13.5519 1.01361 12.8626 1.32273 12.3681 1.85661L5.65536 8.59929C5.56146 8.69364 5.50047 8.81606 5.48181 8.94821L5.4821 8.94807ZM6.66691 9.32578L13.2304 2.72678C13.6031 2.40349 14.1136 2.29252 14.5858 2.43212C15.0582 2.57172 15.4275 2.94285 15.5665 3.41747C15.7054 3.89194 15.595 4.40493 15.2732 4.77934L8.71808 11.3783L6.33218 11.674L6.66691 9.32578Z" fill="#36a5dd"/>
              <path d="M9.53572 0H2.35709C1.73198 0 1.13243 0.244597 0.690427 0.680187C0.248267 1.11564 0 1.70629 0 2.32228V16.6777C0 17.2937 0.248279 17.8844 0.690427 18.3198C1.13243 18.7554 1.73198 19 2.35709 19H15.6429C16.268 19 16.8676 18.7554 17.3096 18.3198C17.7517 17.8844 18 17.2937 18 16.6777V8.07501C18 7.84882 17.8774 7.63971 17.6786 7.52662C17.4797 7.41338 17.2347 7.41338 17.0357 7.52662C16.8368 7.63971 16.7144 7.84882 16.7144 8.07501V16.6777C16.7144 16.9577 16.6014 17.2263 16.4005 17.4242C16.1996 17.6221 15.9271 17.7333 15.6429 17.7333H2.35709C2.07294 17.7333 1.80044 17.6221 1.59955 17.4242C1.39865 17.2263 1.28565 16.9577 1.28565 16.6777V2.32228C1.28565 2.04234 1.39865 1.77373 1.59955 1.57582C1.80044 1.3779 2.07293 1.26672 2.35709 1.26672H9.53572C9.76546 1.26672 9.97758 1.14597 10.0925 0.949974C10.2073 0.754121 10.2073 0.5126 10.0925 0.316608C9.97758 0.120755 9.76547 3.73898e-06 9.53572 3.73898e-06L9.53572 0Z" fill="#36a5dd"/>
            </svg>
          </v-btn>
          <v-btn v-else icon @click="openEditModal(item, true)">
            <svg width="20" height="20" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.2854 3.54275L11.1711 14.5999L6.77125 9.79979C6.34276 9.3426 5.62849 9.3141 5.14257 9.71409C4.68538 10.1426 4.65688 10.8568 5.05687 11.3428L10.2283 16.9999C10.4569 17.257 10.7712 17.3714 11.0855 17.3714C11.3713 17.3714 11.6284 17.2857 11.857 17.0856L24.8284 5.22846C25.2856 4.79997 25.3141 4.08571 24.9141 3.59979C24.4856 3.1426 23.7713 3.1141 23.2856 3.54259L23.2854 3.54275Z" fill="#FFC107"></path><path d="M11.9999 24C18.6285 24 23.9999 18.6286 23.9999 12C23.9999 11.4286 23.9714 10.8857 23.8857 10.3428C23.8 9.71428 23.2286 9.28576 22.6001 9.37147C21.9715 9.45717 21.543 10.0286 21.6287 10.6571C21.6859 11.1143 21.7144 11.5715 21.7144 12C21.7144 17.3428 17.343 21.7143 12.0001 21.7143C6.65724 21.7143 2.28581 17.3428 2.28581 12C2.28581 6.65713 6.65724 2.2857 12.0001 2.2857C14.2859 2.2857 16.5144 3.0857 18.2572 4.57147C18.7429 4.97146 19.4572 4.91427 19.8572 4.42857C20.2572 3.94288 20.2 3.22857 19.7143 2.82862C17.5716 0.999847 14.8287 0 12 0C5.37143 0 0 5.37143 0 12C0 18.6286 5.37143 24 12 24L11.9999 24Z" fill="#FFC107"></path></svg>
          </v-btn>
          </template>

        <template v-slot:[`item.comment`]="{ item }">
          <span v-if="item.feedback_comment != null">
            {{ item.feedback_comment.comment }}
          </span>
          <span v-else>
            {{ translate('Pending') }}
          </span>
        </template>

        <template v-slot:[`item.lead_name`]="{ item }">
            <span  @click="$router.push('/feedback/' + item.id)">{{ item.first_name }} {{ item.last_name }}</span>
        </template>

        <template v-slot:[`item.created_at`]="{item}">
          {{ item | moment("DD.MM.YYYY") }}
        </template>
      </v-data-table>

          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title class="d-flex justify-center">
                <span class="text-h5">Set the default fee % for all agents</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row class="d-flex justify-center">
                    <v-col cols="12" xs="12" md="4" lg="4">
                      <v-text-field small outlined type="number" v-model="percentage" max="100" min="0" value="0">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  v-show="isCreateMode"
                  color="primary"
                  @click="save"
                >
                  Done
                </v-btn>
                <v-btn
                  v-show="!isCreateMode"
                  color="primary"
                  @click="update"
                >
                  Done
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogDelete" max-width="550px">
              <v-card>
              <v-row no-gutters no-wrap style="padding: 24px;">
                  <img src="@/assets/gifs/trash.gif" style="width: 56px; height: 56px;" />
                  <div style="margin-left: 16px;">
                      <v-card-title class="text-h5 p-0">{{translate('Delete')}}</v-card-title>
                      <v-card-text class="p-0" style="margin-top: 4px;">{{ translate('Are you sure you want to delete this item?') }}</v-card-text>
                  </div>
              </v-row>
              <v-card-actions class="justify-end">
                  <button @click="closeDelete" class="btn btn-cancel" :class="{ 'btn-dark': $vuetify.theme.dark }"
                      >{{ translate('Cancel') }}</button
                  >
                  <button
                      color="blue darken-1"
                      text
                      @click="deleteItemModalConfirm()"
                      class="btn btn-decline"
                      >{{translate('Confirm')}}</button
                  >
              </v-card-actions>
              </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import * as LANGUAGE from '../../store/language.json';
import SnackBar from "../Snackbar/SnackBar.vue";

Vue.use(require('vue-moment'));

export default {
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      search: "",
      isAdmin: false,
      percentage: 0,

      filters: [
        {
          text: this.translate('All'),
          value: 'All'
        },
        {
          text: this.translate('Approved'),
          value: 'Approved'
        },
        {
          text: this.translate('Pending'),
          value: 'Pending'
        }
      ],

      headers: [
        {
          text: this.translate("Date"),
          align: "start",
          value: "created_at",
        },
        { text: this.translate('Agent Name'), value: 'agent_name' },
        { text: this.translate('Lead Name'), value: 'lead_name' },
        { text: this.translate("Comment"), value: "comment" },
        { text: this.translate('Actions'), value: 'edit_comment', align: 'center' }
      ],
      data: [],

      get_agents_list: [],

      snackbar: {
        show: false,
        message: null,
        color: null,
      },

      isCreateMode: true,

      dialog: false,
      dialogDelete: false,

      loading: true,
      options: {},
      totalTableData: 0,

      active_filter: 'All',
      editItemInfo: 0,
      editModal: false,
      comment: ''
    };
  },

  computed: {
    formated_date(){
        if (!this.date) return null

        const [year, month, day] = this.date.split('-')
        return `${day}.${month}.${year}`
    },
  },

  watch: {
    options: {
      handler() {
        this.getItemsTable();
      },
      deep: true,
    },

    active_filter(new_filter_value){
      this.getItemsTable(new_filter_value);
    }
  },

  components: {
    SnackBar,
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
    async updateCommission(){
      this.loading = true;
      this.editModal = false;

      axios
          .post(`feedback/comment/${this.editItemInfo.id}`, {
            feedbackComment: this.comment
          })
          .then(() => {
              this.snackbar = {
                show: true,
                message: this.translate('Comment saved successfully'),
                color: 'success',
              };
    
              this.$refs.snackbar.toggleSnackbar(true);
    
              this.getItemsTable();
            }).catch(err => console.log(err));
    },

    openEditModal(item, firstTime){
      this.editItemInfo = item;

      axios
        .get(`feedback/${item.id}`)
        .then((res) => this.comment = res.data.data.comment);
      
      this.commission_value = firstTime ? 0 : parseInt(item.commission);
      this.editModal = true;
    },

    getItemsTable(active_filter = 'All') {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;

      let sortType;
      sortType = "asc";
      if (sortDesc[0]) {
        sortType = "desc";
      }

      axios
        .get("/feedback_comment", {
          params: {
            sort_by: sortBy[0],
            sort: sortType,
            page: page,
            per_page: itemsPerPage,
            filter: active_filter
          },
        })
        .then((response) => {
          this.data = response.data.data;
          this.totalTableData = response.data.total;
          this.loading = false;

          this.$nextTick(() => {
            const currentEl = this.$el.querySelector(".v-data-footer__pagination");
            const translated = currentEl.innerHTML.replace("of", this.translate("of"));

            currentEl.innerHTML = translated;
          });
        })
        .catch((error) => {
          console.log(error);
        });
        
    },

    getAgentsList() {
      axios
          .get("/admin/agent")
          .then((response) => {

            for (let $i = 0; response.data.length > 0; $i++) {

              this.get_agents_list.push({
                text: response.data[$i].first_name + ' ' + response.data[$i].last_name,
                value: response.data[$i].id,
              });

            }

          })
          .catch((error) => {
            console.log(error);
          });
    },

    openDialog() {
      this.isCreateMode = true;
      this.dialog = true;
    },

    save(){
      this.dialog = false;
    },

    update(){
      this.dialog = false;
    },
  },

  mounted() {
    this.getItemsTable();
    this.getAgentsList();

    if (this.$helperPlugin.ifAdmin()) {
      this.isAdmin = true;
    }
  },
};
</script>

<style scoped>
.v-data-table {
  border-radius: 10px;
}

.user-card {
  border-radius: 10px !important;
  border: none;
}

.v-data-table tr td {
  border: none !important;
}
td.text-start * {
  cursor: pointer !important;
}

.card-title .text-h4 {
  font-size: 20px !important;
  line-height: 24px !important;
}

.percent {
  color: #fe9210;
  font-weight: 500;
  font-size: 12px;
}

.name {
  color: #686868;
  font-weight: 500;
  font-size: 12px;
}
.table-container {
  padding: 0;
}
</style>