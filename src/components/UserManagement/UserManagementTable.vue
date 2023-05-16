<template>
  <v-row>
    <SnackBar :data="snackbar" ref="snackbar"></SnackBar>

    <v-col cols="12" xs="12" sm="12" md="4" lg="4">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        filled
        rounded
        :background-color="!$vuetify.theme.dark && '#fff'"
        :label="translate('Search')"
        v-model="search"
      >
      </v-text-field>
    </v-col>

    <v-col cols="12" md="12" lg="12">
      <div class="d-flex justify-end">
        <v-btn color="primary" dark class="mb-2" @click="openDialog">
          <v-icon>mdi-plus</v-icon> {{ translate('Create User') }}
        </v-btn>
      </div>
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
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ translate(formTitle) }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <!-- <v-col cols="12" sm="12" md="12">
                        <v-radio-group v-model="sex" row>
                          <v-radio label="Frau" value="frau"></v-radio>
                          <v-radio label="Herr" value="herr"></v-radio>
                        </v-radio-group>
                      </v-col> -->
                      <v-col cols="12">
                        <v-select v-model="role" :items="role_items" :label="translate('Role')"></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="create_new_agent.first_name"
                          :label="translate('First Name')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="create_new_agent.last_name"
                          :label="translate('Last Name')"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="create_new_agent.email"
                          :label="translate('Email')"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="create_new_agent.phone"
                          type="number"
                          :label="translate('Phone Nr.')"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12" v-if="isCreateMode">
                        <v-text-field
                          v-model="create_new_agent.password"
                          :label="translate('Password')"
                          :type="showPassword ? 'text' : 'password'"
                          @click:append="showPassword = !showPassword"
                          required
                          :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                          prepend-inner-icon="mdi-lock-outline"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12" v-if="isCreateMode">
                        <v-text-field
                          v-model="create_new_agent.password_confirmation"
                          :label="translate('Repeat Password')"
                          :type="showConfirmPassword ? 'text' : 'password'"
                          @click:append="showConfirmPassword = !showConfirmPassword"
                          required
                          :append-icon="showConfirmPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                          prepend-inner-icon="mdi-lock-outline"
                        ></v-text-field>
                      </v-col>


                      <!-- <v-col cols="12" sm="6" md="6">
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
                              :label="translate('Birthday')"
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
                      </v-col> -->

                      <!-- <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="create_data.insurance_id"
                          label="Role"
                        ></v-select>
                      </v-col> -->
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
                    {{ translate('Create') }}
                  </v-btn>
                  <v-btn
                    v-show="!isCreateMode && create_new_agent.email.length > 0"
                    color="blue darken-1"
                    text
                    @click="update"
                  >
                    {{translate('Update')}}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >{{translate('Are you sure you want to delete this item?')}}</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete" :class="{ 'btn-dark': $vuetify.theme.dark }"
                    >{{ translate('Cancel') }}</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteItemModalConfirm()"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex" v-if="user_role_id != item.role_id">
            <v-btn icon @click="editItem(item)">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.6219 6.68218C15.7485 6.65503 15.8563 6.57958 15.9257 6.4698C15.9945 6.36117 16.0168 6.22724 15.9872 6.10208C15.7856 5.25056 15.4499 4.44053 14.9892 3.69502C14.9218 3.58581 14.8112 3.50692 14.6859 3.47861C14.5591 3.45002 14.4295 3.47272 14.3208 3.54313C13.7915 3.8847 13.0835 3.80883 12.6375 3.36265C12.1913 2.91662 12.1155 2.20878 12.457 1.67939C12.5274 1.57061 12.5501 1.441 12.5215 1.31426C12.4932 1.18896 12.4143 1.07831 12.3053 1.01091C11.5595 0.550241 10.7496 0.21442 9.8978 0.0129422C9.77293 -0.0166593 9.63886 0.00575736 9.53022 0.0744449C9.42044 0.143849 9.345 0.251622 9.31785 0.378218C9.18579 0.994534 8.63156 1.44171 8.00002 1.44171C7.36847 1.44171 6.81425 0.994533 6.68219 0.378071C6.65503 0.251475 6.57959 0.143702 6.46981 0.0742978C6.36117 0.0054672 6.22725 -0.0168067 6.10223 0.0127951C5.25041 0.214402 4.44053 0.550057 3.69502 1.01077C3.58581 1.07816 3.50692 1.1888 3.47861 1.31411C3.45002 1.44085 3.47272 1.57047 3.54313 1.67924C3.8847 2.20848 3.80883 2.91647 3.36265 3.3625C2.91662 3.80868 2.20878 3.88454 1.67939 3.54298C1.57061 3.47257 1.441 3.44987 1.31426 3.47847C1.18896 3.50677 1.07831 3.58566 1.01091 3.69473C0.550242 4.44049 0.214421 5.25038 0.0129427 6.1022C-0.0166588 6.22707 0.00575759 6.36114 0.0744451 6.46977C0.14385 6.57956 0.251622 6.655 0.378218 6.68215C0.994534 6.81421 1.44171 7.36844 1.44171 7.99998C1.44171 8.63153 0.994534 9.18575 0.378071 9.31781C0.251475 9.34497 0.143703 9.42041 0.074298 9.53019C0.00546743 9.63882 -0.0168068 9.77275 0.012795 9.89791C0.214402 10.7494 0.550058 11.5595 1.01077 12.305C1.07816 12.4142 1.18881 12.4931 1.31411 12.5214C1.44085 12.55 1.57047 12.5273 1.67924 12.4569C2.20848 12.1153 2.91647 12.1912 3.3625 12.6373C3.80868 13.0834 3.88454 13.7912 3.54298 14.3206C3.47272 14.4294 3.44987 14.559 3.47847 14.6857C3.50677 14.811 3.58566 14.9217 3.69473 14.9891C4.44049 15.4498 5.25038 15.7856 6.1022 15.9871C6.13827 15.9957 6.17505 15.9997 6.21184 15.9997C6.30237 15.9997 6.39247 15.9744 6.46977 15.9254C6.57956 15.856 6.655 15.7482 6.68216 15.6216C6.81421 15.0055 7.36844 14.5583 7.99998 14.5583C8.63153 14.5583 9.18575 15.0055 9.31781 15.6219C9.34497 15.7485 9.42041 15.8563 9.53019 15.9257C9.63883 15.9945 9.77275 16.0168 9.89777 15.9872C10.7496 15.7856 11.5595 15.4499 12.3052 14.9892C12.4143 14.9218 12.4932 14.8112 12.5215 14.6859C12.5501 14.5592 12.5271 14.4295 12.457 14.3208C12.1154 13.7915 12.1913 13.0835 12.6375 12.6375C13.0835 12.1913 13.7913 12.1155 14.3207 12.457C14.4295 12.5273 14.5591 12.5501 14.6859 12.5215C14.8112 12.4932 14.9218 12.4143 14.9892 12.3053C15.4499 11.5595 15.7857 10.7496 15.9872 9.89806V9.89791C16.0168 9.77304 15.9944 9.63897 15.9257 9.53034C15.8563 9.42056 15.7485 9.34511 15.6219 9.31796C15.0054 9.18576 14.5583 8.63153 14.5583 7.99998C14.5583 7.36844 15.0054 6.81422 15.6219 6.68216L15.6219 6.68218ZM4.99734 8.00001C4.99734 6.34176 6.34162 4.99749 7.99987 4.99749C9.65812 4.99749 11.0024 6.34176 11.0024 8.00001C11.0024 9.65826 9.65812 11.0025 7.99987 11.0025C6.34162 11.0025 4.99734 9.65826 4.99734 8.00001Z" fill="#36A5DD"/>
              </svg>
            </v-btn>
            <v-btn icon @click="deleteItemModal(item)">
              <svg width="16" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.6564 2.34278C12.1561 0.842612 10.1212 0 7.99967 0C5.87804 0 3.84335 0.842939 2.34294 2.34327C0.842775 3.84359 0 5.87833 0 8C0 10.1217 0.842775 12.1563 2.34294 13.6567C3.84327 15.1571 5.878 16 7.99967 16C10.1213 16 12.1564 15.1573 13.6564 13.6572C14.6543 12.6669 15.3728 11.4302 15.7384 10.0727C16.1041 8.7151 16.1041 7.28494 15.7384 5.92743C15.3728 4.56996 14.6543 3.33318 13.6564 2.34294V2.34278ZM10.6736 9.86278L10.6735 9.86294C10.7781 9.97215 10.8364 10.1174 10.8364 10.2685C10.8364 10.4199 10.7781 10.5651 10.6735 10.6743C10.5606 10.7764 10.4142 10.8333 10.2621 10.8344C10.1134 10.8331 9.97051 10.776 9.86209 10.6743L7.9992 8.81142L6.1363 10.6743C6.02788 10.776 5.88502 10.8331 5.73627 10.8344C5.58416 10.8333 5.4378 10.7764 5.32492 10.6743C5.22033 10.5651 5.16197 10.4199 5.16197 10.2685C5.16197 10.1174 5.22033 9.97215 5.32492 9.86294L7.18782 8.00004L5.32492 6.13714C5.10091 5.91313 5.10091 5.54975 5.32492 5.32575C5.54893 5.10175 5.91231 5.10174 6.13631 5.32575L7.9992 7.18865L9.8621 5.32575C10.0861 5.10174 10.4495 5.10174 10.6735 5.32575C10.8975 5.54976 10.8975 5.91314 10.6735 6.13714L8.81059 8.00004L10.6736 9.86278Z" fill="#D20000"/>
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
            role_items: [
              { text: 'Admin', value: 1 },
              { text: 'Agent', value: 0 },
            ],
            role: 0,
            showPassword: false,
            showConfirmPassword: false,
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
                { text: this.translate("First name"), value: "first_name" },
                { text: this.translate("Last name"), value: "last_name" },
                { text: this.translate("Phone"), value: "phone" },
                { text: this.translate("Actions"), value: "actions" },
            ],
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
            create_new_agent: {
                email: "",
                first_name: "",
                last_name: "",
                password: "",
                password_confirmation: "",
                approved: 1,
                phone: ""
            },
            new_agent_data: {},
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
            return this.isCreateMode === true ? "Create User" : "Edit User";
        },
        user_role_id() {
          const user = JSON.parse(localStorage.getItem('user'));

          return user.role_id;
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
        getItemsTable() {
            this.loading = true;
            const { sortBy, sortDesc, page, itemsPerPage } = this.options;
            let sortType;
            sortType = "asc";
            if (sortDesc[0]) {
                sortType = "desc";
            }
            axios
                .get("/admin/userdatatable", {
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
                .post("/register", {
                email: this.create_new_agent.email,
                first_name: this.create_new_agent.first_name,
                last_name: this.create_new_agent.last_name,
                password: this.create_new_agent.password,
                password_confirmation: this.create_new_agent.password_confirmation,
                approved: 1,
                phone: this.create_new_agent.phone,
                role_id: this.role
            })
                .then((response) => {
                this.snackbar = {
                    message: "New agent created successfully",
                    color: "success",
                    show: true,
                    error: false
                };

                this.$refs.snackbar.toggleSnackbar();

                this.approveUser(response.data.user_id);
            })
              .catch((error) => {
                console.log("test", error);
                this.snackbar = {
                    message: error.response.data.message,
                    color: "error",
                    error: true,
                };

                this.$refs.snackbar.toggleSnackbar();
            });
        },
        approveUser(userId) {
            axios
                .put("/approve_agent", {
                user_id: userId
            })
                .then(() => {
                this.getItemsTable();
            })
                .catch(err => console.log(err));
        },
        getItem(itemId) {
            this.create_new_agent = {};
            axios
                .get("admin/user/" + itemId)
                .then((response) => {
                const { email, first_name, last_name, phone, role_id } = response.data.data;
                this.create_new_agent = {
                    email,
                    first_name,
                    last_name,
                    password: "",
                    password_confirmation: "",
                    phone
                };

                this.role = parseInt(role_id);
            })
                .catch((error) => {
                console.log(error);
            });
        },
        updateItem(itemId) {
            axios
                .put("admin/user/" + itemId, {
                first_name: this.create_new_agent.first_name,
                last_name: this.create_new_agent.last_name,
                phone: this.create_new_agent.phone,
                email: this.create_new_agent.email,
                role_id: this.role
            })
                .then((response) => {
                this.snackbar = {
                    message: response.data.message,
                    color: "success",
                    error: false,
                };
                this.$refs.snackbar.toggleSnackbar();
                this.getItemsTable();
            })
                .catch((error) => {
                console.log(error);
            });
        },
        deleteItem(itemId) {
            axios
                .delete("/admin/user/" + itemId)
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
        },
        update() {
            this.close();
            this.updateItem(this.updateItemId);
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
</style>