<template>
  <v-row>
    <SnackBar :data="snackbar" ref="snackbar"></SnackBar>
    <v-col>
      <v-text-field
        v-model="search_string"
        rounded
        filled
        background-color="white"
        :label="translate('Search')"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
    </v-col>

    <v-col>
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
            v-model="formated_date"
            :label="translate('Select Date')"
            prepend-inner-icon="mdi-calendar"
            readonly
            background-color="#fff"
            rounded
            filled
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="calendar_date"
          no-title
          scrollable
          range
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
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

    <v-col>
      <v-select
        v-model="status"
        :items="task_type_select"
        rounded
        filled
        background-color="white"
        :label="translate('Status')"
        prepend-inner-icon="mdi-filter-multiple-outline"
      ></v-select>
    </v-col>

    <v-col cols="12" md="12" lg="12" class="d-flex justify-between">
      <v-row class="d-flex justify-start">
        <v-col cols="6" md="6" lg="6"
        ><v-switch
            v-model="showCompleted"
            inset
            :label="translate('Show completed task')"
        ></v-switch
        ></v-col>
      </v-row>
    </v-col>

    <v-col cols="12" md="12" lg="12" sm="12">
      <div class="d-flex justify-end">
        <v-btn color="primary" dark class="mb-2" @click="openDialog">
          <v-icon>mdi-plus</v-icon> {{ translate('New Task') }}
        </v-btn>
      </div>
      <v-data-table
        :headers="headers"
        :items="tasks"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalTaskTable"
        :footer-props="{'items-per-page-text':translate('Rows per page'), 'items-per-page-all-text':translate('All')}"
        :search="search"
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
                      <v-col cols="12">
                        <v-col cols="12" class="p-0" no-gutters>
                          <label>
                            <input type="radio" v-model="client_type" value="actual">
                            {{ translate('Actual client') }}
                          </label>
                        </v-col>
                        <v-col cols="12" class="p-0 mt-2" no-gutters>
                          <label>
                            <input type="radio" v-model="client_type" value="new">
                            {{ translate('New client') }} <br><small>({{ translate('Customer should be added manually. Click here to add new.') }})</small>
                          </label>
                        </v-col>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                            v-if="client_type == 'actual'"
                            :items="customer_list_select"
                            v-model="create_task_data.customer_id"
                            :label="translate('Customer')"
                        ></v-select>
                        <v-text-field :label="translate('Customer')" v-else v-model="create_task_data.new_client">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          :items="task_type_select"
                          v-model="create_task_data.type"
                          :label="translate('Type')"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-col>
                          <v-row>
                            <div style="width: 50%;">
                              <!-- <v-menu
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
                                  :first-day-of-week="1"
                                  no-title
                                  scrollable
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="menu = false"
                                  >
                                    {{ translate('Cancel') }}
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menu.save(lead_calendar)"
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu> -->
                                <v-menu
                                    v-model="datepickermenu"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                    >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                        v-model="create_task_data.date"
                                        :label="translate('Date')"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="create_task_data.date"
                                        no-title
                                        scrollable
                                        @input="datepickermenu = false"
                                    ></v-date-picker>
                                </v-menu>
                            </div>
                            <div
                              style="width: 50%;  padding: 0 10px;"
                            >
                              <v-form style="display: flex; gap: 10px;" ref="formSchedule">
                                <v-text-field
                                  v-model="hour"
                                  :label="translate('Hour')"
                                  type="number"
                                  :rules="hourRules"
                                  style="width: 50%"
                                />
                                <v-text-field
                                  v-model="minute"
                                  :label="translate('Minutes')"
                                  type="number"
                                  :rules="minuteRules"
                                  style="width: 50%"
                                />
                              </v-form>
                            </div>
                          </v-row>
                        </v-col>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-select
                            :items="canton_select"
                            v-model="create_task_data.place_id"
                            :label="translate('Place')"
                        ></v-select>
<!--                        <v-text-field-->
<!--                          v-model="create_task_data.place_id"-->
<!--                          label="Place ID"-->
<!--                        ></v-text-field>-->
                      </v-col>

                      <template v-if="isAdmin">
                        <v-col cols="12" sm="12" md="12">
                          <v-select
                              :items="get_agents_list"
                              v-model="create_task_data.agent_id"
                              :label="translate('Agents List')"
                          ></v-select>
                        </v-col>
                      </template>

                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="create_task_data.name"
                          :label="translate('Task Name')"
                          counter="50"
                          maxlength="50"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-textarea
                          v-model="create_task_data.note"
                          :label="translate('Note')"
                        ></v-textarea>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <UploadTaskFiles />
                      </v-col>

