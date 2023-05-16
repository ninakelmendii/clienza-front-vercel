<template>
  <v-row>
    <v-col>
      <v-card outlined rounded class="card-stats">
        <v-row>
          <v-col color="primary" cols="12">
            <v-list-item-title class="text-p mb-1 stats-inner-card mb-5">
              <span class="stats-title">Notifications</span>
              <v-row>
                <v-col cols="5">
                  <h2 class="font-weight-bold counter">{{ notifications }}</h2>
                </v-col>

                <v-col cols="7">
                  <v-icon class="arrow" color="#FF6968">mdi-arrow-right</v-icon>
                </v-col>
              </v-row>
            </v-list-item-title>

            <v-list-item-title class="text-p mb-1 stats-inner-card mb-3">
              <span class="stats-title">News</span>
              <v-row>
                <v-col cols="5">
                  <h2 class="font-weight-bold counter">{{ notifications }}</h2>
                </v-col>

                <v-col cols="7">
                  <v-icon class="arrow" color="#FF6968">mdi-arrow-right</v-icon>
                </v-col>
              </v-row>
            </v-list-item-title>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
  name: "UserCard",

  data() {
    return {
      notifications: '',
      news: '',
    };
  },

  methods: {
    getNotifications() {
      axios
        .get("/notifications")
        .then((response) => {
          console.log('notifications', response.data)
          this.notifications = response.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted(){
    this.getNotifications();
  }
};
</script>

<style scoped>
.theme--light .stats-title {
  color: rgba(0, 0, 0, 0.76);
  font-size: 20px;
}

.theme--dark .stats-title {
  font-size: 20px;
}

.counter {
  font-size: 36px;
  display: flex;
  justify-content: center;
}

.stats-inner-card {
  padding: 15px;
}

.card-stats {
  padding: 35px;
  border-radius: 30px !important;
  border: none;
}

.arrow {
  font-size: 50px;
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>