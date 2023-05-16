<template>
  <v-row>
    <SnackBar :data="snackbar" ref="snackbar"></SnackBar>
    <v-col cols xs="12" xm="12" md="3" lg="3">
      <v-text-field
          prepend-inner-icon="mdi-magnify"
          filled
          rounded
          background-color="#fff"
          :label="translate('Search')"
          v-model="search_string"
      >
      </v-text-field>
    </v-col>

    <v-col cols="12" md="12" lg="12">
      <!-- <div class="d-flex justify-end">
        <v-btn color="primary" dark class="mb-2" @click="openDialog">
          <v-icon>mdi-plus</v-icon> Add Contract
        </v-btn>
      </div> -->
      <v-data-table
        :headers="headers"
        :items="data"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalTableData"
        :search="search"
        :footer-props="{'items-per-page-text':translate('Rows per page'), 'items-per-page-all-text':translate('All')}"
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
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="create_data.customer_id"
                          :label="translate('Customer')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          :items="insurance_list"
                          v-model="create_data.insurance_id"
                          :label="translate('Insurance')"
                        >
                          
                        </v-select>
                        <!-- <v-text-field
                          v-model="create_data.insurance_id"
                          :label="translate('Insurance')"
                        ></v-text-field> -->
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
                              v-model="formated_date"
                              :label="translate('Sent On')"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="create_data.sent_on"
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
                        <v-select
                          v-model="create_data.status_id"
                          :label="translate('Status')"
                          :items="contract_statuses"
                        ></v-select>
                      </v-col>
                      <!-- <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="create_data.category_id"
                          :label="translate('Category')"
                          :items="contract_categories"
                        ></v-select>
                      </v-col> -->
                      <v-col cols="12" sm="6" md="6" @click="$router.push('/applications/' + create_data.customer_id)">
                        <v-btn color="primary">{{ translate("Go to customer profile") }}</v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    {{ translate('Cancel') }}
                  </v-btn>

                  <v-btn
                    v-show="isCreateMode"
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    {{translate("Create")}}
                  </v-btn>
                  <v-btn
                    v-show="!isCreateMode"
                    color="blue darken-1"
                    text
                    @click="update"
                  >
                    {{ translate("Update") }}
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

        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex" v-if="isAdmin">
            <v-btn icon @click="editItem(item)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.78486e-06 22.1066C0.00104677 22.6084 0.20068 23.0895 0.555672 23.4443C0.910482 23.7993 1.39158 23.9989 1.89343 24H20.2404C20.7423 23.9993 21.2234 23.7995 21.5784 23.4447C21.9334 23.0897 22.133 22.6086 22.1337 22.1066V9.37598C22.1377 9.2708 22.0986 9.16873 22.0257 9.09313C21.9527 9.01736 21.8522 8.97463 21.7471 8.97463C21.6419 8.97463 21.5414 9.01736 21.4684 9.09313C21.3955 9.16873 21.3564 9.2708 21.3604 9.37598V22.1066C21.3604 22.4036 21.2424 22.6885 21.0324 22.8986C20.8222 23.1086 20.5375 23.2265 20.2404 23.2265H1.89343C1.5964 23.2265 1.31146 23.1086 1.10145 22.8986C0.891434 22.6885 0.773455 22.4036 0.773455 22.1066V3.75956C0.773455 3.46253 0.891439 3.17777 1.10145 2.96759C1.31147 2.75757 1.5964 2.63959 1.89343 2.63959H14.6249C14.8306 2.62887 14.9918 2.45899 14.9918 2.25295C14.9918 2.04691 14.8306 1.87703 14.6249 1.8663H1.89343C1.39157 1.86734 0.910663 2.06715 0.55584 2.42197C0.200857 2.77678 0.00106288 3.25787 0 3.75955L8.78486e-06 22.1066ZM23.7739 3.44778L22.9902 4.23161L19.7686 1.00959L20.5529 0.225587H20.5528C20.6981 0.0811373 20.8946 0 21.0994 0C21.3044 0 21.501 0.0811329 21.6461 0.225587L23.7734 2.3536V2.35377C23.9184 2.49874 23.9997 2.69543 23.9997 2.90044C23.9997 3.10545 23.9184 3.30214 23.7734 3.44712L23.7739 3.44778ZM6.30331 14.7014L9.29473 17.693L5.39681 18.5679L6.30348 14.7011L6.30331 14.7014ZM18.8926 1.88536L19.221 1.55753L22.4432 4.77885L22.1148 5.10702L18.8926 1.88536ZM6.73776 14.0411L18.347 2.43274L19.6846 3.77032L8.0749 15.3783L6.73776 14.0411ZM8.62201 15.9264L20.2304 4.31757L21.568 5.65462L9.95916 17.2626L8.6221 15.9263L8.62201 15.9264Z" fill="black"/>
              </svg>
            </v-btn>
            
            <v-btn icon @click="deleteItemModal(item)">
            <svg
              width="20"
              height="20"
              viewBox="0 0 18 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9143 1.88238H12.2915C12.1722 1.35116 11.8564 0.873905 11.3973 0.531046C10.9383 0.188187 10.364 0.000685718 9.77139 0H8.22867C7.63609 0.000669646 7.06177 0.18817 6.60272 0.531046C6.14368 0.873905 5.8279 1.35121 5.7086 1.88238H3.08572C2.26753 1.88322 1.48319 2.18105 0.904706 2.71039C0.326362 3.23959 0.000889905 3.95728 0 4.70591C0 4.83063 0.054153 4.95033 0.150572 5.03856C0.246991 5.12695 0.377807 5.17651 0.514291 5.17651H1.04196L1.05586 21.6423C1.0555 21.6438 1.0555 21.6455 1.05586 21.647V21.6522V22.1439V22.167C1.08294 22.6615 1.31658 23.1276 1.70868 23.4688C2.10094 23.81 2.62125 24.0001 3.16246 24H14.8366C15.3774 23.9998 15.8976 23.8097 16.2895 23.4685C16.6814 23.1273 16.915 22.6614 16.9421 22.167V22.1439V21.6527C16.9423 21.6509 16.9423 21.6489 16.9421 21.6471C16.9423 21.6454 16.9423 21.6435 16.9421 21.6419L16.958 5.17649H17.4857C17.6222 5.17649 17.753 5.12694 17.8494 5.03854C17.9458 4.95031 18 4.83061 18 4.70589C17.9991 3.95722 17.6736 3.23953 17.0953 2.71037C16.5168 2.18099 15.7324 1.88318 14.9143 1.88236L14.9143 1.88238ZM8.22881 0.941191H9.77168H9.77149C10.0906 0.941191 10.4018 1.03176 10.6623 1.20034C10.9227 1.36893 11.1197 1.60716 11.226 1.88238H6.77429C6.88059 1.60715 7.07764 1.36895 7.33798 1.20034C7.59851 1.03176 7.90972 0.941191 8.22882 0.941191H8.22881ZM3.0861 2.82357H14.9148C15.3707 2.82407 15.8137 2.96303 16.1741 3.21849C16.5345 3.47396 16.7921 3.83157 16.9067 4.23537H1.09449C1.20902 3.83157 1.46663 3.47397 1.82707 3.21849C2.1875 2.96303 2.63042 2.82407 3.08638 2.82357H3.0861ZM15.9167 21.1764H2.08238L2.07049 7.05874H15.9287L15.9167 21.1764ZM14.8366 23.0588H3.16249C2.88696 23.0593 2.62166 22.9633 2.42096 22.7907C2.22026 22.6181 2.09914 22.3819 2.08249 22.1303V22.1176H15.9163V22.1303C15.8997 22.3816 15.7789 22.6176 15.5786 22.7901C15.3782 22.9627 15.1135 23.0588 14.8383 23.0588L14.8366 23.0588ZM15.9274 6.11768H2.07207V5.17648H15.9302L15.9274 6.11768Z"
                fill="black"
              />
              <path
                d="M4.02841 20.2354C4.1649 20.2354 4.29571 20.1858 4.39213 20.0976C4.48855 20.0094 4.5427 19.8897 4.5427 19.7648V8.47057C4.5427 8.21058 4.31254 8 4.02843 8C3.74448 8 3.51416 8.21061 3.51416 8.47057V19.7648C3.51416 19.8897 3.56831 20.0094 3.66492 20.0976C3.76134 20.1858 3.89215 20.2354 4.02846 20.2354H4.02841Z"
                fill="black"
              />
              <path
                d="M6.51449 20.2354C6.6508 20.2354 6.78161 20.1858 6.87803 20.0976C6.97445 20.0094 7.02879 19.8897 7.02879 19.7648V8.47057C7.02879 8.21058 6.79844 8 6.51452 8C6.23038 8 6.00024 8.21061 6.00024 8.47057V19.7648C6.00024 20.0248 6.23041 20.2354 6.51452 20.2354L6.51449 20.2354Z"
                fill="black"
              />
              <path
                d="M9.00009 20.2354C9.13658 20.2354 9.26739 20.1858 9.36381 20.0976C9.46023 20.0094 9.51438 19.8897 9.51438 19.7648V8.47057C9.51438 8.21058 9.28404 8 9.00011 8C8.71619 8 8.48584 8.21061 8.48584 8.47057V19.7648C8.48584 19.8897 8.53999 20.0094 8.63641 20.0976C8.73283 20.1858 8.86365 20.2354 9.00013 20.2354H9.00009Z"
                fill="black"
              />
              <path
                d="M11.4859 20.2354C11.6224 20.2354 11.7532 20.1858 11.8497 20.0976C11.9461 20.0094 12.0002 19.8897 12.0002 19.7648V8.47057C12.0002 8.21058 11.7701 8 11.486 8C11.202 8 10.9717 8.21061 10.9717 8.47057V19.7648C10.9717 19.8897 11.026 20.0094 11.1224 20.0976C11.2189 20.1858 11.3497 20.2354 11.486 20.2354H11.4859Z"
                fill="black"
              />
              <path
                d="M13.972 20.2354C14.1083 20.2354 14.2391 20.1858 14.3355 20.0976C14.4321 20.0094 14.4863 19.8897 14.4863 19.7648V8.47057C14.4863 8.21058 14.256 8 13.972 8C13.6879 8 13.4578 8.21061 13.4578 8.47057V19.7648C13.4578 19.8897 13.5119 20.0094 13.6083 20.0976C13.7048 20.1858 13.8356 20.2354 13.9721 20.2354H13.972Z"
                fill="black"
              />
              </svg>
            </v-btn>
          </div>
        </template>

        

        <template v-slot:[`item.first_name`]="{ item }">
          <span class="click" @click="$router.push('/applications/' + item.customer_id)">{{
            item.first_name
          }}</span>
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <span>{{ translate(item.status) }}</span>
        </template>

        <template v-slot:[`item.last_name`]="{ item }">
          <span class="click" @click="$router.push('/applications/' + item.customer_id)">{{
            item.last_name
          }}</span>
        </template>

        <template v-slot:[`item.updated_at`]="{ item }">
          <p class="mt-4">{{item.updated_at | moment("DD[.]MM[.]YYYY")}}</p>
        </template>

        <template v-slot:[`item.sent_on`]="{ item }">
          <p class="mt-4">{{item.sent_on | moment("DD[.]MM[.]YYYY H:mm")}}</p>
        </template>

        <template v-slot:[`item.status_color`]="{item}">
          <div v-if="item.status == 'Pending'">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="14" r="14" fill="#FF9F43"/>
              <path d="M17.8773 9.85798V9.64973C18.012 9.64973 18.1412 9.59622 18.2364 9.501C18.3317 9.40577 18.3852 9.27653 18.3852 9.14185V7.61823C18.3852 7.48355 18.3317 7.35431 18.2364 7.25909C18.1412 7.16386 18.012 7.11035 17.8773 7.11035H9.75129C9.61661 7.11035 9.48738 7.16386 9.39215 7.25909C9.29693 7.35431 9.24342 7.48355 9.24342 7.61823V9.14185C9.24342 9.27653 9.29693 9.40577 9.39215 9.501C9.48738 9.59622 9.61661 9.64973 9.75129 9.64973V9.85798C9.74812 10.5047 10.0217 11.1221 10.5029 11.5543L11.9655 13.0525H11.9656C12.0619 13.1507 12.1938 13.2056 12.3312 13.2049C12.4621 13.2043 12.5876 13.1534 12.6818 13.0627C12.7779 12.9672 12.832 12.8374 12.832 12.7021C12.832 12.5666 12.7779 12.4368 12.6818 12.3415L11.1937 10.8178H11.1936C10.9201 10.5741 10.7647 10.2244 10.767 9.85797V9.64972H16.8616V9.85797C16.8583 10.238 16.6896 10.5978 16.3994 10.8432L10.5335 16.8617C10.036 17.2953 9.75062 17.9234 9.75144 18.5834C9.75178 18.6552 9.76731 18.7262 9.79712 18.7916H9.75144C9.61676 18.7916 9.48752 18.8451 9.3923 18.9403C9.29707 19.0356 9.24356 19.1648 9.24356 19.2995V20.8231C9.24356 20.9578 9.29707 21.087 9.3923 21.1823C9.48752 21.2775 9.61676 21.331 9.75144 21.331H17.8774C18.0121 21.331 18.1414 21.2775 18.2366 21.1823C18.3318 21.087 18.3853 20.9578 18.3853 20.8231V19.2995C18.3853 19.1648 18.3318 19.0356 18.2366 18.9403C18.1414 18.8451 18.0121 18.7916 17.8774 18.7916H17.8216C17.8584 18.7247 17.8776 18.6496 17.8774 18.5733C17.8806 17.9264 17.6071 17.3091 17.1258 16.8769L14.5255 14.2208L17.0953 11.5798C17.5929 11.1462 17.8783 10.5181 17.8774 9.85813L17.8773 9.85798ZM10.2592 8.1261H17.3694V8.63397H10.2592V8.1261ZM16.4248 17.6234C16.7021 17.8653 16.8613 18.2153 16.8616 18.5832C16.8616 18.7179 16.9151 18.8471 17.0103 18.9424C17.1055 19.0376 17.2348 19.0911 17.3695 19.0911H17.4253C17.3902 19.155 17.371 19.2265 17.3695 19.2994V20.3151H10.2592V19.8072H15.338C15.5195 19.8072 15.6871 19.7104 15.7778 19.5533C15.8685 19.3962 15.8685 19.2025 15.7778 19.0454C15.6871 18.8883 15.5194 18.7915 15.338 18.7915H10.7215C10.7513 18.7261 10.7669 18.6551 10.7672 18.5832C10.7705 18.2032 10.9392 17.8434 11.2294 17.598L13.8144 14.9468L16.4248 17.6234Z" fill="white"/>
            </svg>
          </div>
          <div v-else-if="item.status == 'Approved'">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="14" r="14" fill="#6FBE63"/>
              <path d="M21.6951 9.5279L20.587 8.3999L11.623 17.3639L7.4081 13.149L6.3 14.2769L11.623 19.5999L21.6951 9.5279Z" fill="white"/>
            </svg>
          </div>
          <div v-else>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="14" r="14" fill="#FF4848"/>
              <path d="M21.137 8.81036C21.2665 8.69971 21.3312 8.5639 21.331 8.40306C21.3312 8.24223 21.2665 8.10318 21.137 7.98618C21.0141 7.87607 20.8634 7.82116 20.6846 7.82129C20.5058 7.82102 20.3514 7.87607 20.2213 7.98618L14.2206 13.3964L8.20916 7.98618C8.08628 7.87607 7.93551 7.82102 7.75672 7.82129C7.57793 7.82115 7.42355 7.87607 7.29344 7.98618C7.17116 8.10318 7.11008 8.24223 7.11032 8.40306C7.11008 8.56389 7.17104 8.6997 7.29344 8.81036L13.3049 14.2206L7.29344 19.6212C7.17104 19.7382 7.11008 19.8771 7.11032 20.0381C7.11008 20.1989 7.17116 20.3347 7.29344 20.4454C7.42354 20.5618 7.57792 20.62 7.75672 20.6199C7.93551 20.62 8.08629 20.5618 8.20916 20.4454L14.2206 15.0448L20.2213 20.4454C20.3514 20.5618 20.5058 20.62 20.6846 20.6199C20.8634 20.62 21.0141 20.5618 21.137 20.4454C21.2665 20.3347 21.3312 20.1989 21.331 20.0381C21.3312 19.8771 21.2665 19.7382 21.137 19.6212L15.1363 14.2206L21.137 8.81036Z" fill="white"/>
            </svg>
          </div>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
  
