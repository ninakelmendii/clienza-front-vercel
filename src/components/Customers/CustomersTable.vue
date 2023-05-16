<template>
  <v-row>
    <SnackBar :data="snackbar" ref="snackbar"></SnackBar>
    <v-row justify-content="space-between" class="customer-search">
      <v-col cols="12" sm="12" md="6">
        <v-row no-gutters justify="space-between">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="search_string"
              rounded
              filled
              :background-color="$vuetify.theme.dark ? '' :'white'"
              :label="translate('Search name') + ' / ' + translate('date of birth')"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-menu
              v-model="menu_search_birthday"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="filtered_search_birthday"
                  :label="translate('Date')"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="search_birthday"
                :first-day-of-week="1"
                @input="menu_search_birthday = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="customer-filter" v-if="this.$router.currentRoute.name != 'home'">
          <v-select v-model="defaultFilter" :items="filters"></v-select>
        </div>
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-row justify="end" no-gutters>
        <v-btn
            color="primary mb-2 ml-2 lead-buttons"
            dark
            class="mb-2"
            @click="openDialog"
            v-if="$router.currentRoute.name != 'home'"
          >
            <v-icon>mdi-plus</v-icon> {{ translate('New Customer') }}
          </v-btn>
      </v-row>
    </v-col>
    <v-col cols="12" md="12" lg="12">
      <v-data-table
        :headers="headers"
        :items="data"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalCustomersTable"
        :footer-props="{'items-per-page-text':translate('Rows per page'), 'items-per-page-all-text':translate('All'), 'options': {'groupBy': 'asaaadas'}}"
    
        class="customers-table"
      >
        <template v-slot:no-data>
          {{translate('No data available')}}
        </template>
        <template v-slot:loading>
          {{translate('Loading items')}}...
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ translate(formTitle) }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-radio-group v-model="create_customer_data.salutation" row>
                            <v-radio label="Frau" value="frau"></v-radio>
                            <v-radio label="Herr" value="herr"></v-radio>
                          </v-radio-group>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="create_customer_data.first_name"
                          :label="translate('First Name')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="create_customer_data.last_name"
                          :label="translate('Last Name')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="create_customer_data.email"
                          :label="translate('Email')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="create_customer_data.street_no"
                          :label="translate('Street No')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="filtered_date"
                              :label="translate('Birthday')"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="create_customer_data.birthday"
                            :active-picker.sync="activePicker"
                            :max="
                              new Date(
                                Date.now() -
                                  new Date().getTimezoneOffset() * 60000
                              )
                                .toISOString()
                                .substr(0, 10)
                            "
                            min="1950-01-01"
                            @change="saveDate"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="create_customer_data.zip"
                          :label="translate('ZIP')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="create_customer_data.place"
                          :label="translate('Place')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="create_customer_data.phone"
                          :label="translate('Phone')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="create_customer_data.fax"
                          :label="translate('Fax')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="create_customer_data.type"
                          :label="translate('Type')"
                          :items="client_types"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                            v-model="create_customer_data.canton_id"
                            :label="translate('Canton')"
                            :items="canton_select"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                            v-model="create_customer_data.lang"
                            :label="translate('Language')"
                            :items="lang_select"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                            v-model="create_customer_data.source_id"
                            :label="translate('Source')"
                            :items="source_id"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    {{translate('Cancel')}}
                  </v-btn>

                  <v-btn
                    v-show="isCreateMode"
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    {{translate('Create')}}
                  </v-btn>
                  <v-btn
                    v-show="!isCreateMode"
                    color="blue darken-1"
                    text
                    @click="update"
                  >
                    Update
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
                  <button @click="dialogDelete = false" class="btn btn-cancel" :class="{ 'btn-dark': $vuetify.theme.dark }"
                      >{{ translate('Cancel') }}</button
                  >
                  <button
                      color="blue darken-1"
                      text
                      @click="deleteCustomerModalConfirm()"
                      class="btn btn-decline"
                      >{{translate('Confirm')}}</button
                  >
              </v-card-actions>
              </v-card>
          </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.birthday`]="{ item }">
          <p class="mt-4">{{item.birthday | moment("DD[.]MM[.]YYYY")}}</p>
        </template>
        <template v-slot:[`item.created_at`]="{ item }">
          <p class="mt-4">{{item.created_at | moment("DD[.]MM[.]YYYY")}}</p>
        </template>
        <template v-slot:[`item.enabled_value`]="{ item }">
          <v-switch style="margin: 0;" :input-value="item.deleted_at ? false : true" :id="'customer-status-' + item.id" @change="toggleCustomerStatus(item.id)"></v-switch>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
<!--          <v-icon-->
<!--            small-->
<!--            class="mr-2"-->
<!--            color="primary"-->
<!--            @click="editCustomer(item)"-->
<!--          >-->
<!--            mdi-pencil-outline-->
<!--          </v-icon>-->
          <div class="svg-icon" @click.stop="singleApplication(item.id)" color="primary">
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.6661 2.23999C17.5752 1.61487 17.2612 1.04367 16.7819 0.631861C16.3027 0.220198 15.6909 -0.00430876 15.0591 6.26548e-05H4.36237C3.67015 0.00123454 3.00651 0.276791 2.51699 0.766475C2.02748 1.25599 1.75191 1.91959 1.75058 2.61186V5.90598H0.47057C0.210749 5.90598 0 6.11658 0 6.37655C0 6.63637 0.210771 6.84712 0.47057 6.84712H3.76469C4.02468 6.84712 4.23526 6.63635 4.23526 6.37655C4.23526 6.11656 4.02466 5.90598 3.76469 5.90598H2.69176V2.61186C2.6931 2.16923 2.86939 1.74499 3.18243 1.43196C3.49549 1.1189 3.9197 0.942446 4.36233 0.941289H15.059C15.5057 0.936266 15.9359 1.10987 16.2542 1.4236C16.5723 1.73733 16.7519 2.16507 16.7531 2.6119V19.3317C16.7519 19.7785 16.5723 20.2063 16.2542 20.52C15.9359 20.8337 15.5057 21.0073 15.059 21.0023H4.36233C3.9197 21.0012 3.49546 20.8247 3.18243 20.5117C2.86938 20.1986 2.69309 19.7744 2.69176 19.3318V16.0376H3.76469C4.02468 16.0376 4.23526 15.827 4.23526 15.5671C4.23526 15.3072 4.02466 15.0965 3.76469 15.0965H2.69176V14.033C2.69176 13.7731 2.48116 13.5624 2.22119 13.5624C1.96137 13.5624 1.75062 13.7732 1.75062 14.033V15.0965H0.470613C0.210792 15.0965 4.28335e-05 15.3073 4.28335e-05 15.5671C4.28335e-05 15.8271 0.210814 16.0376 0.470613 16.0376H1.75062V19.3318C1.75113 19.8591 1.91084 20.374 2.20881 20.809C2.50697 21.2441 2.92949 21.5788 3.42119 21.7694C3.51444 22.3885 3.82632 22.9537 4.3001 23.3628C4.77406 23.772 5.37873 23.998 6.00483 24H16.7199C17.413 24 18.0778 23.7249 18.5683 23.2353C19.0588 22.7456 19.3351 22.0813 19.3364 21.3882V4.66839C19.3361 4.14224 19.1762 3.62842 18.8779 3.19501C18.5797 2.76143 18.157 2.4286 17.6658 2.24011L17.6661 2.23999ZM18.3956 21.3881C18.3942 21.8316 18.2173 22.2564 17.9032 22.5696C17.5892 22.8828 17.1638 23.0586 16.7203 23.0586H6.00517C5.6608 23.057 5.3255 22.9488 5.04492 22.7491C4.7645 22.5496 4.55257 22.2681 4.43806 21.9433H15.0593C15.7515 21.9422 16.4152 21.6666 16.9047 21.1769C17.3942 20.6874 17.6698 20.0238 17.6711 19.3316V3.29402C18.1076 3.60541 18.367 4.10831 18.3675 4.64454L18.3956 21.3881Z" :fill="$vuetify.theme.dark ? 'white' : 'black'"/>
              <path d="M2.22132 7.43994C1.9615 7.43994 1.75075 7.65054 1.75075 7.91051V8.96938L0.470738 8.96921C0.210917 8.96921 0.000167847 9.17998 0.000167847 9.43978C0.000167847 9.69977 0.210939 9.91035 0.470738 9.91035H3.76486C4.02485 9.91035 4.23543 9.69975 4.23543 9.43978C4.23543 9.17996 4.02482 8.96921 3.76486 8.96921H2.69193V7.91052C2.69193 7.65053 2.48133 7.43995 2.22136 7.43995L2.22132 7.43994Z" :fill="$vuetify.theme.dark ? 'white' : 'black'"/>
              <path d="M0.471046 12.974H3.76517C4.02515 12.974 4.23574 12.7632 4.23574 12.5034C4.23574 12.2434 4.02513 12.0329 3.76517 12.0329H2.69224V10.974C2.69224 10.7142 2.48164 10.5034 2.22167 10.5034C1.96185 10.5034 1.7511 10.7142 1.7511 10.974V12.0329H0.471089C0.211268 12.0329 0.000518799 12.2435 0.000518799 12.5034C0.000518799 12.7632 0.21129 12.974 0.471089 12.974H0.471046Z" :fill="$vuetify.theme.dark ? 'white' : 'black'"/>
              <path d="M12.2829 9.12448C12.2829 8.64148 12.091 8.17828 11.7495 7.83675C11.408 7.49522 10.9448 7.30322 10.4618 7.30322C9.97866 7.30322 9.51542 7.49524 9.17389 7.83675C8.83236 8.17826 8.64053 8.64148 8.64053 9.12448C8.64053 9.60747 8.83239 10.0707 9.17389 10.4122C9.51539 10.7537 9.97862 10.9456 10.4618 10.9456C10.9443 10.9444 11.4068 10.752 11.7482 10.4108C12.0894 10.0695 12.2817 9.60709 12.2829 9.12443L12.2829 9.12448ZM9.577 9.12448C9.577 8.89111 9.66975 8.66728 9.83465 8.50219C9.99971 8.33712 10.2235 8.24438 10.4569 8.24438C10.6905 8.24438 10.9143 8.33713 11.0792 8.50219C11.2443 8.66726 11.337 8.89108 11.337 9.12448C11.337 9.35784 11.2443 9.58167 11.0792 9.74676C10.9143 9.91183 10.6905 10.0044 10.4569 10.0044C10.2236 10.0044 9.99973 9.91182 9.83465 9.74676C9.66975 9.58169 9.577 9.35787 9.577 9.12448Z" :fill="$vuetify.theme.dark ? 'white' : 'black'"/>
              <path d="M6.28288 15.3836C6.28288 15.6434 6.49365 15.8541 6.75345 15.8541C7.01325 15.8541 7.22402 15.6434 7.22402 15.3836C7.26704 14.2571 7.8928 13.234 8.8762 12.6827C9.85955 12.1314 11.0589 12.1314 12.0424 12.6827C13.0258 13.234 13.6516 14.257 13.6946 15.3836C13.6946 15.6434 13.9052 15.8541 14.1652 15.8541C14.425 15.8541 14.6358 15.6434 14.6358 15.3836C14.6358 13.8914 13.8397 12.5126 12.5475 11.7666C11.2552 11.0205 9.66314 11.0205 8.37109 11.7666C7.07886 12.5126 6.28279 13.8914 6.28279 15.3836H6.28288Z" :fill="$vuetify.theme.dark ? 'white' : 'black'"/>
            </svg>
          </div>
        </template>

        <template v-slot:[`item.first_name`]="{ item }">
          <span class="click" @click="$router.push('/applications/' + item.id)">{{item.first_name}}</span>
        </template>

        <template v-slot:[`item.last_name`]="{ item }">
          <span class="click" @click="$router.push('/applications/' + item.id)">{{item.last_name}}</span>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import * as LANGUAGE from '../../store/language.json';
import SnackBar from "../Snackbar/SnackBar.vue";
// import UploadCustomerFiles from "@/assets/services/UploadCustomerFiles.vue";

export default {
  data() {
    return {
      menu_search_birthday: false,
      filters: [{
        text: this.translate('All'),
        value: 'all'
      }, {
        text: this.translate('Active'),
        value: 'Active'
      }, {
        text: this.translate('Disabled'),
        value: "Disabled"
      }],
      defaultFilter: 'All',
      isCreateMode: true,
      activePicker: null,
      date: null,
      search_birthday: null,

      menu: false,
      snackbar: {
        show: false,
        message: null,
        color: null,
      },

      search_string: "",
      dialog: false,
      dialogDelete: false,

      headers: [
        // { text: "#", value: "id" },
        { text: "Date added", value: "created_at" },
        { text: "First Name", value: "first_name" },
        { text: "Last Name", value: "last_name" },
        // { text: "Email", value: "email" },
        { text: "Birthday", value: "birthday" },
        { text: "Zip", value: "zip" },
        { text: "Place", value: "place" },
        { text: "Phone", value: "phone" },
        { text: "Info", value: "info" },
        { text: "Actions", value: "actions",  align: "center"},
      ],
      data: [],

      loading: true,
      options: {},
      totalCustomersTable: 0,

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

      create_costumer_document: {
        customer_id: "",
        category_id: "",
        document: "",
      },
      all_customer_documents: [],

      client_types: [],
      create_customer_note: {
        user_id: "",
        customer_id: "",
        note: "",
      },

      canton_select: [],
      lang_select: [],
      source_id: [],

      deleteCustomerId: 0,
      updateCustomerId: 0,
      defaultItem: {
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

  computed: {
    formTitle() {
      return this.isCreateMode === true ? "New Customer" : "Edit Customer";
    },
    filtered_search_birthday() {
      if (!this.search_birthday) return;

      const [year, month, day] = this.search_birthday .split('-');
      return `${day}.${month}.${year}`;
    },
    filtered_date() {
      if (!this.create_customer_data.birthday) return;

      const [year, month, day] = this.create_customer_data.birthday .split('-');
      return `${day}.${month}.${year}`;
    }
  },
  watch: {
    defaultFilter(val){
      this.getCustomersDatatable(val);
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    options: {
      handler() {
        this.getCustomersDatatable();
      },
      deep: true,
    },
    search_string: {
      handler() {
        this.getCustomersDatatable();
      },
      deep: true,
    },
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    search_birthday() {
      this.getCustomersDatatable();
    }
  },

  methods: {
    itemClicked(event) {
      this.$router.push('applications/'+event.id)
    },
    singleApplication(id) {
      this.$router.push('applications/'+id)
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
    toggleCustomerStatus(id){
      axios.post('/admin/toggle_customer', {customer_id: id}).then(response => {
        let message = "";
        if(response.data.message.toLowerCase() == "customer enabled") {
          message = "Enabled";
        } else {
          message = "Disabled";
        }

        this.snackbar = {
            message,
            color: "success",
            show: true,
            error: false
          };

          this.$refs.snackbar.toggleSnackbar(true);
      }).catch(err => console.log(err));
    },
    getCustomersDatatable(status_filter = 'All') {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      let sortType;
      sortType = "asc";
      if (sortDesc[0]) {
        sortType = "desc";
      }
      axios
        .get("/customer/datatable?term=" + this.search_string, {
          params: {
            sort_by: sortBy[0],
            sort: sortType,
            page: page,
            per_page: itemsPerPage,
            status_filter,
            birthday: this.search_birthday
          },
        })
        .then((response) => {
          console.log('rr', response.data);
          this.data = response.data.data;
          this.totalCustomersTable = response.data.total;
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

    createCustomer() {
      axios
        .post("/customer", this.create_customer_data)
        .then((response) => {
          this.create_customer_data = {};
          this.snackbar = {
            message: response.data.message,
            color: "success",
            show: true,
          };

            // axios.post("application/add", this.create_customer_data)
            //  .then(response => console.log(response.data))
            //  .catch(err => console.log(err));

          this.getCustomersDatatable();
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
          this.create_customer_data.lang = parseInt(response.data.data.lang);
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
          console.log(error);
        });
    },

    deleteCustomer(customer_id) {
      axios
        .delete("/customer/" + customer_id)
        .then((response) => {
          this.snackbar = {
            message: response.data.message,
            color: "success",
            show: true,
          };
        })
        .catch((error) => {
          console.log(error);
        });
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
                text: this.translate(value),
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
                text: this.translate(response.data.data[$i].name),
                value: response.data.data[$i].id,
              });

            }

          })
          .catch((error) => {
            console.log(error);
          });
    },

    createCustomerDocument() {
      axios
        .post("/customer_document", this.create_costumer_document)
        .then(() => {
          this.create_costumer_document = {};
          // alert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getCustomerDocument(document_id) {
      axios
        .get("/customer_document/" + document_id)
        .then((response) => {
          this.create_costumer_document = {};
          this.create_costumer_document.customer_id =
            response.data.data.customer_id;
          this.create_costumer_document.category_id =
            response.data.data.category_id;
          this.create_costumer_document.document = response.data.data.document;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getAllCustomerDocuments() {
      axios
        .get("/customer_document")
        .then((response) => {
          this.all_customer_documents = [];
          this.all_customer_documents.push(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteCustomerDocument(document_id) {
      axios
        .delete("/customer_document/" + document_id)
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    createCustomerNote() {
      axios
        .post("/customernote", this.create_customer_note)
        .then((response) => {
          this.create_customer_note = {};
          alert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateCustomerNote(note_id) {
      axios
        .put("/customernote/" + note_id, this.create_customer_note)
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteCustomerNote(note_id) {
      axios
        .delete("/customernote/" + note_id)
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    saveDate(date) {
      this.$refs.menu.save(date);
    },

    openDialog() {
      this.create_customer_data = this.defaultItem;
      this.isCreateMode = true;
      this.dialog = true;
    },

    editCustomer(item) {
      this.isCreateMode = false;
      this.getCustomer(item.id);
      this.updateCustomerId = item.id;
      this.dialog = true;
    },

    deleteCustomerModal(item) {
      this.deleteCustomerId = item.id;
      this.dialogDelete = true;
    },

    deleteCustomerModalConfirm() {
      this.closeDelete();
      this.deleteCustomer(this.deleteCustomerId);
      this.getCustomersDatatable();
    },

    close() {
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    save() {
      this.close();
      this.createCustomer();
      this.getCustomersDatatable();
    },

    update() {
      this.close();
      this.updateCustomer(this.updateCustomerId);
      this.getCustomersDatatable();
    },

  },

  mounted() {
    this.getCustomersDatatable();
    this.getClientTypes();
    this.getCantonSelect();
    this.getLangSelect();
    this.getSourceSelect();

    if(this.$router.currentRoute.name == 'home') {
      this.headers = [
         // { text: "#", value: "id" },
         { text: this.translate("Date added"), value: "created_at" },
        { text: this.translate("First Name"), value: "first_name" },
        { text: this.translate("Last Name"), value: "last_name" },
        { text: this.translate("Actions"), value: "actions", align: 'center'},
      ]
    } else {
      this.headers = [
         // { text: "#", value: "id" },
         { text: this.translate("Date added"), value: "created_at" },
        { text: this.translate("First Name"), value: "first_name" },
        { text: this.translate("Last Name"), value: "last_name" },
        // { text: "Email", value: "email" },
        { text: this.translate("Birthday"), value: "birthday" },
        { text: this.translate("Zip"), value: "zip" },
        { text: this.translate("Place"), value: "place" },
        { text: this.translate("Phone"), value: "phone" },
        { text: this.translate("Info"), value: "info" },
        { text: this.translate('Status'), value: 'enabled_value' },
        { text: this.translate("Actions"), value: "actions",  align: "center"},
      ]
    }
  },

  components: { SnackBar },
};
</script>

<style scoped>
tbody tr:nth-of-type(odd) {
  background-color: #f7fcfe;
}

.customers-table {
  padding: 36px 34px;
}

.v-data-table {
  border-radius: 10px;
}

header {
  display: none;
}

.v-data-table tr td {
  border: none !important;
}

.customer-search {
  flex-grow: 1;
  margin: 0 24px;
}

.customer-filter {
  display: flex;
  justify-content: end;
}

.customer-filter > * {
  flex-grow: .3;
}

.customers-table tbody tr {
  cursor: pointer !important;
}

</style>