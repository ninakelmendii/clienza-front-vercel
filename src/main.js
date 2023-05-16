import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueApexCharts from "vue-apexcharts";
import VueToastr from "vue-toastr";
import VueMoment from "vue-moment";
import helpers from "./helpers/helper"
import DatetimePicker from 'vuetify-datetime-picker'
import uploader from 'vuejs-uploader'

Vue.use(DatetimePicker)
Vue.use(VueApexCharts);
Vue.use(uploader);


Vue.component("ApexChart", VueApexCharts);

// axios.defaults.baseURL = "https://back.clienza.ch/api/";
// axios.defaults.baseURL = "https://clienza-api.rockapps.pw/api/";
// axios.defaults.baseURL = "https://back.crmclienza.ch/api/";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + JSON.parse(localStorage.getItem("token"));

Vue.use(VueToastr);

Vue.config.productionTip = false;

//https://stackoverflow.com/questions/42613061/vue-js-making-helper-functions-globally-available-to-single-file-components
const helperPlugin = {
  install () {
    Vue.helperPlugin = helpers
    Vue.prototype.$helperPlugin = helpers
  }
}

Vue.use(helperPlugin)

new Vue({
  router,
  store,
  vuetify,
  axios,
  VueMoment,
  render: (h) => h(App),
}).$mount("#app");
