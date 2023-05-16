<template>
    <v-container>
      <v-row>
      <SnackBar :data="snackbar" ref="snackbar"></SnackBar>
        <v-col cols="12" md="12" lg="12" style="padding: 0;">
          <v-card>
              <v-row>
                  <v-col cols="12" md="12" class="d-flex align-center">
                      <h2 style="display: flex; align-items: center;">{{ translate('No consultation') }}:</h2>
                  </v-col>
              </v-row>
  
              <v-card-text>
                  <v-container>
                      <v-row>
                          <v-col cols="12" sm="12" md="12">
                            <v-textarea
                              :label="translate('Reason')"
                              outlined
                              v-model="beratung.text"
                            ></v-textarea>
                          </v-col>
                          <v-col cols="12" sm="12" md="12">
                            <v-file-input
                              v-model="beratung.file"
                              :label="translate('Choose a file')"
                              accept=".pdf,.doc,.docx,.txt"
                              @change="onFileSelected"
                            ></v-file-input>
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
                  color="blue darken-1"
                  text
                  @click="submit"
                >
                  {{translate("Create")}}
                </v-btn>
              </v-card-actions>
          </v-card>
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
        beratung: {
          text: '',
          file: null,
        }
      };
    },
    props: ['close', 'item'],
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
      onFileSelected(event) {
        this.beratung.file = event
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
        if(this.beratung.text === '') {
          this.showSnackBar(this.translate('Please fill in the text field'), true)
          return false;
        }
        if(this.beratung.file === '') {
          this.showSnackBar(this.translate('Please choose file'), true)
          return false;
        }
        const formData = new FormData();
        formData.append('consultationDescription', this.beratung.text);
        formData.append('consultationFile', this.beratung.file);
        axios
          .post(`/feedback/consultation/${this.$route.params.id}`, formData)
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
        if(this.item.consultationFile || this.item.consultationFeedback) {
          this.beratung.file = this.item.consultationFile;
          this.beratung.text = this.item.consultationFeedback;
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
