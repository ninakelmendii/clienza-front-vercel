<template>
    <v-container>
      <v-row>
        <SnackBar :data="snackbar" ref="snackbar"></SnackBar>
        <v-col cols="12" md="12" lg="12" style="padding: 0;">
          <v-card>
              <v-row>
                  <v-col cols="12" md="12" class="d-flex align-center">
                      <h2 style="display: flex; align-items: center;">{{ translate('Enter Note') }}:</h2>
                  </v-col>
              </v-row>
  
              <v-card-text>
                  <v-container>
                      <v-row>
                          <v-col cols="12" sm="12" md="12">
                            <v-textarea
                              :label="translate('Describe type of disease')"
                              outlined
                              v-model="behandlung.text"
                            ></v-textarea>
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
        behandlung: {
          text: '',
        }
      };
    },
    props: ['close', 'item'],
    methods: {
      showSnackBar(text,error) {
        this.snackbar = {
            message: text,
            color: error,
            error: error ? true : false,
          };
          this.$refs.snackbar.toggleSnackbar(true);
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
      submit() {
        if(this.behandlung.text === '') {
          this.showSnackBar(this.translate('Please fill in the note field'), true)
          return false;
        }
        const formData = new FormData();
        formData.append("note", this.behandlung.text);
        axios
          .post(`/feedback/note/${this.$route.params.id}`, formData)
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
        if(this.item.recordNote) {
          this.behandlung.text = this.item.recordNote;
        }
      }
    },
    mounted() {
      this.getItem();
    },
    components: { SnackBar },
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