<script>
import Vue from "vue";
import * as LANGUAGE from '../../store/language.json';
import SnackBar from "../Snackbar/SnackBar.vue";

Vue.use(require("vue-moment"));
import axios from "axios";

export default {
  data() {
    return {
      snackbar: {
        show: false,
        message: null,
        color: null,
      },
      isCreateMode: true,
      search: "",
      search_string: "",
      activePicker: null,
      date: null,
      menu: false,

      dialog: false,
      dialogDelete: false,

      isAdmin: false,

      headers: [
        { text: this.translate("First name"), value: "first_name" },
        { text: this.translate("Last name"), value: "last_name" },
        { text: this.translate("Insurance"), value: "insurance" },
        { text: this.translate("Last change"), value: "updated_at" },
        { text: this.translate("Sent on"), value: "sent_on" },
        { text: this.translate("Status"), value: "status" },
        { text: this.translate("Type"), value: "category" },
        { text: "", value: "status_color" },
        { text: "", value: "actions"},
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
      return this.isCreateMode === true ? "Add Contract" : "Edit Contract";
    },
    formated_date() {
        if (!this.create_data.sent_on) return null;

        const [year, month, day] = this.create_data.sent_on.split('-')

        const daySplit = day.split(" ");

        const onlyDay = daySplit[0];
        const hours = daySplit[1];
        const secondsOff = hours.split(":");

        return `${onlyDay}.${month}.${year} ${secondsOff[0]}:${secondsOff[1]}`
    }
  },

  components: {
    SnackBar
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
    search_string: {
      handler() {
        this.getItemsTable();
      },
      deep: true,
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
    getInsurances() {
      axios
          .get("/insurances")
          .then(response => {
            response.data.data.forEach(ins => {
              this.insurance_list.push({
                text: ins.name,
                value: ins.id
              })
            });
          })
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
        .get("/contract/datatable?term=" + this.search_string, {
          params: {
            sort_by: sortBy[0],
            sort: sortType,
            page: page,
            per_page: itemsPerPage,
          },
        })
        .then((response) => {
          console.log("contracts", response.data);
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

          this.$refs.snackbar.toggleSnackbar(true);
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

          this.create_data.customer_id = parseInt(
            response.data.data.customer_id
          );
          this.create_data.insurance_id = parseInt(
            response.data.data.insurance_id
          );
          this.create_data.sent_on = response.data.data.sent_on;
          this.create_data.status_id = parseInt(response.data.data.status_id);
          this.create_data.category_id = parseInt(
            response.data.data.category_id
          );
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
            show: true,
            error: false
          };

          this.$refs.snackbar.toggleSnackbar(true);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteItem(itemId) {
      axios
        .delete("/contract/" + itemId)
        .then(() => {
          this.snackbar = {
            message: "Data deleted successfully",
            color: "success",
            error: false,
          };

          this.$refs.snackbar.toggleSnackbar(true);
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

    getContractStatuses() {
      axios
        .get("/contract/statuses")
        .then((response) => {
          for (let $i = 0; response.data.data.length > 0; $i++) {
            this.contract_statuses.push({
              text: this.translate(response.data.data[$i].name),
              value: response.data.data[$i].id,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getContractCategories() {
      axios
        .get("/contract/categories")
        .then((response) => {
          for (let $i = 0; response.data.data.length > 0; $i++) {
            this.contract_categories.push({
              text: response.data.data[$i].name,
              value: response.data.data[$i].id,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    saveDate(date) {
      this.$refs.menu.save(date);
    },
  },

  mounted() {
    this.getItemsTable();
    this.getContractStatuses();
    this.getContractCategories();

    this.getInsurances();

    if (this.$helperPlugin.ifAdmin()) {
      this.isAdmin = true;
    }
  },
};
</script>
  
<style>
.v-data-table {
  border-radius: 10px;
}
</style>