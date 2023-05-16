<template>
  <v-row>
    <v-col cols="12" md="12" lg="12">
      <v-data-table
        :headers="headers"
        :items="data"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalCustomersTable"
        :footer-props="{'items-per-page-text':translate('Rows per page'), 'items-per-page-all-text':translate('All')}"
      >
        <template v-slot:no-data>
          {{translate('No data available')}}
        </template>
        <template v-slot:loading>
          {{translate('Loading items')}}...
        </template>
    </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import * as LANGUAGE from '../../store/language.json';

export default {
  data() {
    return {
      loading: true,
      totalCustomersTable: 0,
      options: {},
      headers: [
        {
          text: this.translate("Date"),
          align: "start",
          value: "date",
        },
        { text: this.translate("Task name"), value: "name" },
        { text: this.translate("Note"), value: "note" },
        { text: this.translate("Actions"), value: "actions" },
      ],
      data: [],
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
    getTasksDatatable() {
      axios
        .get("/task/datatable")
        .then((response) => {
          for (let $i = 0; response.data.data.length > 0; $i++) {
            this.data.push({
              date: response.data.data[$i].date,
              name: response.data.data[$i].name,
              note: response.data.data[$i].note,
            });
            this.totalCustomersTable = response.data.total;

            this.loading = false;

            this.$nextTick(() => {
              const currentEl = this.$el.querySelector(".v-data-footer__pagination");
              const translated = currentEl.innerHTML.replace("of", this.translate("of"));

              currentEl.innerHTML = translated;
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.getTasksDatatable();
  },
};
</script>

<style scoped>
tbody tr:nth-of-type(odd) {
  background-color: #f7fcfe;
}

.v-data-table {
  border-radius: 10px;
}

.v-data-table tr td {
  border: none !important;
}
</style>