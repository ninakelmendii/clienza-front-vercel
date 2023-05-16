<template>
  <v-row>
    <v-col class="d-flex w-full h-full">
      <v-card outlined rounded class="user-card w-full">
        <v-list-item three-line>
          <v-row>
            <v-col>
              <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                  {{ translate('Hello') }} {{ user.first_name }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-title class="text-p mb-1 weather weather-text">
                <span
                  >{{
                    data.location.name
                  }}
                  </span>

              </v-list-item-title>
            </v-col>
            <v-col class="d-flex align-center justify-center">
              <v-avatar class="avatar-circle" size="85" @click="$router.push('/profile')"
                ><img class="pa-1" :src="$store.state.profileImage.img_path || require('@/assets/images/guest_profile_pic.png')" style="object-fit: contain;"
              />
            </v-avatar>
            </v-col>
          </v-row>
        </v-list-item>

        <v-col class="mt-8">
          <v-row justify="space-between" class="weather-container">
              <div class="text-p mb-1">
                <p>{{ translate('Today') }}</p>
                <v-row class="align-center" no-gutters>
                  <img :src="data.current.condition.icon" height="30" />
                  <span class="temperature">{{ data.current.temp_c }}°</span>
                </v-row>
              </div>

              <div class="text-p mb-1">
                <p>{{ translate('Tomorrow') }}</p>
                <v-row class="align-center" no-gutters>
                  <img
                  :src="data.forecast.forecastday[1].day.condition.icon"
                  height="30"
                  />
                  <span class="temperature"
                    >{{ data.forecast.forecastday[1].day.maxtemp_c }}°</span
                  >
                </v-row>
              </div>

              <div class="text-p mb-1">
                <p>{{translate(getDayFromDate(data.forecast.forecastday[1].date))}}</p>
                <v-row class="align-center" no-gutters>
                  <img
                  :src="data.forecast.forecastday[2].day.condition.icon"
                  height="30"
                  />
                  <span class="temperature"
                    >{{ data.forecast.forecastday[2].day.maxtemp_c }}°</span
                  >
                </v-row>
              </div>
          </v-row>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';
import * as LANGUAGE from '../../store/language.json';

Vue.use(require("vue-moment"));

import axios from "axios";
export default {
  name: "UserCard",

  data() {
    return {
      user: [],
      data: [],
      url: "https://api.weatherapi.com/v1/forecast.json?key=382ac42fa29242fdb8e161623211112&q=Schindellegi&days=3&aqi=no&alerts=no",
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
    getWeatherData() {
      axios
        .get(this.url)
        .then((response) => {
          console.log(response.data)
          this.data = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDayFromDate(date){
      const day = new Date(date).getDay();
      let dayLabel = '';

      switch (day) {
        case 0:
          dayLabel = 'Monday';
          break;
        case 1:
          dayLabel = 'Tuesday';
          break;
        case 2:
          dayLabel = 'Wednesday';
          break;
        case 3:
          dayLabel = 'Thursday';
          break;
        case 4:
          dayLabel = 'Friday';
          break;
        case 5:
          dayLabel = 'Saturday'
          break;
        default:
          dayLabel = 'Sunday';
          break;
      }

      return dayLabel;
    }
  },

  mounted() {
    this.user = JSON.parse(this.$store.state.user);
    this.getWeatherData();
  },

  watch: {
    data(newData) {
      console.log(newData);
    }
  }
};
</script>

<style scoped>
.theme--light.weather {
  background: #f4f4fc;
  border-radius: 8px;
  padding: 10px;
}

.theme--dark.weather {
  border-radius: 8px;
  padding: 10px;
}

.temperature {
  font-weight: bold;
  padding: 10px;
  font-size: 17px;
}

.user-card {
  padding: 30px;
  border-radius: 10px !important;
  border: none;
}

.theme--light .weather-text {
  background: #f4f4fc;
  padding: 10px;
  border-radius: 8px;
}

.theme--dark .weather-text {
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.25);
  padding: 10px;
  border-radius: 8px;
}

.v-application .text-h5, .v-list-item__title.text-h4.mb-1  {
    font-family: "PT Sans", sans-serif !important;
}

.v-list-item {
  padding: 0;
}

.avatar-circle{
  border: 1px solid #DFE0EB;
}

.w-full {
  width: 100%;
}

</style>