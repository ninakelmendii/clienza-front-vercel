
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" class="dashboard-header">
            <div class="d-flex w-full">
              <NavbarControl />
              <h2>{{ translate(title) }}</h2>
            </div>
          </v-col>

          <v-row>
            <v-col class="d-flex" cols="12" xs="12" sm="12" md="6" lg="6">
              <UserCard />
            </v-col>

            <v-col class="d-flex" cols="12" xs="12" sm="12" md="6" lg="6">
              <StatsCard />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6">
              <StatisticsLine mode="single" />
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6">
              <StatisticsTopFive />
            </v-col>
          </v-row>
        </v-row>
      </v-col>

      <v-col cols="12" md="8" lg="8" class="d-flex justify-start customers-table">
        <h2 class="mt-5">{{ translate('Customers') }}</h2>
      </v-col>

      <v-col cols="12" md="12" lg="12" class="customers-table">
        <CustomersTable />
      </v-col>
      
      <v-col cols="12" md="12" lg="12" class="calendar-widget">
        <CalendarWidget />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserCard from "./UserCard.vue";
import StatsCard from "./StatsCard.vue";
import NavbarControl from "../Navbar/NavbarControl.vue";
import CustomersTable from "../Customers/CustomersTable.vue";
import CalendarWidget from "./CalendarWidget.vue";
import * as LANGUAGE from '../../store/language.json';
import StatisticsLine from "../Statistics/StatisticsLine.vue";
import StatisticsTopFive from "../Statistics/StatisticsTopFive.vue";

export default {
  name: "DashBoard",
  data() {
    return {
      title: "Dashboard",
      search: "",
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
  },

  components: {
    UserCard,
    StatsCard,
    CustomersTable,
    CalendarWidget,
    NavbarControl,
    StatisticsLine,
    StatisticsTopFive
  },

  mounted() {
    this.getStatus();
  },
};
</script>

<style scoped>
@import url("@/assets/style/style.css");

.calendar{
  margin-top: 110px;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.dashboard-header {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;
}

.calendar-widget {
  display: none !important;
  padding: 24px 0;
}

@media only screen and (max-width: 900px) {
  .dashboard-header > * {
    flex-grow: 1;
  }

  .second-navbar-toggler {
    display: block !important;
  }

  .w-full {
    width: 100%;
  }

  .customers-table {
    display: none !important;
  }

  .calendar-widget {
    display: block !important;
  }
}
</style>
