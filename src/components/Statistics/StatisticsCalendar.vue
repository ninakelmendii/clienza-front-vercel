<template>
  <v-row>
    <v-col cols="12" md="12" lg="12">
      <v-card outlined class="calendar">
        <v-date-picker v-model="picker"></v-date-picker>
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
.card-image {
  border-radius: 10px;
}

.card-offers {
  border-radius: 10px !important;
  border: none !important;
}

.v-card__title.font-weight-bold {
  padding: 20px 0 10px 0;
}

.v-card__subtitle.subtitle.mt-1 {
  padding: 0 0 10px 0;
  color: rgba(0, 0, 0, 0.56);
  font-size: 16px;
}

.calendar-card {
  border: none;
  border-radius: 6px;
}

.v-picker {
  border-radius: 6px;
  display: flex;
  justify-content: center;
}

.v-card.calendar {
    border-radius: 15px !important;
    overflow: auto;
    border: none;
    padding: 23px;
  }
</style>