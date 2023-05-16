<template>
  <div>
    <v-row>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ translate('Edit Customer') }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                      v-model="create_customer_data.salutation"
                      :label="translate('Salutation')"
                  ></v-text-field>
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
                          v-model="format_birthday"
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
                  >
                  <template v-slot:no-data>
                    <span style="text-align: center; display: block;">{{ translate("No data available") }}</span>
                  </template>
                </v-select>
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
                  >
                  <template v-slot:no-data>
                    <span style="text-align: center; display: block;">{{ translate("No data available") }}</span>
                  </template>
                </v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                      v-model="create_customer_data.source_id"
                      :label="translate('Source')"
                      :items="source_id"
                  >
                  <template v-slot:no-data>
                    <span style="text-align: center; display: block;">{{ translate("No data available") }}</span>
                  </template>
                </v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              {{translate("cancel")}}
            </v-btn>

            <v-btn
                color="blue darken-1"
                text
                @click="update($router.currentRoute.params.client_id)"
            >
              {{ translate('Update') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-col
        cols="12"
        xs="12"
        sm="12"
        md="12"
        lg="12"
        class="d-flex align-center justify-end flex-nowrap"
      >
        <v-btn :title="translate('Edit customer')" color="#fff" class="lead-buttons ml-4" icon
          @click="editCustomer($router.currentRoute.params.client_id)"><svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.4821 8.94807L5.00602 12.298C4.98108 12.4757 5.03437 12.6553 5.15222 12.7902C5.26992 12.9251 5.44034 13.0017 5.61888 13H5.6944L9.08546 12.5772V12.577C9.22097 12.5599 9.34679 12.4977 9.44298 12.4006L16.1473 5.65393C16.6788 5.1571 16.9865 4.46458 16.9996 3.73522C17.0127 3.0059 16.7301 2.30261 16.2167 1.7869C15.7035 1.27119 15.0035 0.987279 14.2777 1.00044C13.5519 1.01361 12.8626 1.32273 12.3681 1.85661L5.65536 8.59929C5.56146 8.69364 5.50047 8.81606 5.48181 8.94821L5.4821 8.94807ZM6.66691 9.32578L13.2304 2.72678C13.6031 2.40349 14.1136 2.29252 14.5858 2.43212C15.0582 2.57172 15.4275 2.94285 15.5665 3.41747C15.7054 3.89194 15.595 4.40493 15.2732 4.77934L8.71808 11.3783L6.33218 11.674L6.66691 9.32578Z" fill="white"/>
            <path d="M9.53572 0H2.35709C1.73198 0 1.13243 0.244597 0.690427 0.680187C0.248267 1.11564 0 1.70629 0 2.32228V16.6777C0 17.2937 0.248279 17.8844 0.690427 18.3198C1.13243 18.7554 1.73198 19 2.35709 19H15.6429C16.268 19 16.8676 18.7554 17.3096 18.3198C17.7517 17.8844 18 17.2937 18 16.6777V8.07501C18 7.84882 17.8774 7.63971 17.6786 7.52662C17.4797 7.41338 17.2347 7.41338 17.0357 7.52662C16.8368 7.63971 16.7144 7.84882 16.7144 8.07501V16.6777C16.7144 16.9577 16.6014 17.2263 16.4005 17.4242C16.1996 17.6221 15.9271 17.7333 15.6429 17.7333H2.35709C2.07294 17.7333 1.80044 17.6221 1.59955 17.4242C1.39865 17.2263 1.28565 16.9577 1.28565 16.6777V2.32228C1.28565 2.04234 1.39865 1.77373 1.59955 1.57582C1.80044 1.3779 2.07293 1.26672 2.35709 1.26672H9.53572C9.76546 1.26672 9.97758 1.14597 10.0925 0.949974C10.2073 0.754121 10.2073 0.5126 10.0925 0.316608C9.97758 0.120755 9.76547 3.73898e-06 9.53572 3.73898e-06L9.53572 0Z" fill="white"/>
            </svg>
        </v-btn>
        <v-btn @click="scrollBottom" :title="translate('Add family member')" color="#fff" class="lead-buttons ml-4" icon>
          <svg width="19" height="19" viewBox="0 0 759 667" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M542.557 648.335C542.557 640.242 535.986 633.671 527.894 633.669V633.667H64.667C47.0265 633.667 32.667 619.307 32.667 601.667C32.667 455.364 151.699 336.334 298 336.334C378.532 336.334 453.805 372.415 504.518 435.352L504.518 435.353C509.594 441.647 518.842 442.643 525.138 437.565L525.139 437.565C531.44 432.481 532.447 423.254 527.349 416.943C487.63 367.657 434.308 333.258 374.938 317.234C427.971 289.419 464.314 233.94 464.314 169.989C464.314 78.2637 389.706 3.65527 297.981 3.65527C206.256 3.65527 131.647 78.2637 131.647 169.989C131.647 233.948 168.02 289.444 221.068 317.252C95.7966 351.182 3.33008 465.792 3.33008 601.669C3.33008 635.492 30.8399 663.002 64.6634 663.002H527.89C535.984 663.002 542.557 656.43 542.557 648.335ZM161 170C161 94.4597 222.46 33.0002 298 33.0002C373.541 33.0002 435 94.4597 435 170C435 245.541 373.541 307 298 307C222.46 307 161 245.541 161 170Z" fill="white" stroke="white" stroke-width="6"/>
            <path d="M493.334 531.667C493.334 604.084 552.25 663 624.667 663C697.084 663 756.001 604.084 756.001 531.667C756.001 459.25 697.084 400.333 624.667 400.333C552.25 400.333 493.334 459.25 493.334 531.667ZM522.667 531.667C522.667 475.433 568.434 429.667 624.667 429.667C680.901 429.667 726.667 475.433 726.667 531.667C726.667 587.901 680.901 633.667 624.667 633.667C568.434 633.667 522.667 587.901 522.667 531.667Z" fill="white" stroke="white" stroke-width="6"/>
            <path d="M671.334 517H639.334V485C639.334 476.906 632.762 470.333 624.667 470.333C616.573 470.333 610.001 476.906 610.001 485V517H578.001C569.906 517 563.334 523.573 563.334 531.667C563.334 539.761 569.906 546.333 578.001 546.333H610.001V578.333C610.001 586.428 616.573 593 624.667 593C632.762 593 639.334 586.428 639.334 578.333V546.333H671.334C679.428 546.333 686.001 539.761 686.001 531.667C686.001 523.573 679.428 517 671.334 517Z" fill="white" stroke="white" stroke-width="6"/>
          </svg>
        </v-btn>
        <v-btn :title="translate('Send email to administrator')" color="#fff" class="lead-buttons ml-4" icon
          ><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.82159 19H17.1784C17.6617 18.9995 18.125 18.8101 18.4665 18.4737C18.8081 18.1372 19 17.6811 19 17.2055V7.60896C18.9999 7.45925 18.9326 7.3172 18.8162 7.22082L16.2738 5.10727V1.42259C16.2738 1.04534 16.1215 0.683442 15.8504 0.416627C15.5793 0.149826 15.2116 0 14.8282 0H4.27307C3.8896 0 3.52196 0.149844 3.25082 0.416627C2.9797 0.683428 2.8273 1.04534 2.8273 1.42259V5.03004L0.183819 7.22085C0.0674221 7.31725 0.000143828 7.4593 0 7.60899V17.2056C0 17.6812 0.191885 18.1372 0.533454 18.4738C0.875016 18.8102 1.3383 18.9996 1.82164 19L1.82159 19ZM17.1765 17.9838H1.82159C1.61213 17.9834 1.41146 17.9012 1.26365 17.7551C1.1157 17.6093 1.03258 17.4116 1.03258 17.2055V8.57827L6.91846 12.6756L2.74045 15.8216C2.5124 15.99 2.46616 16.3084 2.63716 16.533C2.8083 16.7574 3.132 16.8029 3.36006 16.6345L7.8025 13.2893L9.24812 14.3055C9.42689 14.4301 9.66618 14.4301 9.84497 14.3055L11.2906 13.2893L15.7349 16.6284C15.9631 16.7968 16.2866 16.7513 16.4578 16.5269C16.6289 16.3024 16.5827 15.984 16.3545 15.8155L12.1849 12.6756L17.9676 8.65158V17.2077V17.2075C17.967 17.4132 17.8837 17.6104 17.7358 17.7559C17.588 17.9013 17.3877 17.9834 17.1786 17.9838L17.1765 17.9838ZM17.6784 7.6066L16.274 8.58422V6.43609L17.6784 7.6066ZM4.2729 1.01787H14.8302C14.9399 1.01787 15.0449 1.06068 15.1224 1.13681C15.1998 1.21308 15.2433 1.31642 15.2433 1.4243V9.29739L9.55136 13.2626L3.86167 9.29739V1.42213C3.86282 1.19928 4.04607 1.01882 4.27269 1.0178L4.2729 1.01787ZM2.82728 8.58429L1.3651 7.56813L2.82728 6.34866V8.58429ZM9.49979 10.6532H9.63204C9.91713 10.6532 10.1483 10.4257 10.1483 10.1451C10.1483 9.86442 9.91713 9.63704 9.63204 9.63704H9.49979C8.62665 9.63704 7.78938 9.29567 7.17196 8.68808C6.55468 8.08064 6.20776 7.25671 6.20776 6.39747C6.20776 5.53823 6.55465 4.71431 7.17196 4.10671C7.78938 3.49927 8.62665 3.15787 9.49979 3.15787C10.3729 3.15787 11.2102 3.49924 11.8276 4.10671C12.4449 4.71431 12.7918 5.53823 12.7918 6.39747V7.2652C12.7799 7.45942 12.6678 7.63407 12.4946 7.72792C12.3216 7.82177 12.1116 7.82177 11.9386 7.72792C11.7654 7.63407 11.6533 7.45942 11.6414 7.2652V6.39747C11.6457 5.75471 11.3525 5.14498 10.8447 4.74069C10.337 4.33637 9.66995 4.18129 9.03205 4.31953C8.39415 4.45761 7.8548 4.87395 7.56641 5.45066C7.27814 6.02737 7.27209 6.70189 7.55013 7.28353C7.82816 7.86503 8.36003 8.29062 8.99545 8.43974C9.63077 8.58874 10.3005 8.44527 10.8154 8.04975C11.0492 8.46115 11.4573 8.74851 11.9285 8.83329C12.3997 8.9182 12.8848 8.79175 13.2515 8.48838C13.6182 8.18514 13.8282 7.7366 13.8245 7.26524V6.39751C13.8245 5.26877 13.3688 4.18641 12.5577 3.38829C11.7467 2.59017 10.6468 2.14175 9.49981 2.14175C8.3528 2.14175 7.25292 2.59013 6.44188 3.38829C5.63084 4.18641 5.17516 5.26877 5.17516 6.39751C5.17516 7.52625 5.6308 8.60861 6.44188 9.40673C7.25292 10.2049 8.3528 10.6533 9.49981 10.6533L9.49979 10.6532ZM9.49979 7.48876C9.20562 7.48876 8.92356 7.37379 8.71553 7.16922C8.50765 6.96452 8.39082 6.68694 8.39082 6.39745C8.39082 6.10796 8.50765 5.83039 8.71553 5.62567C8.92354 5.42111 9.20561 5.30599 9.49979 5.30599C9.79398 5.30599 10.076 5.42111 10.2841 5.62567C10.4919 5.83038 10.6088 6.10795 10.6088 6.39745C10.6088 6.68693 10.4919 6.9645 10.2841 7.16922C10.076 7.37379 9.79398 7.48876 9.49979 7.48876Z" fill="white"/>
            </svg>
        </v-btn>
        <v-btn :title="translate('Add a note')" @click="openNotesDialog()" color="#fff" class="lead-buttons ml-4" icon
          ><svg
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.68492 0H20.5633C21.9913 0 23.1909 1.19958 23.1909 2.68461V15.7081C23.1909 17.1931 21.9913 18.3927 20.5633 18.3927H13.0235L5.36942 21.9342C4.91243 22.1626 4.34117 21.7629 4.34117 21.2488V18.3929H2.68461C1.19958 18.3929 0 17.1933 0 15.7082V2.68477C0 1.19974 1.19958 0.00015708 2.68461 0.00015708L2.68492 0ZM20.5633 1.42797H2.68492C1.99955 1.42797 1.42829 1.99923 1.42829 2.68461V15.7081C1.42829 16.3935 1.99955 16.9077 2.68492 16.9077H5.08392C5.48385 16.9077 5.82652 17.2504 5.82652 17.6503V20.1635L12.5095 17.0219C12.6238 16.9649 12.7379 16.9077 12.8522 16.9077H20.5632C21.2486 16.9077 21.7628 16.3936 21.7628 15.7081V2.6846C21.7628 1.99922 21.2487 1.42796 20.5632 1.42796L20.5633 1.42797Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.22628 7.8252C6.96888 7.8252 7.5972 8.45351 7.5972 9.19611C7.5972 9.9387 6.96888 10.567 6.22628 10.567C5.48369 10.567 4.85537 9.9387 4.85537 9.19611C4.85537 8.45351 5.48369 7.8252 6.22628 7.8252Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.5957 7.8252C12.3953 7.8252 12.9666 8.45351 12.9666 9.19611C12.9666 9.9387 12.3953 10.567 11.5957 10.567C10.8531 10.567 10.2247 9.9387 10.2247 9.19611C10.2247 8.45351 10.8531 7.8252 11.5957 7.8252Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.965 7.8252C17.7647 7.8252 18.336 8.45351 18.336 9.19611C18.336 9.9387 17.7647 10.567 16.965 10.567C16.2225 10.567 15.5941 9.9387 15.5941 9.19611C15.5941 8.45351 16.2225 7.8252 16.965 7.8252Z"
              fill="white"
            />
          </svg>
        </v-btn>
        <UploadCustomerFiles :type="active_tab_name" :customer_id="selected_member" :title="translate('Add pdf file')" modified="true" v-if="$helperPlugin.ifAdmin()" />
      </v-col>
    </v-row>
    <v-card outlined class="offersTab mt-4">
      <v-tabs
        background-color="#e5eff5"
        v-model="tab"
        class="tabs"
      >
        <v-tab v-for="item in items" :key="item.tab">
          {{ translate(item.tab) }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab" transition="fade-transition" reverse-transition="fade-transition">
          <v-card flat>
            <v-card-text>
              <component v-if="item.index == tab" :is="item.content" :shouldOpenDialog="openDialog"></component>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
  
<script>
import ApplicationTab from "./ApplicationTab.vue";
import PoliciesTab from "../Policies/PoliciesTab.vue";
import MandateTab from "./MandateTab.vue";
import DocumentsTab from "./DocumentsTab.vue";
import NotesTab from "./NotesTab.vue";
import OtherApplications from "./OtherApplications.vue";
import UploadCustomerFiles from "@/assets/services/UploadCustomerFiles.vue";
import axios from "axios";
import * as LANGUAGE from '../../store/language.json';
export default {
  data() {
    return {
      get_customer_data: [],
      tab: 0,
      openDialog: false,
      dialog: false,
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
        source_id: "",
      },
      lang_select: [],
      items: [
        { tab: "Applications", content: ApplicationTab, index: 0 },
        { tab: "Policies", content: PoliciesTab, index: 1 },
        { tab: "Mandate", content: MandateTab, index: 2 },
        { tab: "Documents", content: DocumentsTab, index: 3},
        { tab: "Notes", content: NotesTab, index: 4 },
        { tab: "Other applications", content: OtherApplications, index: 5 },
      ],
      members_list_select: [],
      selected_member: parseInt(this.$router.currentRoute.params.client_id),
      canton_select: []
    };
  },

  computed: {
    active_tab_name() {
      const { tab } = this.items.filter(t => t.index == this.tab)[0];
      return tab;
    },
    format_birthday() {
      if (!this.create_customer_data.birthday) return null

        const [year, month, day] = this.create_customer_data.birthday.split('-')
        return `${day}.${month}.${year}`
    }
  },

  methods: {
    getLanguages(){
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
    scrollBottom(){
      window.scrollTo({
        top: 1000,
        behavior: 'smooth'
      })
    },
    openNotesDialog(){
      this.openDialog = true;
      this.$nextTick(() => {
        this.tab = 4;
      })
    },
    saveDate(date) {
      this.$refs.menu.save(date);
    },
    update(customer_id) {
      this.dialog = false;
      this.updateCustomer(customer_id);
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

            this.$router.go();
          })
          .catch((error) => {
            this.snackbar = {
              message: error.response.data.message,
              color: "error",
              show: true,
            };
          });
    },
    editCustomer(item) {
      this.getCustomer(item);
      this.dialog = true;
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
            this.create_customer_data.lang = response.data.data.lang;
            this.create_customer_data.source_id = parseInt(response.data.data.source_id);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getMembers() {
      axios
        .get("/customermember", {
          params: {
            customer_id: this.$router.currentRoute.params.client_id
          }
        })
        .then((response) => {
          for (let $i = 0; response.data.length > 0; $i++) {
            this.members_list_select.push({
              text:
                response.data[$i].first_name +
                " " +
                response.data[$i].last_name,
              value: response.data[$i].id,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  watch: {
    selected_member: function (val) {
      this.$router.push({path: this.$route.fullPath, query: {member: val} })
      // this.$router.replace({
      //   name: "applications",
      //   params: { client_id: val },
      // });
      // this.$router.go(0);
    },
  },

  mounted() {
    this.getMembers();

    axios
        .get("/canton")
        .then(response => {
          response.data.forEach((can) => {
            let canton_info = {
                text: can.name,
                value: can.id 
            };

            this.canton_select.push(canton_info);
          });
        });
  },

  created(){
    this.getLanguages();
  },

  components: { ApplicationTab, PoliciesTab, MandateTab, DocumentsTab, NotesTab, UploadCustomerFiles, OtherApplications },
};
</script>
  
  <style scoped>
.tabs {
  border-top-right-radius: 8px !important;
  border-top-left-radius: 8px !important;
}

.offersTab {
  border-radius: 20px !important;
  border: none;
}

.theme--light.v-card {
  background-color: #e5eff5 !important;
}

.lead-buttons {
  margin-left: 4px;
  background: #36a5dd;
  box-shadow: 0px 2px 6px rgba(54, 165, 221, 0.2);
  border-radius: 5px;
}
</style>