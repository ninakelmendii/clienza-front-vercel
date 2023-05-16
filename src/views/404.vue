<template>
  <v-container class="container">
    <v-row class="d-flex justify-center">
      <v-col cols="12" xs="12" sm="12" md="10" lg="10">
        <v-card outlined tile class="pa-15 card">
          <v-row>
            <v-col cols="12" xs="12" md="4" lg="4">
              <h3 class="text pagenotfound">Page Not Found</h3>
              <h2 class="text notfound">
                Sorry, the page you are for could not be found
              </h2>
              <div class="mt-10">
                <v-btn class="btn mr-5" color="primary" large @click="turnBack"
                  >Turn Back</v-btn
                >
                <v-btn class="btn" color="primary" large @click="goHome"
                  >Go Home</v-btn
                >
              </div>
            </v-col>

            <v-col cols="12" xs="12" md="8" lg="8">
              <h1 class="text text-center heading">404</h1>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: "NotFoundPage",
  data() {
    return {};
  },

  methods: {
    turnBack() {
      history.back();
    },

    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.card {
  background: #f3f5f6 !important;
  border: none;
  border-radius: 10px !important;
}

.notfound {
  font-size: 48px;
  letter-spacing: 0.25px;
}

.pagenotfound {
  font-weight: lighter;
}
.text {
  color: #36a5dd;
}

.v-btn.btn {
  box-shadow: none;
}

.heading {
  font-size: 250px;
  letter-spacing: -0.5px;
  font-weight: 700;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>