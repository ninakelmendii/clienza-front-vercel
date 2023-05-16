<template>
  <v-container fill-height fluid>
    <SnackBar :data="snackbar" ref="snackbar"></SnackBar>
    <v-row align-self="center" justify="center">
      <v-col cols="12" xs="12" sm="12" md="6" lg="6">
        <v-row class="d-flex justify-center">
          <v-col cols="12" xs="12" sm="12" md="6" lg="6">
            <div class="d-flex justify-center">
              <v-img
                  src="@/assets/images/logo-login.png"
                  max-width="120"
              ></v-img>
            </div>
            <v-form class="mt-15" ref="form">
              <v-text-field
                  v-model="email"
                  :label="translate('Email')"
                  type="email"
                  clearable
                  required
                  flat
                  filled
                  background-color="#fff"
                  prepend-inner-icon="mdi-account-outline"
              ></v-text-field>

              <v-row class="mb-3" no-gutters>
                <v-col cols="12">
                  <v-btn block x-large color="#1a1f3a" @click="resetPassword">
                    {{ translate('Reset Password') }}
                  </v-btn>
                </v-col>

                <v-col cols="6" class="d-flex align-center mt-4">
                  <router-link to="/login">{{ translate('Log In') }}</router-link>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import axios from 'axios'
import * as LANGUAGE from '../../store/language.json';
import SnackBar from '../Snackbar/SnackBar.vue';

export default {
  name: "LoginComponent",
  data() {
    return {
      snackbar: {
        show: false,
        message: null,
        color: null,
      },
      email: "",
    };
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
    resetPassword() {
      axios
        .post('/forgot-password', {
          email: this.email
        })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          this.snackbar = {
            message: error.response.data.message,
            color: "error",
            error: true,
          };

          this.$refs.snackbar.toggleSnackbar(true);
        })
    }
  },

  components: {
    SnackBar
  }
};
</script>

<style scoped>
.image {
  background-color: red;
}

button {
  color: #fff !important;
}
</style>