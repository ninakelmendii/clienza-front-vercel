<template>
    <v-row>
      <SnackBar :data="snackbar" ref="snackbar"></SnackBar>
  
      <v-col cols="12" md="12" lg="12">
        <v-data-table
          :headers="headers"
          :items="data"
          :loading="loading"
          :options.sync="options"
          :server-items-length="totalTableData"
          :search="search"
          :footer-props="{'items-per-page-text':translate('Rows per page'), 'items-per-page-all-text':translate('All')}"
        >
        <template v-slot:loading>
          {{translate('Loading items')}}...
        </template>
        <template v-slot:no-data>
          {{translate('No data available')}}
        </template>
          <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <!-- <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
  
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-radio-group v-model="sex" row>
                            <v-radio label="Frau" value="frau"></v-radio>
                            <v-radio label="Herr" value="herr"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="create_data.customer_id"
                            label="First Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="create_data.insurance_id"
                            label="Last Names"
                          ></v-text-field>
                        </v-col>
  
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="create_data.insurance_id"
                            label="Email Address"
                          ></v-text-field>
                        </v-col>
  
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="create_data.insurance_id"
                            label="Phone Nr."
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
                                v-model="date"
                                label="Birthday"
                                prepend-inner-icon="mdi-calendar-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="date"
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
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
  
                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            v-model="create_data.insurance_id"
                            label="Role"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
  
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
  
                    <v-btn
                      v-show="isCreateMode"
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      Create
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
              </v-dialog> -->
              <template>
                  <v-dialog v-model="dialog_select_role" max-width="550px">
                      <v-card>
                        <v-row no-gutters no-wrap style="padding: 24px;">
                            <v-select :label="translate('Role')" :items="translated_roles" v-model="role"></v-select>
                        </v-row>
                        <v-card-actions class="justify-end">
                            <button @click="cancelProcess()" class="btn btn-cancel"
                                >{{ translate('Cancel') }}</button
                            >
                            <button
                                color="blue darken-1"
                                text
                                @click="approveUser()"
                                class="btn btn-ok"
                                >{{ translate('Confirm') }}</button
                            >
                        </v-card-actions>
                      </v-card>
                  </v-dialog>
              </template>
              <template>
                  <v-dialog v-model="dialog" max-width="550px">
                      <v-card>
                        <v-row no-gutters no-wrap style="padding: 24px;">
                          <img src="@/assets/gifs/add_user.gif" style="width: 56px; height: 56px;" />  
                          <!-- <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y ="4" width="48" height="48" rx="24" fill="#D1FADF"/>
                                <path d="M23.5 28L26.5 31L32.5 25M38 28C38 33.5228 33.5228 38 28 38C22.4772 38 18 33.5228 18 28C18 22.4772 22.4772 18 28 18C33.5228 18 38 22.4772 38 28Z" stroke="#039855" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <rect x="4" y="4" width="48" height="48" rx="24" stroke="#ECFDF3" stroke-width="8"/>
                            </svg> -->
                            <div style="margin-left: 16px;">
                                <v-card-title class="text-h5 p-0">{{ translate('Activate user') }}</v-card-title>
                                <v-card-text class="p-0" style="margin-top: 4px;">{{ translate("Do you want to activate this user's account?") }}</v-card-text>
                            </div>
                        </v-row>
                        <v-card-actions class="justify-end">
                            <button @click="dialog = !dialog" class="btn btn-cancel" :class="{ 'btn-dark': $vuetify.theme.dark }"
                                >{{ translate('Cancel') }}</button
                            >
                            <button
                                color="blue darken-1"
                                text
                                @click="selectRole()"
                                class="btn btn-ok"
                                >
                                <!-- @click="approveUser()" -->
                                {{ translate('Confirm') }}</button
                            >
                        </v-card-actions>
                      </v-card>
                  </v-dialog>
              </template>
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
                      <button @click="dialogDelete = !dialogDelete" class="btn btn-cancel" :class="{ 'btn-dark': $vuetify.theme.dark }"
                          >{{ translate('Cancel') }}</button
                      >
                      <button
                          color="blue darken-1"
                          text
                          @click="declineUser()"
                          class="btn btn-decline"
                          >{{translate('Confirm')}}</button
                      >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <template v-slot:[`item.created_at`]="{item}">
            {{ item.created_at | moment("DD.MM.YYYY HH:mm") }}
          </template>
  
          <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex">
                <v-btn icon @click="editItem(item)">
                    <svg width="20" height="20" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.2854 3.54275L11.1711 14.5999L6.77125 9.79979C6.34276 9.3426 5.62849 9.3141 5.14257 9.71409C4.68538 10.1426 4.65688 10.8568 5.05687 11.3428L10.2283 16.9999C10.4569 17.257 10.7712 17.3714 11.0855 17.3714C11.3713 17.3714 11.6284 17.2857 11.857 17.0856L24.8284 5.22846C25.2856 4.79997 25.3141 4.08571 24.9141 3.59979C24.4856 3.1426 23.7713 3.1141 23.2856 3.54259L23.2854 3.54275Z" fill="#1DD200"/>
                        <path d="M11.9999 24C18.6285 24 23.9999 18.6286 23.9999 12C23.9999 11.4286 23.9714 10.8857 23.8857 10.3428C23.8 9.71428 23.2286 9.28576 22.6001 9.37147C21.9715 9.45717 21.543 10.0286 21.6287 10.6571C21.6859 11.1143 21.7144 11.5715 21.7144 12C21.7144 17.3428 17.343 21.7143 12.0001 21.7143C6.65724 21.7143 2.28581 17.3428 2.28581 12C2.28581 6.65713 6.65724 2.2857 12.0001 2.2857C14.2859 2.2857 16.5144 3.0857 18.2572 4.57147C18.7429 4.97146 19.4572 4.91427 19.8572 4.42857C20.2572 3.94288 20.2 3.22857 19.7143 2.82862C17.5716 0.999847 14.8287 0 12 0C5.37143 0 0 5.37143 0 12C0 18.6286 5.37143 24 12 24L11.9999 24Z" fill="#1DD200"/>
                    </svg>
                </v-btn>

                <v-btn icon @click="deleteItemModal(item)">
                    <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.4846 3.51416C18.2341 1.26392 15.1818 0 11.9995 0C8.81706 0 5.76502 1.26441 3.51441 3.5149C1.26416 5.76539 0 8.81749 0 12C0 15.1825 1.26416 18.2345 3.51441 20.4851C5.7649 22.7356 8.817 24 11.9995 24C15.182 24 18.2346 22.736 20.4846 20.4858C21.9815 19.0004 23.0592 17.1453 23.6076 15.1091C24.1562 13.0727 24.1562 10.9274 23.6076 8.89114C23.0592 6.85494 21.9815 4.99978 20.4846 3.51441V3.51416ZM16.0104 14.7942L16.0102 14.7944C16.1671 14.9582 16.2546 15.1761 16.2546 15.4028C16.2546 15.6298 16.1671 15.8477 16.0102 16.0115C15.8409 16.1645 15.6213 16.2499 15.3932 16.2516C15.1701 16.2497 14.9558 16.1641 14.7931 16.0115L11.9988 13.2171L9.20445 16.0115C9.04182 16.1641 8.82754 16.2497 8.6044 16.2516C8.37624 16.2499 8.15669 16.1645 7.98738 16.0115C7.83049 15.8477 7.74296 15.6298 7.74296 15.4028C7.74296 15.1761 7.83049 14.9582 7.98738 14.7944L10.7817 12.0001L7.98738 9.20571C7.65136 8.86969 7.65136 8.32463 7.98738 7.98863C8.3234 7.65263 8.86846 7.65261 9.20446 7.98863L11.9988 10.783L14.7932 7.98863C15.1292 7.65261 15.6742 7.65261 16.0102 7.98863C16.3462 8.32465 16.3463 8.86971 16.0102 9.20571L13.2159 12.0001L16.0104 14.7942Z" fill="#D20000"/>
                    </svg>
                </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </template>
  
  <script>
  import axios from "axios";
  import * as LANGUAGE from '../../store/language.json';
