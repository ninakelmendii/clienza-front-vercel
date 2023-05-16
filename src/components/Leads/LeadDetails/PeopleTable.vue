<template>
  <v-data-table
      :headers="headersComputed"
      :items="data"
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
    <template v-slot:top>
      <v-toolbar flat>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.first_name"
                      :label="translate('First Name')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.last_name"
                      :label="translate('Last Name')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.type"
                      :label="translate('Type')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.date"
                      :label="translate('Date')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.price"
                      :label="translate('Price')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.status"
                      :label="translate('Status')"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
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
                  @click="deleteItemConfirm"
                  class="btn btn-decline"
                  >{{translate('Confirm')}}</button
              >
          </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div>
        <v-btn icon @click="emitEdit(item.id)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.78486e-06 22.1066C0.00104677 22.6084 0.20068 23.0895 0.555672 23.4443C0.910482 23.7993 1.39158 23.9989 1.89343 24H20.2404C20.7423 23.9993 21.2234 23.7995 21.5784 23.4447C21.9334 23.0897 22.133 22.6086 22.1337 22.1066V9.37598C22.1377 9.2708 22.0986 9.16873 22.0257 9.09313C21.9527 9.01736 21.8522 8.97463 21.7471 8.97463C21.6419 8.97463 21.5414 9.01736 21.4684 9.09313C21.3955 9.16873 21.3564 9.2708 21.3604 9.37598V22.1066C21.3604 22.4036 21.2424 22.6885 21.0324 22.8986C20.8222 23.1086 20.5375 23.2265 20.2404 23.2265H1.89343C1.5964 23.2265 1.31146 23.1086 1.10145 22.8986C0.891434 22.6885 0.773455 22.4036 0.773455 22.1066V3.75956C0.773455 3.46253 0.891439 3.17777 1.10145 2.96759C1.31147 2.75757 1.5964 2.63959 1.89343 2.63959H14.6249C14.8306 2.62887 14.9918 2.45899 14.9918 2.25295C14.9918 2.04691 14.8306 1.87703 14.6249 1.8663H1.89343C1.39157 1.86734 0.910663 2.06715 0.55584 2.42197C0.200857 2.77678 0.00106288 3.25787 0 3.75955L8.78486e-06 22.1066ZM23.7739 3.44778L22.9902 4.23161L19.7686 1.00959L20.5529 0.225587H20.5528C20.6981 0.0811373 20.8946 0 21.0994 0C21.3044 0 21.501 0.0811329 21.6461 0.225587L23.7734 2.3536V2.35377C23.9184 2.49874 23.9997 2.69543 23.9997 2.90044C23.9997 3.10545 23.9184 3.30214 23.7734 3.44712L23.7739 3.44778ZM6.30331 14.7014L9.29473 17.693L5.39681 18.5679L6.30348 14.7011L6.30331 14.7014ZM18.8926 1.88536L19.221 1.55753L22.4432 4.77885L22.1148 5.10702L18.8926 1.88536ZM6.73776 14.0411L18.347 2.43274L19.6846 3.77032L8.0749 15.3783L6.73776 14.0411ZM8.62201 15.9264L20.2304 4.31757L21.568 5.65462L9.95916 17.2626L8.6221 15.9263L8.62201 15.9264Z" fill="black"/>
          </svg>
        </v-btn>

        <v-btn icon @click="deleteItemModal(item.id)">
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
    <template v-slot:[`item.date_of_birth`]="{ item }">
      {{ item.date_of_birth | moment("DD.MM.YYYY") }}
    </template>
    <template v-slot:[`item.investment`]="{ item }">
      {{ getInsuranceName(item.investment) }}
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import * as LANGUAGE from '../../../store/language.json';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "First Name",
        align: "start",
        value: "first_name",
      },
      { text: "Last Name", value: "last_name" },
      // { text: "Type", value: "type" },
      { text: "Date", value: "created_at" },
      { text: "Actual Insurance", value: "investment" },
    
      { text: "KVG", value: "kvg.name" },
      { text: "VVG", value: "vvg.name" },
      // { text: "Status", value: "status" },
      { text: "Actions", value: "actions" },
    ],
    people: [],
    insurances: [],
    editedIndex: -1,
    editedItem: {
      first_name: "",
      last_name: "",
      type: "",
      date: "",
      price: 0,
      status: "",
    },
    defaultItem: {
      first_name: "",
      last_name: "",
      type: "",
      date: "",
      price: 0,
      status: "",
    },

    deleteItemId: 0,
    updateItemId: 0,

    loading: true,
    options: {},
    totalTableData: 0,
    data: []

  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },

    headersComputed() {
      const computed_headers = [{
        text: this.translate("First Name"),
        align: "start",
        value: "first_name",
      },
      { text: this.translate("Last Name"), value: "last_name" },
      // { text: "Type", value: "type" },
      { text: this.translate("Date"), value: "created_at" },
      { text: this.translate("Actual Insurance"), value: "investment" },
    
      { text: this.translate("KVG"), value: "kvg.name" },
      { text: this.translate("VVG"), value: "vvg.name" },
      // { text: "Status", value: "status" },
      { text: this.translate("Actions"), value: "actions" },]

      return computed_headers;
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
    getInsuranceName(id) {
      const insurance = this.insurances.find(i => i.id == id);
    
      return insurance.name;
    },

    emitEdit(people_id) {
      this.$emit('editPeople', true, people_id)
    },

    getItemsTable() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;

      let sortType;
      sortType = "asc";
      if (sortDesc[0]) {
        sortType = "desc";
      }

      let id = this.$router.currentRoute.params.id;
      let url = 'leadpeople';
      let param = 'lead_id';

      if(!id) {
        id = this.$router.currentRoute.params.client_id;
        url = 'customerpeople';
        param = 'customer_id';
      }

      // Getting the insurances
      axios
          .get('/insurances')
          .then(response => {
              console.log('Insurances', response.data);
              this.insurances = response.data.data;
          })
          .catch(err => console.log(err));

      // axios.get('customerpeople/datatable?customer_id=' + id).then(response => console.log('CUSTOMER PEOPLES', response.data))

      axios
          .get(`/${url}/datatable?${param}=${id}`, {
            params: {
              sort_by: sortBy[0],
              sort: sortType,
              page: page,
              per_page: itemsPerPage,
            },
          })
          .then((response) => {
            console.log("aksdnlaksjhdakjsljdhkalsd", response.data);

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

      this.loading = false;
    },

    deleteItem(item) {
      let url = '/lead/people/';

      if(this.$router.currentRoute.params.client_id) {
        url = "customer_people/";
      }

      axios
          .delete(url + item)
          .then((response) => {
            this.snackbar = {
              message: response.data.message,
              color: "success",
              show: true,
            };
          })
          .catch((error) => {
            this.snackbar = {
              message: error.response.data.message,
              color: "error",
              show: true,
            };
          });
    },

    deleteItemConfirm() {
      this.deleteItemModalConfirm()
    },

    close() {
      this.dialog = false;
    },

    deleteItemModal(item) {
      this.deleteItemId = item;
      this.dialogDelete = true;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    deleteItemModalConfirm() {
      this.closeDelete();
      this.deleteItem(this.deleteItemId);
      this.getItemsTable();
    },

  },
};
</script>