<template>
  <v-row>
    <v-dialog v-model="dialogAcceptLead" max-width="550px">
      <v-card>
        <v-row no-gutters no-wrap style="padding: 24px;">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y ="4" width="48" height="48" rx="24" fill="#D1FADF"/>
                <path d="M23.5 28L26.5 31L32.5 25M38 28C38 33.5228 33.5228 38 28 38C22.4772 38 18 33.5228 18 28C18 22.4772 22.4772 18 28 18C33.5228 18 38 22.4772 38 28Z" stroke="#039855" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="4" y="4" width="48" height="48" rx="24" stroke="#ECFDF3" stroke-width="8"/>
            </svg>
            <div style="margin-left: 16px;">
                <v-card-title class="text-h5 p-0">{{translate("Add customer")}}</v-card-title>
                <v-card-text class="p-0" style="margin-top: 4px;">{{translate('Are you sure you want this lead to be your customer?')}}</v-card-text>
            </div>
        </v-row>
        <v-card-actions class="justify-end">
            <button @click="dialogAcceptLead = !dialogAcceptLead" class="btn btn-cancel" :class="{ 'btn-dark': $vuetify.theme.dark }"
                >{{translate("Cancel")}}</button
            >
            <button
                color="blue darken-1"
                text
                @click="acceptLeadCustomer()"
                class="btn btn-ok"
                >{{ translate('Confirm') }}</button
            >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="550px">
              <v-card>
              <v-row no-gutters no-wrap style="padding: 24px;">
                  <img src="@/assets/gifs/trash.gif" style="width: 56px; height: 56px;" />
                  <div style="margin-left: 16px;">
                      <v-card-title class="text-h5 p-0">{{translate('Delete')}}</v-card-title>
                      <v-card-text class="p-0" style="margin-top: 4px;">{{ translate('Are you sure you want to delete this item?') }}</v-card-text>
                  </div>
              </v-row>
              <v-card-actions class="justify-end">
                  <button @click="deleteDialog = false" class="btn btn-cancel" :class="{ 'btn-dark': $vuetify.theme.dark }"
                      >{{ translate('Cancel') }}</button
                  >
                  <button
                      color="blue darken-1"
                      text
                      @click="declineLeadCustomer()"
                      class="btn btn-decline"
                      >{{translate('Confirm')}}</button
                  >
              </v-card-actions>
              </v-card>
          </v-dialog>
    <!-- <v-dialog v-model="deleteDialog" max-width="550px">
      <v-card>
        <v-row no-gutters no-wrap style="padding: 24px;">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="48" height="48" rx="24" fill="#FEE4E2"/>
            <path d="M32 22V21.2C32 20.0799 32 19.5198 31.782 19.092C31.5903 18.7157 31.2843 18.4097 30.908 18.218C30.4802 18 29.9201 18 28.8 18H27.2C26.0799 18 25.5198 18 25.092 18.218C24.7157 18.4097 24.4097 18.7157 24.218 19.092C24 19.5198 24 20.0799 24 21.2V22M26 27.5V32.5M30 27.5V32.5M19 22H37M35 22V33.2C35 34.8802 35 35.7202 34.673 36.362C34.3854 36.9265 33.9265 37.3854 33.362 37.673C32.7202 38 31.8802 38 30.2 38H25.8C24.1198 38 23.2798 38 22.638 37.673C22.0735 37.3854 21.6146 36.9265 21.327 36.362C21 35.7202 21 34.8802 21 33.2V22" stroke="#D92D20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <rect x="4" y="4" width="48" height="48" rx="24" stroke="#FEF3F2" stroke-width="8"/>
          </svg>
          <div style="margin-left: 16px;">
              <v-card-title class="text-h5 p-0">{{ translate('Delete') }}</v-card-title>
              <v-card-text class="p-0" style="margin-top: 4px;">{{ translate('Are you sure you want to delete this?') }}</v-card-text>
          </div>
        </v-row>
        <v-card-actions class="justify-end">
            <button @click="deleteDialog = !deleteDialog" class="btn btn-cancel"
                >{{translate('Cancel')}}</button
            >
            <button
                color="blue darken-1"
                text
                @click="declineLeadCustomer()"
                class="btn btn-decline"
                >{{ translate('Confirm') }}</button
            >
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <v-col cols="12" xs="12" sm="12" md="2" lg="2">
      <v-list class="status">
        <v-list-item-group v-model="selectedStatus" color="primary">
          <v-list-item v-for="(item, i) in lead_status_data" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="translate(item.text)"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>

    <v-col cols="12" xs="12" sm="12" md="10" lg="10">
      <div>
        <v-row>
          <SnackBar :data="snackbar" ref="snackbar"></SnackBar>

          <v-col cols xs="12" xm="12" md="3" lg="3">
            <v-text-field
              rounded
              filled
              v-model="search_string"
              :background-color="$vuetify.theme.dark ? '' : 'white'"
              :label="translate('Search')"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>

          <v-col cols xs="12" xm="12" md="3" lg="3">
            <v-menu
              ref="menu"
              v-model="lead_menu"
              :close-on-content-click="false"
              :return-value.sync="lead_calendar"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="lead_calendar_needs_format"
                  :label="translate('From')"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  :background-color="$vuetify.theme.dark ? '' : '#fff'"
                  rounded
                  filled
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="lead_calendar" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="lead_menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(lead_calendar)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols xs="12" xm="12" md="3" lg="3">
            <v-menu
              ref="menu_to"
              v-model="lead_to_menu"
              :close-on-content-click="false"
              :return-value.sync="lead_to_calendar"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="lead_to_calendar_needs_format"
                  :label="translate('To')"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  :background-color="$vuetify.theme.dark ? '' : '#fff'"
                  rounded
                  filled
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date_to" no-title scrollable :min="lead_calendar">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu_to = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu_to.save(date_to)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>  

          <v-col cols xs="12" xm="12" md="3" lg="3">
            <v-select
              rounded
              filled
              :background-color="$vuetify.theme.dark ? '' : 'white'"
              :label="translate('Canton')"
              :items="canton_select"
              prepend-inner-icon="mdi-map-outline"
            ></v-select>
          </v-col>

          <v-col
            cols
            xs="12"
            xm="12"
            md="12"
            lg="12"
            class="mt-3 mb-3 d-flex justify-end"
          >
            <v-chip label color="transparent">{{ translate('Total') }}: {{ totalLeadsTable }}</v-chip>
          </v-col>
        </v-row>

        <div class="d-flex justify-end">
          <template v-if="isAdmin">
            <v-btn
              color="primary mb-2 ml-2 lead-buttons"
              v-on:click="downloadSampleList"
              dark
              class="mb-2"
            >
              <v-icon>mdi-tray-arrow-down</v-icon> {{translate('Download Sample List')}}
            </v-btn>

            <v-btn
              color="primary mb-2 ml-2 lead-buttons"
              dark
              class="mb-2"
              @click="openImportDialog"
            >
              <v-icon>mdi-tray-arrow-up</v-icon> {{translate('Import')}} {{ translate("Leads") }}
            </v-btn>
          </template>
          <v-btn
            color="primary mb-2 ml-2 lead-buttons"
            dark
            class="mb-2"
            @click="openDialog"
          >
            <v-icon>mdi-plus</v-icon> {{ translate('New Lead') }}
          </v-btn>
        </div>

        <v-data-table
          ref="dataTable"
          :headers="filteredHeaders"
          :items="data"
          :loading="loading"
          :options.sync="options"
          :server-items-length="totalLeadsTable"
          :footer-props="{'items-per-page-text':translate('Rows per page'), 'items-per-page-all-text':translate('All')}"
        >
          <template v-slot:default> aa</template>
          <template v-slot:no-data>
            {{translate('No data available')}}
          </template>
          <template v-slot:loading>
            {{translate('Loading items')}}...
          </template>
          <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-dialog v-model="importLeadDialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ translate('Import Lead') }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          xs="12"
                          sm="12"
                          md="12"
                          lg="12"
                          class="mt-5 mb-5"
                        >
                          <v-file-input
                            color="primary accent-4"
                            counter
                            :label="translate('File input')"
                            multiple
                            v-model="files"
                            placeholder="Select your CSV file"
                            prepend-icon="mdi-paperclip"
                            outlined
                            :show-size="1000"
                          >
                            <template v-slot:selection="{ index, text }">
                              <v-chip
                                v-if="index < 2"
                                color="primary"
                                dark
                                label
                                small
                              >
                                {{ text }}
                              </v-chip>

                              <span
                                v-else-if="index === 2"
                                class="
                                  text-overline
                                  grey--text
                                  text--darken-3
                                  mx-2
                                "
                              >
                                +{{ files.length - 2 }} File(s)
                              </span>
                            </template>
                          </v-file-input>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" @click="close"> {{ translate('Cancel') }} </v-btn>

                    <v-btn v-show="isCreateMode" color="primary" @click="uploadCSV">
                      {{ translate('Import') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ translate(formTitle) }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="12" lg="12">
                          <v-radio-group v-model="create_leads_data.salutation" row>
                            <v-radio label="Frau" value="frau"></v-radio>
                            <v-radio label="Herr" value="herr"></v-radio>
                          </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <v-text-field
                            v-model="create_leads_data.first_name"
                            :label="translate('First Name')"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <v-text-field
                            v-model="create_leads_data.last_name"
                            :label="translate('Last Name')"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <v-text-field
                            v-model="create_leads_data.email"
                            :label="translate('Email')"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <v-text-field
                            v-model="create_leads_data.phone"
                            :label="translate('Phone Nr.')"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="formated_date"
                                :label="translate('Birthday')"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="create_leads_data.birthday"
                              @input="menu2 = false"
                              append-inner-icon="mdi-calendar"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="create_leads_data.persons"
                            :label="translate('Persons')"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="create_leads_data.street_no"
                            :label="translate('Street') + ' Nr.'"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="create_leads_data.place"
                            :label="translate('Place')"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            v-model="create_leads_data.canton_id"
                            :label="translate('Canton')"
                            :items="canton_select"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <v-select
                            v-model="create_leads_data.client_type_id"
                            :label="translate('Type')"
                            :items="client_types"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                          <v-select
                            v-model="create_leads_data.lang"
                            :label="translate('Language')"
                            :items="lang_select"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            v-model="create_leads_data.source_id"
                            :label="translate('Source')"
                            :items="source_id"
                          ></v-select>
                        </v-col>
                        <!-- <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="create_leads_data.zip"
                            label="Zip"
                          ></v-text-field>
                        </v-col> -->
                        <!-- <v-col cols="12">
                          <v-select
                            :items="insurances_companies"
                            v-model="create_leads_data.company"
                            label="Insurance Company"
                          >
                          </v-select>
                        </v-col> -->
                        <v-col cols="12">
                          <v-select
                            :items="insurances_companies"
                            v-model="create_leads_data.company"
                            :label="translate('Actual Insurance')"
                          >
                          </v-select>
                        </v-col>
                        <v-col>
                          <v-select
                            :items="insurances_companies"
                            v-model="create_leads_data.kvg"
                            label="KVG"
                          >
                          </v-select>
                        </v-col>
                        <v-col>
                          <v-select
                            :items="insurances_companies"
                            v-model="create_leads_data.vvg"
                            label="VVG"
                          >
                          </v-select>
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
                      {{translate('Create lead')}}
                    </v-btn>
                    <v-btn
                      v-show="!isCreateMode"
                      color="blue darken-1"
                      text
                      @click="update"
                    >
                      {{translate('Update')}}
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
                      @click="deleteLeadsModalConfirm()"
                      class="btn btn-decline"
                      >{{translate('Confirm')}}</button
                  >
              </v-card-actions>
              </v-card>
          </v-dialog>
            </v-toolbar>
          </template>

          
          <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex">
              <v-btn icon @click="acceptLead(item)" v-if="isAdmin">
                  <svg width="20" height="20" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.2854 3.54275L11.1711 14.5999L6.77125 9.79979C6.34276 9.3426 5.62849 9.3141 5.14257 9.71409C4.68538 10.1426 4.65688 10.8568 5.05687 11.3428L10.2283 16.9999C10.4569 17.257 10.7712 17.3714 11.0855 17.3714C11.3713 17.3714 11.6284 17.2857 11.857 17.0856L24.8284 5.22846C25.2856 4.79997 25.3141 4.08571 24.9141 3.59979C24.4856 3.1426 23.7713 3.1141 23.2856 3.54259L23.2854 3.54275Z" fill="#1DD200"/>
                      <path d="M11.9999 24C18.6285 24 23.9999 18.6286 23.9999 12C23.9999 11.4286 23.9714 10.8857 23.8857 10.3428C23.8 9.71428 23.2286 9.28576 22.6001 9.37147C21.9715 9.45717 21.543 10.0286 21.6287 10.6571C21.6859 11.1143 21.7144 11.5715 21.7144 12C21.7144 17.3428 17.343 21.7143 12.0001 21.7143C6.65724 21.7143 2.28581 17.3428 2.28581 12C2.28581 6.65713 6.65724 2.2857 12.0001 2.2857C14.2859 2.2857 16.5144 3.0857 18.2572 4.57147C18.7429 4.97146 19.4572 4.91427 19.8572 4.42857C20.2572 3.94288 20.2 3.22857 19.7143 2.82862C17.5716 0.999847 14.8287 0 12 0C5.37143 0 0 5.37143 0 12C0 18.6286 5.37143 24 12 24L11.9999 24Z" fill="#1DD200"/>
                  </svg>
              </v-btn>
              <v-btn icon @click="declineLead(item)" v-if="isAdmin">
                  <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.4846 3.51416C18.2341 1.26392 15.1818 0 11.9995 0C8.81706 0 5.76502 1.26441 3.51441 3.5149C1.26416 5.76539 0 8.81749 0 12C0 15.1825 1.26416 18.2345 3.51441 20.4851C5.7649 22.7356 8.817 24 11.9995 24C15.182 24 18.2346 22.736 20.4846 20.4858C21.9815 19.0004 23.0592 17.1453 23.6076 15.1091C24.1562 13.0727 24.1562 10.9274 23.6076 8.89114C23.0592 6.85494 21.9815 4.99978 20.4846 3.51441V3.51416ZM16.0104 14.7942L16.0102 14.7944C16.1671 14.9582 16.2546 15.1761 16.2546 15.4028C16.2546 15.6298 16.1671 15.8477 16.0102 16.0115C15.8409 16.1645 15.6213 16.2499 15.3932 16.2516C15.1701 16.2497 14.9558 16.1641 14.7931 16.0115L11.9988 13.2171L9.20445 16.0115C9.04182 16.1641 8.82754 16.2497 8.6044 16.2516C8.37624 16.2499 8.15669 16.1645 7.98738 16.0115C7.83049 15.8477 7.74296 15.6298 7.74296 15.4028C7.74296 15.1761 7.83049 14.9582 7.98738 14.7944L10.7817 12.0001L7.98738 9.20571C7.65136 8.86969 7.65136 8.32463 7.98738 7.98863C8.3234 7.65263 8.86846 7.65261 9.20446 7.98863L11.9988 10.783L14.7932 7.98863C15.1292 7.65261 15.6742 7.65261 16.0102 7.98863C16.3462 8.32465 16.3463 8.86971 16.0102 9.20571L13.2159 12.0001L16.0104 14.7942Z" fill="#D20000"/>
                  </svg>
              </v-btn>
            </div>
          </template>

          <template v-slot:[`item.created_at`]="{ item }">
            <p class="mt-4">{{ item.created_at | moment("DD[.]MM[.]YYYY") }}</p>
          </template>

          <template v-slot:[`item.scheduled`]="{item}">
            <p v-if="item.scheduled_at">{{ item.scheduled_at.scheduled_at | moment("DD.MM.YYYY HH:mm") }}</p>
            <p v-else>No date</p>
          </template>

          <template v-slot:[`item.name_lastname`]="{ item }">
            <p style="cursor: pointer;" @click="$router.push('/leadsdetails/' + item.id)" class="mt-4">{{ item.first_name }} {{ item.last_name }}</p>
          </template>

          <template v-slot:[`item.agent`]="{ item }">
            <p class="mt-4" v-if="item.user">{{ item.user.first_name }} {{ item.user.last_name }}</p>
          </template>

          <template v-slot:[`item.first_name`]="{ item }">
            <span
              class="click"
              @click="$router.push('/leadsdetails/' + item.id)"
              >{{ item.first_name }}</span
            >
          </template>

          <template v-slot:[`item.last_name`]="{ item }">
            <span
              class="click"
              @click="$router.push('/leadsdetails/' + item.id)"
              >{{ item.last_name }}</span
            >
          </template>
        </v-data-table>
      </div>
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
  data: () => ({
    lead_calendar: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    lead_to_calendar: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    lead_menu: false,
    lead_to_menu: false,
    snackbar: {
      show: false,
      message: null,
      color: null,
    },

    isAdmin: localStorage.getItem('role') == 'admin',

    isCreateMode: true,
    selectedStatus: 0,
    search_string: "",

    dialog: false,
    importLeadDialog: false,
    dialogDelete: false,

    date_to: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu2: false,

    headers: [
      { text: 'Name & Lastname', value: 'name_lastname', width: "200px", show: true, scheduled: false },
      { text: "Created Date", value: "created_at", width: "200px", show: true, scheduled: false },
      { text: 'Agent', value: 'agent', width: "200px",show: true, scheduled: false },
      // { text: "Zip", value: "zip", width: "200px", show: true, scheduled: false },
      { text: "Place", value: "place", width: "200px", show: true, scheduled: false },
      { text: "Phone", value: "phone", width: "160px", show: true, scheduled: false },
      { text: "Info", value: "type.name", width: "160px", show: true, scheduled: false },
      { text: "Scheduled", value: "scheduled", width: "160px", scheduled: true },
      { text: "Actions", value: "actions", sortable: false, width: "100px", show: false, scheduled: false },
    ],

    data: [],

    files: '',

    loading: true,
    options: {},
    totalLeadsTable: 0,

    create_leads_data: {
      user_id: "",
      salutation: "frau",
      first_name: "",
      last_name: "",
      email: "",
      birthday: "",
      street_no: "",
      zip: "",
      place: "",
      persons: "",
      company: '',
      actual_company: '',
      fax: "",
      phone: "",
      status_id: 1,
      client_type_id: "1",
      canton_id: "",
      source_id: "",
      lang: "",
      kvg_id: "",
      vvg_id: ""
    },

    get_item_data: [],

    lead_status_data: [],
    create_lead_note_data: {
      user_id: "",
      lead_id: "",
      note: "",
    },

    client_types: [],

    canton_select: [],
    lang_select: [],
    source_id: [],

    deleteItemId: 0,
    updateLeadsId: 0,

    defaultItem: {
      user_id: "",
      salutation: "frau",
      first_name: "",
      last_name: "",
      email: "",
      birthday: "",
      street_no: "",
      zip: "",
      place: "",
      persons: "",
      company: "",
      fax: "",
      phone: "",
      status_id: "",
      client_type_id: "1",
      canton_id: "",
      source_id: "",
      lang: "",
    },

    start_date_filter: '',
    end_date_filter: '',

    dialogAcceptLead: false,
    deleteDialog: false,
    itemId: null,
    itemEmail: null,

    insurances_companies: []
  }),

  components: {
    SnackBar
  },  

  computed: {
    formTitle() {
      return this.isCreateMode === true ? "New Lead" : "Update Lead";
    },
    lead_calendar_needs_format(){
        if (!this.lead_calendar) return null

        const [year, month, day] = this.lead_calendar.split('-')
        return `${day}.${month}.${year}`
    },
    lead_to_calendar_needs_format() {
      if (!this.date_to) return null

      const [year, month, day] = this.date_to.split('-')
      return `${day}.${month}.${year}`
    },
    formated_date(){
      if (!this.create_leads_data.birthday) return null

      const [year, month, day] = this.create_leads_data.birthday.split('-')
      return `${day}.${month}.${year}`
    },
    filteredHeaders(){
      let filtered;

        switch (this.selectedStatus) {
          case 15:
            this.isAdmin
             ? filtered = this.headers.filter(h => !h.scheduled)
             :  filtered = this.headers.filter(h => h.show)
             break;
          case 2: case 8: case 13:
            filtered = this.headers.filter(h => h.show || h.scheduled);
            console.log(filtered);
            break;
          default:
            filtered = this.headers.filter(h => h.show)
            break;
        }

        return filtered
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    selectedStatus(val) {
        this.getLeadsDatatable(val);
    },
    search_string: {
      handler() {
        this.getLeadsDatatable();
      },
      deep: true,
    },
    options: {
      handler() {
        this.getLeadsDatatable();
      },
      deep: true,
    },
    lead_calendar(val) {
      this.start_date_filter = val;
      this.getLeadsDatatable();
    },
    lead_to_calendar(val) {
      this.end_date_filter = val;
      this.getLeadsDatatable();
    }
  },

  mounted() {
    this.getLeadsDatatable();
    this.getClientTypes();
    this.getLeadStatuses();
    this.getCantonSelect();
    this.getLangSelect();
    this.getSourceSelect();

    this.headers.forEach((h, index) => {
        this.headers[index].text = this.translate(h.text);
        console.log('asdasd')
    })

    axios.get('/insurances').then(response => {
      const insurances = response.data.data;
      let insurances_names = [];

      insurances.forEach(i => {
        const insurances_info = {
          text: i.name,
          value: i.id
        };

        insurances_names = [...insurances_names, insurances_info]
      })

      this.insurances_companies = insurances_names;
    })

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

    createDefaultApplications(data) {

      axios.post("application/add", data)
           .then(response => console.log(response.data))
           .catch(err => console.log(err));
    },
    
    acceptLead(item){
      this.itemId = item.id;
      this.itemEmail = item.email;
      this.dialogAcceptLead = true;
    },

    declineLead(item){
      this.itemId = item.id;
      this.deleteDialog = true;
    },

    acceptLeadCustomer(){
      axios.put('/leadstatus/'+this.itemId, {
        id: this.itemId,
        email: this.itemEmail,
        status: 15,
        shouldCustomer: true
      })
      .then((response) => {
        console.log(response.data);
        const addedCustomer = response.data.customer;

        const create_data_contract = {
          customer_id: addedCustomer.id,
          insurance_id: addedCustomer.kvg_id,
          sent_on: addedCustomer.created_at,
          status_id: 1,
          category_id: 1,
        }

        axios
          .post("/contract", create_data_contract)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

        const userId = JSON.parse(localStorage.getItem('user')).id;

        const create_data_applications = {
          customer_id: addedCustomer.id,
          user_id: userId,
          insurance_id: addedCustomer.kvg_id,
          status_id: 1,
        }

        this.createDefaultApplications(create_data_applications);

        this.getLeadsDatatable();
        this.itemId = null;
        this.itemEmail = null;
      })
      .catch(error => console.log(error));

      this.dialogAcceptLead = false;
    },

    declineLeadCustomer(){
      axios.delete('/lead/'+this.itemId, {
        id: this.itemId
      })
      .then(() => {
        this.getLeadsDatatable();
      })
      .catch(err => console.log(err));

      this.deleteDialog = false;
    },

    getLeadStatuses() {
      this.lead_status_data.push({
        text: "All Leads",
        value: "",
      });

      axios
        .get("/leadstatus")
        .then((response) => {
          for (let $i = 0; response.data.length > 0; $i++) {
            this.lead_status_data.push({
              text: response.data[$i].en,
              value: response.data[$i].id,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getCustomLeadsDatatable() {
      this.loading = true;
      
      axios
        .get('/download_document')
        .then(response => {
          console.log(response.data);
        })
        .catch(response => {
          console.log(response)
        })

      // fetch(`http://clienza.test/api/leads_filter/${val}`, {method: 'get'}).then(response => {
      //   console.log(response)
      // })

      // axios
      //   .get(`/leads_filter/${val}`).then(response => {
      //       console.log(response.data);
      //       this.data = response.data.data;
      //       this.totalLeadsTable = response.data.total;
      //       this.loading = false;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },

    uploadCSV() {
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }

      let formData = new FormData();
      formData.append('file', this.files[0]);

      axios
          .post('/admin/import/lead', formData, config)
          .then((response) => {
            this.importLeadDialog = false;

            this.snackbar = {
              message: response.data.message,
              color: "success",
              show: true,
              error: false
            };

            this.$refs.snackbar.toggleSnackbar();

            this.getLeadsDatatable()
          })
          .catch((error) => {
            console.log(error)
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

    getLeadsDatatable() {
      this.loading = true;
      const { sortBy, sortDesc, page, itemsPerPage } = this.options;

      let sortType;
      sortType = "asc";
      if (sortDesc[0]) {
        sortType = "desc";
      }

     this.$nextTick(() => {
      axios
        .get("/lead/datatable?term=" + this.search_string + "&start_date=" + this.start_date_filter + "&end_date=" + this.end_date_filter, {
          params: {
            sort_by: sortBy[0],
            sort: sortType,
            page: page,
            per_page: itemsPerPage,
            status_id: this.selectedStatus,
            from_date: this.start_date_filter,
            to_date: this.end_date_filter 
          },
        })
        .then((response) => {

          console.log(response.data)
          this.data = response.data.data;
          this.totalLeadsTable = response.data.total;
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
     })
    },

    createLeads() {
      const getUserId = JSON.parse(localStorage.getItem('user')).id;

      axios
        .post("/lead", {
          user_id: getUserId,
          salutation: this.create_leads_data.salutation,
          first_name: this.create_leads_data.first_name,
          last_name: this.create_leads_data.last_name,
          email: this.create_leads_data.email,
          birthday: this.create_leads_data.birthday,
          street_no: this.create_leads_data.street_no,
          zip: this.create_leads_data.zip,
          place: this.create_leads_data.place,
          persons: this.create_leads_data.persons,
          company: this.create_leads_data.company,
          fax: this.create_leads_data.fax,
          phone: this.create_leads_data.phone,
          status_id: 1,
          client_type_id: this.create_leads_data.client_type_id,
          canton_id: this.create_leads_data.canton_id,
          source_id: this.create_leads_data.source_id,
          lang: this.create_leads_data.lang,
          kvg_id: this.create_leads_data.kvg,
          vvg_id: this.create_leads_data.vvg,
          franchise_id: this.create_leads_data.company,
        })
        .then((response) => {
          console.log('RESPONSE' , response);
          this.create_leads_data = {};
          this.snackbar = {
            message: response.data.message,
            color: "success",
            show: true,
            error: false
          };

          this.$refs.snackbar.toggleSnackbar();
        })
        .catch((error) => {
          this.snackbar = {
            message: error.response.data.message,
            error: true
          };

          this.$refs.snackbar.toggleSnackbar();
        });
    },

    getLeads(itemId) {
      axios
        .get("/lead/" + itemId)
        .then((response) => {
          this.create_leads_data = {};

          this.get_item_data.push(response.data.data);

          this.create_leads_data.user_id = response.data.data.user_id;
          this.create_leads_data.salutation = response.data.data.salutation;
          this.create_leads_data.first_name = response.data.data.first_name;
          this.create_leads_data.last_name = response.data.data.last_name;
          this.create_leads_data.email = response.data.data.email;
          this.create_leads_data.birthday = response.data.data.birthday;
          this.create_leads_data.street_no = response.data.data.street_no;
          this.create_leads_data.zip = response.data.data.zip;
          this.create_leads_data.place = response.data.data.place;
          this.create_leads_data.persons = response.data.data.persons;
          this.create_leads_data.company = response.data.data.company;
          this.create_leads_data.fax = response.data.data.fax;
          this.create_leads_data.phone = response.data.data.phone;
          this.create_leads_data.status_id = response.data.data.status_id;
          this.crete_leads_data.client_type_id =
          response.data.data.client_type_id;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateLeads(itemId) {
      axios
        .put("/lead/" + itemId, this.create_leads_data)
        .then((response) => {
          this.snackbar = {
            message: response.data.message,
            color: "success",
            show: true,
            error: false
          };

          this.$refs.snackbar.toggleSnackbar();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteItem(itemId) {
      axios
        .delete("/lead/" + itemId)
        .then((response) => {
          this.snackbar = {
            message: response.data.message,
            color: "success",
            show: true,
            error: false
          };

          this.$refs.snackbar.toggleSnackbar();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    openDialog() {
      this.create_leads_data = this.defaultItem;
      this.isCreateMode = true;
      this.dialog = true;
    },

    openImportDialog() {
      this.importLeadDialog = true;
    },

    editLeads(item) {
      this.isCreateMode = false;
      this.getLeads(item.id);
      this.updateLeadsId = item.id;
      this.dialog = true;
    },

    deleteLeadsModal(item) {
      this.deleteItemId = item.id;
      this.dialogDelete = true;
    },

    deleteLeadsModalConfirm() {
      this.closeDelete();
      this.deleteItem(this.deleteItemId);
      this.getLeadsDatatable();
    },

    close() {
      this.dialog = false;
      this.importLeadDialog = false;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    save() {
      this.close();
      this.createLeads();
      this.getLeadsDatatable();
    },

    update() {
      this.close();
      this.updateLeads(this.updateLeadsId);
      this.getLeadsDatatable();
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

    downloadSampleList() {
      window.open("https://1drv.ms/x/s!AtmgCOPp7P6ZgX-cj4qxpjsr9ilG?e=2bHK7h" , "_blank")
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mulish&display=swap");

.v-main__wrap {
  font-family: "Mulish", sans-serif;
}

tbody tr:nth-of-type(odd) {
  background-color: #f7fcfe;
}

.v-data-table {
  border-radius: 10px;
}

.v-data-table tr td {
  border: none !important;
}

.lead-buttons {
  background: #36a5dd !important;
  color: #fff;
  box-shadow: none;
}

.theme--light.v-list.status {
  background: #e5eff5;
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