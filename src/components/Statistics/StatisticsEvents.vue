<template>
  <v-row>
    <v-col cols="12" md="12" lg="12">
      <v-card outlined class="event-card">
        <v-row>
          <v-col cols="12" md="3" lg="3" class="text-center" align-self="center"
            ><h4 class="day">THU</h4>
            <p class="date">17</p></v-col
          >
          <v-divider vertical inset></v-divider>
          <v-col cols="12" md="9" lg="9">
            <span class="title">Lorem Ipsum</span>
            <p>lorem ipsum dolor sit amet</p>
          </v-col>

          <v-col
            cols="12"
            md="3"
            lg="3"
            class="text-center"
            align-self="center"
          >
            <v-chip
              class="calendar-chip"
              color="#fe92101f"
              label
              text-color="#FE9210"
            >
              <v-icon> mdi-calendar-blank-outline </v-icon>
            </v-chip></v-col
          >
          <v-col cols="12" md="9" lg="9">
            <span class="title">Sat, April 25, 2022</span>
            <p>10:AM to 6:PM</p>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col cols="12" md="12" lg="12">
      <v-card outlined class="event-card">
        <v-row>
          <v-col cols="12" md="3" lg="3" class="text-center" align-self="center"
            ><h4 class="day">THU</h4>
            <p class="date">17</p></v-col
          >
          <v-divider vertical inset></v-divider>
          <v-col cols="12" md="9" lg="9">
            <span class="title">Lorem Ipsum</span>
            <p>lorem ipsum dolor sit amet</p>
          </v-col>

          <v-col
            cols="12"
            md="3"
            lg="3"
            class="text-center"
            align-self="center"
          >
            <v-chip
              class="calendar-chip"
              color="#fe92101f"
              label
              text-color="#FE9210"
            >
              <v-icon> mdi-calendar-blank-outline </v-icon>
            </v-chip></v-col
          >
          <v-col cols="12" md="9" lg="9">
            <span class="title">Lorem Ipsum</span>
            <p>lorem ipsum dolor sit amet</p>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.event-card {
  padding: 15px;
  border: solid 1px transparent;
  border-radius: 6px;
}

span.calendar-chip.v-chip.v-chip--label.theme--light.v-size--default {
  padding: 7px;
}
</style>