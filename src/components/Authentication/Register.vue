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
                v-model="first_name"
                :label="translate('First Name')"
                type="text"
                clearable
                required
                flat
                filled
                background-color="#fff"
                prepend-inner-icon="mdi-account-outline"
              ></v-text-field>

              <v-text-field
                v-model="last_name"
                :label="translate('Last Name')"
                type="text"
                clearable
                required
                flat
                filled
                background-color="#fff"
                prepend-inner-icon="mdi-account-outline"
              ></v-text-field>

              <v-text-field
                v-model="email"
                :label="translate('Your email')"
                type="email"
                clearable
                required
                flat
                filled
                background-color="#fff"
                prepend-inner-icon="mdi-email-outline"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :label="translate('Password')"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                required
                flat
                :append-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                filled
                background-color="#fff"
                prepend-inner-icon="mdi-lock-outline"
              ></v-text-field>

              <v-text-field
                v-model="password_confirmation"
                :label="translate('Repeat Password')"
                :type="showConfirmPassword ? 'text' : 'password'"
                @click:append="showConfirmPassword = !showConfirmPassword"
                required
                flat
                :append-icon="showConfirmPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                filled
                background-color="#fff"
                prepend-inner-icon="mdi-lock-outline"
              ></v-text-field>
              <v-btn block x-large color="#1a1f3a" @click="register">
                {{ translate('Sign Up') }}
              </v-btn>
            </v-form>

            <h4 class="mt-10 text-center">
              {{ translate('Already registered?') }}
              <router-link to="/login">{{ translate('Log in') }}</router-link>
            </h4>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import * as LANGUAGE from '../../store/language.json';
import SnackBar from "../Snackbar/SnackBar.vue";

export default {
  name: "LoginComponent",
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      snackbar: {
        show: false,
        message: null,
        color: null,
      },
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirmation: "",
      approved: 0,
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
    register() {
      axios
        .post("/register", {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          approved: this.approved,
        })
        .then((response) => {
          this.$router.push({
            path: "/login",
          });
          console.log(response.data);
        })
        .catch((error) => {
          console.log("test", error);
          this.snackbar = {
            message: error.response.data.message,
            color: "error",
            error: true,
          };

          this.$refs.snackbar.toggleSnackbar(true);
        });
    },
  },
  components: {
    SnackBar
  }
};
</script>

<style scoped>
button {
  color: #fff !important;
}
</style>