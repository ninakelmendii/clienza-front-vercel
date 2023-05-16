<template>
  <v-row>
    <v-col>
      <v-card outlined rounded class="card-stats">
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="6">
                <v-list-item-title class="text-p mb-1 stats-inner-card">
                  <span class="stats-title"
                    >{{ translate('New Leads') }}
                    <h2 class="font-weight-bold stats">{{ newLeads }}</h2></span
                  >
                </v-list-item-title>
              </v-col>

              <v-col cols="6">
                <v-list-item-title class="text-p mb-1 stats-inner-card">
                  <span class="stats-title"
                    >{{ translate('Callbacks') }}
                    <h2 class="font-weight-bold stats">
                      {{ callBacks }}
                    </h2></span
                  >
                </v-list-item-title>
              </v-col>

              <v-col cols="6">
                <v-list-item-title class="text-p mb-1 stats-inner-card">
                  <span class="stats-title"
                    >{{ translate('Completed') }}
                    <h2 class="font-weight-bold stats">
                      {{ totalLeads }}
                    </h2></span
                  >
                </v-list-item-title>
              </v-col>

              <v-col cols="6">
                <v-list-item-title class="text-p mb-1 stats-inner-card">
                  <span class="stats-title"
                    >{{ translate('Total Leads') }}
                    <h2 class="font-weight-bold stats">
                      {{ totalLeads }}
                    </h2></span
                  >
                </v-list-item-title>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import * as LANGUAGE from '../../store/language.json';

export default {
  name: "UserCard",

  data() {
    return {
      newLeads: 0,
      callBacks: 0,
      pendingIssues: 0,
      totalLeads: 0,
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
    getLeadsStatistics() {
      axios
        .get("/sale/dashboard")
        .then((result) => {
          console.log(result);
          let stats = result.data.data.leads;

          this.newLeads = stats.new;
          this.callBacks = stats.callbacks;
          this.totalLeads = stats.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.getLeadsStatistics();
  },
};
</script>

<style scoped>
.theme--light .stats-title {
  color: rgba(0, 0, 0, 0.76);
  font-size: 16px;
}

.stats {
  font-size: 30px;
}

.theme--light .stats-inner-card {
  background: #f4f4fc;
  border-radius: 8px;
  padding: 15px;
}

.theme--dark .stats-inner-card {
  background: rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 15px;
}

.card-stats {
  padding: 34px;
  border-radius: 10px !important;
  border: none;
}

span.this-week {
  font-weight: 400;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.56);
}

.v-divider {
    border-color: rgba(255, 255, 255, 1);
    border: solid 1px #fff;
}
</style>