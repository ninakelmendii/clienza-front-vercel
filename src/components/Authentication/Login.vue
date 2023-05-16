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
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                required
                flat
                :append-icon="show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                filled
                background-color="#fff"
                prepend-inner-icon="mdi-lock-outline"
              ></v-text-field>

              <v-row class="mb-3">
                <v-col cols="6">
                  <v-checkbox
                    v-model="checkbox"
                    :label="translate('Remember me')"
                    required
                    color="#1a1f3a"
                  ></v-checkbox>
                </v-col>

                <v-col cols="6" class="d-flex justify-end">
                  <router-link to="/resetpassword" class="mt-5"
                    >{{ translate('Reset password') }}</router-link
                  >
                </v-col>
              </v-row>

              <v-btn block x-large color="#1a1f3a" @click="login">
                {{ translate("Log in") }}
              </v-btn>
            </v-form>

            <h4 class="mt-10 text-center">
              {{ translate("Don't have an account?") }}
              <router-link to="/register">{{ translate("Sign up") }}</router-link>
            </h4>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as LANGUAGE from '../../store/language.json';
import SnackBar from '../Snackbar/SnackBar.vue';

export default {
  name: "LoginComponent",
  data() {
    return {
      snackbar: {
        show: false,
        message: "",
        color: null,
      },

      url: 'https://crmclienza.ch/',
      checkbox: false,
      show: false,
      email: "",
      password: "",
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
    login() {
      this.$store
        .dispatch("getItem", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {

          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("user", JSON.stringify(response.data.data));
          localStorage.setItem("role", JSON.stringify(response.data.role))

          window.location.href = this.url;

        })
        .catch((error) => {
          this.snackbar = {
            message: error.response.data.message,
            color: "error",
            error: true,
          };

          this.$refs.snackbar.toggleSnackbar(true);
        });
    },
  },

  goToRegister() {
    this.$router.push("/register");
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