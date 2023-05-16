import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import navBar from "./modules/navBar";
import profileImage from "./modules/profileImage";
import * as LANGUAGE from './language.json';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("user") || null,
    lead_index: 0,
    language: 'german',
    translations: LANGUAGE
  },

  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
  },

  mutation: {
    retrieveToken(state, token) {
      state.token = token;
    },
    resetToken(state){
      state.token = null;
    },
  },

  retrieveMode(state, darkMode) {
    state.darkMode = darkMode;
  },

  actions: {
    getItem(context, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("/login", {
            email: credentials.email,
            password: credentials.password,
          })
          .then((result) => {
            if (result.data.success === true) {
              const token = JSON.stringify(result.data.data.token);
              const user = JSON.stringify(result.data.data.user);
              (this.state.token = token), localStorage.setItem("token", token);
              localStorage.setItem("user", user);
            }
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

    nextLead({state}) {
      state.lead_index = state.lead_index + 1; 
    },

    prevLead({state}) {
      state.lead_index = state.lead_index - 1; 
    },

    changeLanguage({ state }, value){
      state.language = value.toLowerCase();
    },

    toggleLanguage({ state }) {
      state.language = state.language == 'german' ? 'english' : 'german';
    },

    getTranslation({ state }, word){
      // const findMatch = LANGUAGE.find(lng => lng.english.toLowerCase() == word.toLowerCase());

      return new Promise((resolve) => {
        let wordIndex = null;
        LANGUAGE.forEach((lng, index) => {
          if(lng.english.toLowerCase() == word.toLowerCase()) {
            wordIndex = index;
          }
        });

        if(wordIndex === null) {
          return resolve(word);
        }

        if(state.language == 'german') {
          return resolve(LANGUAGE[wordIndex].german);
        } else {
          return resolve(LANGUAGE[wordIndex].english);
        }
      })
    },

    logOut(context) {
      localStorage.clear();
      context.state.token = null;

      axios
          .post('/logout')
          .then((response) => {
            console.log('logged out' + response);
          })
          .catch((error) => {
            console.log(error)
          })
      },
    },

  userRegister(context, credentials) {
    return new Promise((resolve) => {
      axios
        .get("register", {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        })
        .then((result) => {
          if (result.data.success === true) {
            resolve(result);
            this.$router.push({
              path: "/login",
            });
          }
        });
    });
  },
  modules: {
    navBar,
    profileImage
  }
});

export default store;
