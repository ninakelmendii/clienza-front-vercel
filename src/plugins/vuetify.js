import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#36a5dd",
        secondary: "#383748"
      },
      dark: {
        primary: "#36a5dd",
      },
    },
  },
});