<!--                      <v-col cols="12" sm="6" md="6">-->
<!--                        <v-text-field-->
<!--                          v-model="create_task_data.created_by"-->
<!--                          label="Created By"-->
<!--                        ></v-text-field>-->
<!--                      </v-col>-->
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
                    {{ translate('Create') }}
                  </v-btn>
                  <v-btn
                    v-show="!isCreateMode"
                    color="blue darken-1"
                    text
                    @click="update"
                  >
                    {{  translate('Update')  }}
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
                      @click="deleteTaskModalConfirm()"
                      class="btn btn-decline"
                      >{{translate('Confirm')}}</button
                  >
              </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.date`]="{ item }">
          <p class="mt-4">{{item.date | moment("DD[.]MM[.]YYYY h:mm a")}}</p>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex">
            <v-btn icon @click="editTask(item)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.78486e-06 22.1066C0.00104677 22.6084 0.20068 23.0895 0.555672 23.4443C0.910482 23.7993 1.39158 23.9989 1.89343 24H20.2404C20.7423 23.9993 21.2234 23.7995 21.5784 23.4447C21.9334 23.0897 22.133 22.6086 22.1337 22.1066V9.37598C22.1377 9.2708 22.0986 9.16873 22.0257 9.09313C21.9527 9.01736 21.8522 8.97463 21.7471 8.97463C21.6419 8.97463 21.5414 9.01736 21.4684 9.09313C21.3955 9.16873 21.3564 9.2708 21.3604 9.37598V22.1066C21.3604 22.4036 21.2424 22.6885 21.0324 22.8986C20.8222 23.1086 20.5375 23.2265 20.2404 23.2265H1.89343C1.5964 23.2265 1.31146 23.1086 1.10145 22.8986C0.891434 22.6885 0.773455 22.4036 0.773455 22.1066V3.75956C0.773455 3.46253 0.891439 3.17777 1.10145 2.96759C1.31147 2.75757 1.5964 2.63959 1.89343 2.63959H14.6249C14.8306 2.62887 14.9918 2.45899 14.9918 2.25295C14.9918 2.04691 14.8306 1.87703 14.6249 1.8663H1.89343C1.39157 1.86734 0.910663 2.06715 0.55584 2.42197C0.200857 2.77678 0.00106288 3.25787 0 3.75955L8.78486e-06 22.1066ZM23.7739 3.44778L22.9902 4.23161L19.7686 1.00959L20.5529 0.225587H20.5528C20.6981 0.0811373 20.8946 0 21.0994 0C21.3044 0 21.501 0.0811329 21.6461 0.225587L23.7734 2.3536V2.35377C23.9184 2.49874 23.9997 2.69543 23.9997 2.90044C23.9997 3.10545 23.9184 3.30214 23.7734 3.44712L23.7739 3.44778ZM6.30331 14.7014L9.29473 17.693L5.39681 18.5679L6.30348 14.7011L6.30331 14.7014ZM18.8926 1.88536L19.221 1.55753L22.4432 4.77885L22.1148 5.10702L18.8926 1.88536ZM6.73776 14.0411L18.347 2.43274L19.6846 3.77032L8.0749 15.3783L6.73776 14.0411ZM8.62201 15.9264L20.2304 4.31757L21.568 5.65462L9.95916 17.2626L8.6221 15.9263L8.62201 15.9264Z" fill="black"/>
                </svg>
              </v-btn>

              <v-btn icon @click="deleteTaskModal(item)">
                <svg width="18" height="18" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.9143 1.88238H12.2915C12.1722 1.35116 11.8564 0.873905 11.3973 0.531046C10.9383 0.188187 10.364 0.000685718 9.77139 0H8.22867C7.63609 0.000669646 7.06177 0.18817 6.60272 0.531046C6.14368 0.873905 5.8279 1.35121 5.7086 1.88238H3.08572C2.26753 1.88322 1.48319 2.18105 0.904706 2.71039C0.326362 3.23959 0.000889905 3.95728 0 4.70591C0 4.83063 0.054153 4.95033 0.150572 5.03856C0.246991 5.12695 0.377807 5.17651 0.514291 5.17651H1.04196L1.05586 21.6423C1.0555 21.6438 1.0555 21.6455 1.05586 21.647V21.6522V22.1439V22.167C1.08294 22.6615 1.31658 23.1276 1.70868 23.4688C2.10094 23.81 2.62125 24.0001 3.16246 24H14.8366C15.3774 23.9998 15.8976 23.8097 16.2895 23.4685C16.6814 23.1273 16.915 22.6614 16.9421 22.167V22.1439V21.6527C16.9423 21.6509 16.9423 21.6489 16.9421 21.6471C16.9423 21.6454 16.9423 21.6435 16.9421 21.6419L16.958 5.17649H17.4857C17.6222 5.17649 17.753 5.12694 17.8494 5.03854C17.9458 4.95031 18 4.83061 18 4.70589C17.9991 3.95722 17.6736 3.23953 17.0953 2.71037C16.5168 2.18099 15.7324 1.88318 14.9143 1.88236L14.9143 1.88238ZM8.22881 0.941191H9.77168H9.77149C10.0906 0.941191 10.4018 1.03176 10.6623 1.20034C10.9227 1.36893 11.1197 1.60716 11.226 1.88238H6.77429C6.88059 1.60715 7.07764 1.36895 7.33798 1.20034C7.59851 1.03176 7.90972 0.941191 8.22882 0.941191H8.22881ZM3.0861 2.82357H14.9148C15.3707 2.82407 15.8137 2.96303 16.1741 3.21849C16.5345 3.47396 16.7921 3.83157 16.9067 4.23537H1.09449C1.20902 3.83157 1.46663 3.47397 1.82707 3.21849C2.1875 2.96303 2.63042 2.82407 3.08638 2.82357H3.0861ZM15.9167 21.1764H2.08238L2.07049 7.05874H15.9287L15.9167 21.1764ZM14.8366 23.0588H3.16249C2.88696 23.0593 2.62166 22.9633 2.42096 22.7907C2.22026 22.6181 2.09914 22.3819 2.08249 22.1303V22.1176H15.9163V22.1303C15.8997 22.3816 15.7789 22.6176 15.5786 22.7901C15.3782 22.9627 15.1135 23.0588 14.8383 23.0588L14.8366 23.0588ZM15.9274 6.11768H2.07207V5.17648H15.9302L15.9274 6.11768Z" fill="black"/>
                <path d="M4.02841 20.2356C4.1649 20.2356 4.29571 20.1861 4.39213 20.0978C4.48855 20.0096 4.5427 19.8899 4.5427 19.765V8.47082C4.5427 8.21083 4.31254 8.00024 4.02843 8.00024C3.74448 8.00024 3.51416 8.21085 3.51416 8.47082V19.765C3.51416 19.8899 3.56831 20.0096 3.66492 20.0978C3.76134 20.1861 3.89215 20.2356 4.02846 20.2356H4.02841Z" fill="black"/>
                <path d="M6.51474 20.2356C6.65104 20.2356 6.78185 20.1861 6.87827 20.0978C6.97469 20.0096 7.02903 19.8899 7.02903 19.765V8.47082C7.02903 8.21083 6.79869 8.00024 6.51476 8.00024C6.23063 8.00024 6.00049 8.21085 6.00049 8.47082V19.765C6.00049 20.025 6.23065 20.2356 6.51476 20.2356L6.51474 20.2356Z" fill="black"/>
                <path d="M9.00009 20.2356C9.13658 20.2356 9.26739 20.1861 9.36381 20.0978C9.46023 20.0096 9.51438 19.8899 9.51438 19.765V8.47082C9.51438 8.21083 9.28404 8.00024 9.00011 8.00024C8.71619 8.00024 8.48584 8.21085 8.48584 8.47082V19.765C8.48584 19.8899 8.53999 20.0096 8.63641 20.0978C8.73283 20.1861 8.86365 20.2356 9.00013 20.2356H9.00009Z" fill="black"/>
                <path d="M11.4859 20.2356C11.6224 20.2356 11.7532 20.1861 11.8497 20.0978C11.9461 20.0096 12.0002 19.8899 12.0002 19.765V8.47082C12.0002 8.21083 11.7701 8.00024 11.486 8.00024C11.202 8.00024 10.9717 8.21085 10.9717 8.47082V19.765C10.9717 19.8899 11.026 20.0096 11.1224 20.0978C11.2189 20.1861 11.3497 20.2356 11.486 20.2356H11.4859Z" fill="black"/>
                <path d="M13.9718 20.2356C14.1081 20.2356 14.2389 20.1861 14.3353 20.0978C14.4319 20.0096 14.4861 19.8899 14.4861 19.765V8.47082C14.4861 8.21083 14.2557 8.00024 13.9718 8.00024C13.6877 8.00024 13.4575 8.21085 13.4575 8.47082V19.765C13.4575 19.8899 13.5117 20.0096 13.6081 20.0978C13.7045 20.1861 13.8353 20.2356 13.9718 20.2356H13.9718Z" fill="black"/>
                </svg>
              </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import UploadTaskFiles from '@/assets/services/UploadTaskFiles.vue'
import axios from "axios";
import * as LANGUAGE from '../../store/language.json';
import SnackBar from '../Snackbar/SnackBar.vue';

export default {
  data() {
    return {
      calendar_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      calendar_menu: false,
      lead_calendar: null,
      datepickermenu: false,
      hour: null,
      minute: null,
      hourRules: [
        v => v != '' || 'Field is required!',
        v => v >= 0 || '0 is the minimum',
        v => v < 25 || 'Value should be smaller than 24'
      ],
      minuteRules: [
        v => v != '' || 'Field is required!',
        v => v >= 0 || '0 is the minimum',
        v => v < 60 || 'Value should be smaller than 60'
      ],
      isCreateMode: true,
      client_type: 'actual',
      snackbar: {
        show: false,
        message: null,
        color: null,
      },
      isAdmin: false,
      items: [],
      status: "",
      type: "",
      activePicker: null,
      provisionsanfrag: "",
      dialog: false,
      dialogDelete: false,
      search_string: "",
      loading: true,
      headers: [
      {
          text: "#",
          align: "start",
          value: "id",
        },
        {
          text: this.translate("Date"),
          value: "date",
          width: "180px"
        },
        { text: this.translate("Task Name"), value: "name" },
        { text: this.translate("Note"), value: "note" },
        { text: this.translate("Actions"), value: "actions" },
      ],
      data: [],

      options: {},
      totalTaskTable: 0,

      create_task_data: {
        customer_id: "",
        type: "",
        name: "",
        date: "",
        place_id: "",
        note: "",
        agent_id: "",
        new_client: ""
        // attachments: "",
        // created_by: "",
      },

      get_task_data: [],

      customer_list_select: [],
      canton_select: [],
      task_type_select: [],

      deleteTaskId: 0,
      updateCustomerId: 0,

      tasks: [],
      editedIndex: -1,
      editedItem: {
        customer_id: "",
        type: "",
        name: "",
        date: "",
        place_id: "",
        note: "",
        // attachments: "",
        // created_by: "",
      },
      defaultItem: {
        customer_id: "1",
        type: "",
        name: "",
        date: "",
        place_id: "",
        note: "",
        // attachments: "",
        // created_by: "",
      },

      get_agents_list: [],

      showCompleted: '',

      start_date_filter: '',
      end_date_filter: ''
    };
  },

  computed: {
    formTitle() {
      return this.isCreateMode === true ? "Add Task" : "Edit Task";
    },
    formated_date() {
        if (!this.calendar_date) return null

        const [year, month, day] = this.calendar_date.split('-')
        return `${day}.${month}.${year}`
    }
  },

  watch: {
    client_type(val){
      if(val != 'actual') {
        this.create_task_data.customer_id = 0;
      } else {
        this.create_task_data.new_client = "";
      }
    },   
    hour(newHour) {
      // Pad the hour with a leading zero if it's a single-digit number
      if (newHour.length === 1) {
        this.hour = '0' + newHour;
      }
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    options: {
      handler() {
        this.getTasksDatatable();
      },
      deep: true,
    },
    search_string: {
      handler() {
        this.getTasksDatatable();
      },
      deep: true,
    },
    status: {
      handler() {
        this.getTasksDatatable();
      },
      deep: true,
    },
    showCompleted(val) {
      if (val) {
        this.status = 2
      } else {
        this.status = "";
      }

      this.getTasksDatatable()
    },
    calendar_date(val) {
      let splitDate = val.toString().split(",");

      this.start_date_filter = splitDate[0]
      this.end_date_filter = splitDate[1]

      this.getTasksDatatable();
    },
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  created() {
    this.getTaskTypes();
  },

  mounted() {
    this.getTasksDatatable();
    this.getCantonSelect();
    this.getCustomerList();
    this.getAgentsList();
    if (this.$helperPlugin.ifAdmin()) {
      this.isAdmin = true;
    }
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

    getCustomerList() {
      axios
          .get("/customer")
          .then((response) => {

            for (let $i = 0; response.data.length > 0; $i++) {

              this.customer_list_select.push({
                text: response.data[$i].first_name + ' ' + response.data[$i].last_name,
                value: response.data[$i].id,
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

    getTasksDatatable() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;

      let sortType;
      sortType = "asc";
      if (sortDesc[0]) {
        sortType = "desc";
      }

      axios
        .get("/task/datatable?term=" + this.search_string + "&type=" + this.status + "&start_date=" + this.start_date_filter + "&end_date=" + this.end_date_filter, {
          params: {
            sort_by: sortBy[0],
            sort: sortType,
            page: page,
            per_page: itemsPerPage,
          },
        })
        .then((response) => {
          this.tasks = response.data.data;
          this.totalTaskTable = response.data.total;
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

    createTask() {
      const { customer_id, type, name, date, place_id, note, agent_id, new_client } = this.create_task_data;

      // var _date = new Date(`${date} ${this.hour}:${this.minute}`);
      // var offset = 1; // CET is 1 hour ahead of UTC
      // var utc = _date.getTime() + (_date.getTimezoneOffset() * 60000);
      // var cet = new Date(utc + (3600000*offset));
      
      const hourInt = parseInt(this.hour, 10);
      const minuteInt = parseInt(this.minute, 10);
      
      const dt = new Date(`${date}T00:00:00Z`);
      dt.setUTCHours(hourInt);
      dt.setUTCMinutes(minuteInt);


      axios
        .post("/task", {
          customer_id,
          type,
          name,
          date: dt,
          place_id,
          note,
          agent_id,
          new_client
        })
        .then(() => {
          this.create_task_data = {};
          this.snackbar = {
            message: "Data updated successfully",
            error: false
          };

          this.$refs.snackbar.toggleSnackbar(true);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getTask(task_id) {
      axios
        .get("/task/" + task_id)
        .then((response) => {
          this.create_task_data = {};

          this.get_task_data.push(response.data.data);

          this.create_task_data.customer_id = parseInt(response.data.data.customer_id);
          this.create_task_data.type = parseInt(response.data.data.type);
          this.create_task_data.name = response.data.data.name;
          this.create_task_data.date = response.data.data.date;
          this.create_task_data.place_id = parseInt(response.data.data.place_id);
          this.create_task_data.agent_id = parseInt(response.data.data.agent_id);
          this.create_task_data.note = response.data.data.note;
          this.create_task_data.created_by = response.data.data.created_by;
          this.create_task_data.new_client = response.data.data.new_client;

        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateTask(task_id) {
      axios
        .put("/task/" + task_id, this.create_task_data)
        .then((response) => {
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

    deleteTask(task_id) {
      axios
        .delete("/task/" + task_id)
        .then((response) => {
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

    updateTaskStatus(task_id) {
      axios
        .put("/task/complete/" + task_id, {
          complete: "1",
        })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getTaskTypes() {
      axios
        .get("/tasktype")
        .then((response) => {
          for (let $i = 0; response.data.length > 0; $i++) {
            this.task_type_select.push({
              text: this.translate(response.data[$i].name),
              value: response.data[$i].id,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    openDialog() {
      this.create_task_data = this.defaultItem;
      this.isCreateMode = true;
      this.dialog = true;
    },

    editTask(item) {
      this.isCreateMode = false;
      this.getTask(item.id);
      this.updateTaskId = item.id;
      this.dialog = true;
    },

    deleteTaskModal(item) {
      this.deleteTaskId = item.id;
      this.dialogDelete = true;
    },

    deleteTaskModalConfirm() {
      this.closeDelete();
      this.deleteTask(this.deleteTaskId);
      this.getTasksDatatable();
    },

    close() {
      this.dialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    save() {
      this.close();
      this.createTask();
      this.getTasksDatatable();
    },

    update() {
      this.close();
      this.updateTask(this.updateTaskId);
      this.getTasksDatatable();
    },
  },


  components: { UploadTaskFiles, SnackBar },
};
</script>

<style>
tbody tr:nth-of-type(odd) {
  background-color: #f7fcfe;
}

.v-data-table {
  border-radius: 10px;
}

.v-data-table tr td {
  border: none !important;
}

.v-counter {
  margin-top: 5px !important;
}
</style>