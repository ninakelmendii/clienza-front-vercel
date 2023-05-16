<template>
    <v-container>
      <v-row>
      <SnackBar :data="snackbar" ref="snackbar"></SnackBar>
        <v-col cols="12" md="12" lg="12">
          <v-row>
            <v-card>
                <v-row>
                    <v-col cols="12" md="12" class="d-flex align-center">
                        <h2 style="display: flex; align-items: center;">{{translate('Follow-up date on')}}</h2>
                    </v-col>
                </v-row>
    
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
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
                                        v-model="folgeTermin.date"
                                        :label="translate('Date')"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="folgeTermin.date"
                                        no-title
                                        scrollable
                                        @input="datepickermenu = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    v-model="folgeTermin.stunde"
                                    :label="translate('Hour')"
                                    type="number"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    v-model="folgeTermin.minute"
                                    :label="translate('Minute')"
                                    type="number"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close()">
                    {{ translate('Cancel') }}
                  </v-btn>

                  <v-btn
                    color="blue darken-1"
                    text
                    @click="submit"
                  >
                    {{translate("Create")}}
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
import * as LANGUAGE from '../../store/language.json';
import SnackBar from "../Snackbar/SnackBar.vue";
  
  export default {
    data() {
      return {
        snackbar: {
          show: false,
          message: "",
          color: null,
        },
        datepickermenu: false,
        folgeTermin: {
            date: '',
            stunde: '',
            minute: '',
        }
      };
    },
    props: ['close', 'item'],
    methods: {
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      },
      formatHour(date) {
        const options = { hour: 'numeric', hour12: false };
        return parseInt(new Date(date).toLocaleTimeString(undefined, options)).toString();
      },
      formatMinute(date) {
        const options = { minute: 'numeric' };
        return parseInt(new Date(date).toLocaleDateString(undefined, options)).toString()
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
      showSnackBar(text,error) {
        this.snackbar = {
            message: text,
            color: error,
            error: error ? true : false,
          };
          this.$refs.snackbar.toggleSnackbar(true);
      },
      submit() {
        if(this.folgeTermin.date === '') {
          this.showSnackBar(this.translate('Please fill in the date field'), true)
          return false;
        }
        if(this.folgeTermin.stunde === '') {
          this.showSnackBar(this.translate('Please fill in the hour field'), true)
          return false;
        }
        if(this.folgeTermin.minute === '') {
          this.showSnackBar(this.translate('Please fill in the minute field'), true)
          return false;
        }
        axios
          .post(`/follow-up/appointment/${this.$route.params.id}?date=${this.folgeTermin.date}&hour=${this.folgeTermin.stunde}&minute=${this.folgeTermin.minute}`)
          .then((response) => {
            if(response.data) {
              this.close();
              this.showSnackBar(this.translate("Success"), false)
            }
          })
          .catch((error) => {
            this.showSnackBar(error.response.data.message, true)
          });
      },
      getItem() {
        if(this.item.followUpAppointment) {
          this.folgeTermin.date = this.formatDate(this.item.followUpAppointment);
          this.folgeTermin.stunde = this.formatHour(this.item.followUpAppointment);
          this.folgeTermin.minute = this.formatMinute(this.item.followUpAppointment);
        }
      }
    },
    mounted() {
      this.getItem();
    },
    components: {
      SnackBar
    },
  };
  </script>
  
<style scoped>
    .v-card {
        overflow: hidden;
    }
    h2 {
        font-family: "PT Sans", sans-serif;
        margin: 30px auto 0;
    }
</style>