import SnackBar from "../Snackbar/SnackBar.vue";
  
  export default {
    name: "UserManagementTable",
    data() {
        return {
            dialog_select_role: false,
            snackbar: {
                show: false,
                message: null,
                color: null,
            },
            sex: "frau",
            isCreateMode: true,
            search: "",
            activePicker: null,
            date: null,
            menu: false,
            dialog: false,
            dialogDelete: false,
            headers: [
                { text: "#", value: "id" },
                { text: this.translate("Name"), value: "first_name" },
                { text: this.translate("Last Name"), value: "last_name" },
                { text: this.translate("Date Applied"), value: "created_at" },
                { text: this.translate("Actions"), value: "actions" },
            ],
            role_items: [
              { text: 'Agent', value: 0 },
              { text: 'Admin', value: 1 },
            ],
            role: 0,
            data: [],
            loading: true,
            options: {},
            totalTableData: 0,
            create_data: {
                customer_id: "",
                insurance_id: "",
                sent_on: "",
                status_id: "",
                category_id: "",
            },
            get_item_data: [],
            contract_statuses: [],
            contract_categories: [],
            clients_list: [],
            insurance_list: [],
            deleteItemId: 0,
            updateItemId: 0,
            default_item_data: {
                customer_id: "",
                insurance_id: "",
                sent_on: "",
                status_id: "",
                category_id: "",
            },
        };
    },
    computed: {
        formTitle() {
            return this.isCreateMode === true ? "Create User" : "Pending User Profile";
        },
        translated_roles() {
          let translated = [];

          this.role_items.forEach(r => {
            translated.push({
              text: this.translate(r.text),
              value: r.value
            })
          })

          return translated;
        }
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
        options: {
            handler() {
                this.getItemsTable();
            },
            deep: true,
        },
        menu(val) {
            val && setTimeout(() => (this.activePicker = "YEAR"));
        },
    },
    methods: {
        cancelProcess() {
          this.dialog = false;
          this.dialog_select_role = false;
        },
        selectRole(){
          this.dialog = false;
          this.dialog_select_role = true;
        },
        translate(word) {
            let wordIndex = null;
            LANGUAGE.forEach((lng, index) => {
                if (lng.english.toLowerCase() == word.toLowerCase()) {
                    wordIndex = index;
                }
            });
            if (wordIndex === null) {
                return word;
            }
            if (this.$store.state.language == "german") {
                return LANGUAGE[wordIndex].german;
            }
            else {
                return LANGUAGE[wordIndex].english;
            }
        },
        approveUser() {
            axios
                .put("/approve_agent", {
                user_id: this.updateItemId,
                role_id: this.role
            })
                .then(() => {
                this.getItemsTable();
            })
                .catch(err => console.log(err));

            this.dialog_select_role = false;
        },
        declineUser() {
            axios
                .post("/decline_agent", {
                user_id: this.deleteItemId
            })
                .then(() => {
                this.getItemsTable();
            })
                .catch(err => console.log(err));
            this.dialogDelete = !this.dialogDelete;
        },
        getItemsTable() {
            this.loading = true;
            const { sortBy, sortDesc, page, itemsPerPage } = this.options;
            let sortType;
            sortType = "asc";
            if (sortDesc[0]) {
                sortType = "desc";
            }
            axios
                .get("/admin/userdatatable?waiting_list", {
                params: {
                    sort_by: sortBy[0],
                    sort: sortType,
                    page: page,
                    per_page: itemsPerPage,
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
        createItem() {
            axios
                .post("/contract", this.create_data)
                .then((response) => {
                this.create_data = {};
                this.snackbar = {
                    message: response.data.message,
                    color: "success",
                    error: false,
                };
                this.$refs.snackbar.toggleSnackbar();
            })
                .catch((error) => {
                console.log(error);
            });
        },
        getItem(itemId) {
            axios
                .get("/contract/" + itemId)
                .then((response) => {
                this.create_data = {};
                this.get_item_data.push(response.data.data);
                this.create_data.customer_id = parseInt(response.data.data.customer_id);
                this.create_data.insurance_id = parseInt(response.data.data.insurance_id);
                this.create_data.sent_on = response.data.data.sent_on;
                this.create_data.status_id = parseInt(response.data.data.status_id);
                this.create_data.category_id = parseInt(response.data.data.category_id);
            })
                .catch((error) => {
                console.log(error);
            });
        },
        updateItem(itemId) {
            axios
                .put("/contract/" + itemId, this.create_data)
                .then((response) => {
                this.snackbar = {
                    message: response.data.message,
                    color: "success",
                    error: false,
                };
                this.$refs.snackbar.toggleSnackbar();
            })
                .catch((error) => {
                console.log(error);
            });
        },
        deleteItem(itemId) {
            axios
                .delete("/contract/" + itemId)
                .then((response) => {
                this.snackbar = {
                    message: response.data.message,
                    color: "success",
                    error: false,
                };
                this.$refs.snackbar.toggleSnackbar();
            })
                .catch((error) => {
                console.log(error);
            });
        },
        openDialog() {
            this.create_data = this.default_item_data;
            this.isCreateMode = true;
            this.dialog = true;
        },
        editItem(item) {
            this.isCreateMode = false;
            this.getItem(item.id);
            this.updateItemId = item.id;
            this.dialog = true;
        },
        deleteItemModal(item) {
            this.deleteItemId = item.id;
            this.dialogDelete = true;
        },
        deleteItemModalConfirm() {
            this.closeDelete();
            this.deleteItem(this.deleteItemId);
            this.getItemsTable();
        },
        close() {
            this.dialog = false;
        },
        closeDelete() {
            this.dialogDelete = false;
        },
        save() {
            this.close();
            this.createItem();
            this.getItemsTable();
        },
        update() {
            this.close();
            this.updateItem(this.updateItemId);
            this.getItemsTable();
        },
        saveDate(date) {
            this.$refs.menu.save(date);
        },
    },
    mounted() {
        this.getItemsTable();
    },
    components: { SnackBar }
};
  </script>
  
  <style>
  .v-data-table {
    border-radius: 10px;
  }
  
  .v-data-table tr td {
    border: none !important;
  }
  .p-0 {
    padding: 0 !important;
  }

  .btn {
      padding: 10px 18px !important;
      min-width: 84px !important;
      min-height: 44px !important;
      border-radius: 8px;
  }

  .btn-cancel {
      border: 1px solid #D0D5DD;
      background: white;
  }

  .btn-ok {
      background: #36A5DD;
      color: white;
      margin-left: 12px;
  }

  .btn-decline {
    background-color: #D92D20;
    color: white;
    margin-left: 12px;
  }
  </style>