<template>
  <v-card outlined id="calendar">
    <v-card-title>{{ translate("Today") }}, {{ today_date.date }} {{ today_date.month_name }}</v-card-title>
    <v-col>
      <v-row>
        <v-col class="column-day" v-for="day in days" :key="day.id">
          <!-- <v-card outlined class="days" :class="{ active: active }"> -->
          <label>
            <input type="radio" :value="day.full_date" v-model="active_day" class="d-none">
            <v-card outlined class="days" :class="{active: day.active, 'inactive-dark': !day.active && $vuetify.theme.dark}" @click="getDayTasks(day.full_date)">
              <p class="date d-flex justify-center">{{ day.date }}</p>
              <p class="day d-flex justify-center">
                {{ translate(day.day).substring(0, 3) }}
              </p>
            </v-card>
          </label>
          </v-col>
      </v-row>

      <v-divider class="mt-5 mb-5"></v-divider>

      <v-timeline align-top dense>
        <v-timeline-item
          v-for="event in events"
          :key="event.time"
          :color="event.color"
          small
        >
          <div class="event-card" :class="event.type" :style="{ 'background-color': event.color }">
            <div class="font-weight-normal">
              <strong>{{ translate(event.topic) }}</strong> {{ formatDate(event.time) }}
            </div>
            <div>{{ translate(event.message) }}</div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-col>
  </v-card>
</template>

<script>
import axios from "axios";
import * as LANGUAGE from '../../store/language.json';

export default {
  name: "CalendarWidget",

  data() {
    return {
      events: [
        // {
        //   topic: "Client Meeting",
        //   message: `Lorem ipsum dolor sit amet, dolor sit amet.`,
        //   time: "09:00 AM",
        //   color: "#36A5DD",
        // },
        // {
        //   topic: "Tasks Today",
        //   message: "Lorem ipsum dolor sit amet, dolor sit amet.",
        //   time: "10:00 PM",
        //   color: "#1A1F3A",
        // },
        // {
        //   topic: "Daily Meeting",
        //   message: "Sprint 10 - Code Review. 2nd meeting",
        //   time: "12:00 AM",
        //   color: "#FE9210",
        // },
      ],

      days: [],

      months: {
        Jan: '01',
        Feb: '02',
        Mar: '03',
        Apr: '04',
        May: '05',
        Jun: '06',
        Jul: '07',
        Aug: '08',
        Sep: '09',
        Oct: '10',
        Nov: '11',
        Dec: '12',
      },

      today: new Date(),

      today_date: {},

      active_day: null
    };
  },

  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    translate(word) {
      let wordIndex = null;

      if(word == null) return word;

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

    workingDays(start, end) {
      var arr = [];
      var dt = new Date(start);
      while (dt <= end) {
        arr.push((new Date(dt)).toString().substring(0,15));
        dt.setDate(dt.getDate() + 1);
      }
      return arr;
    },

    getDayTasks(date) {
      axios
        .get('/task?date=' + date)
        .then((response) => {
          console.log('calendar', response)
          this.events = []
          for (let $i = 0; response.data.data.length > 0; $i++) {
            console.count(response.data.data[$i].name);
            this.events.push({
              topic: response.data.data[$i].name,
              message: response.data.data[$i].note,
              time: response.data.data[$i].date,
              type: response.data.data[$i].type,
              color: "#0F123F"
            })
          }

          this.$nextTick(() => {
            console.log('aaa',this.events);
          })

          if (response.data.data.length === 0) {
            this.events.push({
              topic: 'No Tasks',
              message: '',
              time: '',
              color: "#FE9210"
            })
          }
        })
        .catch((error) => {console.log(error)})
    },

    getTodayInfo() {
      let today = new Date().toISOString().slice(0, 10);

      for (let $i = 0; this.days.length > 0; $i++) {
        console.log("This day:", this.days[$i].full_date == today)
        console.log("the today", today)

        if (this.days[$i].full_date == today) {
        this.today_date = {
          date: this.days[$i].date,
          day: this.days[$i].day,
          active: true,
          month_name: this.days[$i].month_name,
          month: this.days[$i].month,
          full_date: this.days[$i].full_date
        }

        this.active_day = this.days[$i].full_date;
        }
      }
    }

  },


  beforeMount() {
    let currentDate = new Date();
    let firstday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
    let lastday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6));

    let datesArray = this.workingDays(firstday, lastday)

    let today = new Date().toISOString().slice(0, 10);

    for (let $i = 0; datesArray.length > 0; $i++) {
      if (!datesArray[$i].startsWith("Sun") && !datesArray[$i].startsWith("Sat")) {

        const dateData = datesArray[$i].split(" ");

        if (new Date().getFullYear() + '-' + this.months[dateData[1]] + '-' + dateData[2] === today) {
          this.days.push({
            date: dateData[2],
            day: dateData[0],
            active: true,
            month_name: dateData[1],
            month: this.months[dateData[1]],
            full_date: new Date().getFullYear() + '-' + this.months[dateData[1]] + '-' + dateData[2]
          })
        } else {
          this.days.push({
            date: dateData[2],
            day: dateData[0],
            active: false,
            month_name: dateData[1],
            month: this.months[dateData[1]],
            full_date: new Date().getFullYear() + '-' + this.months[dateData[1]] + '-' + dateData[2]
          })
        }

      }
    }
  },

  mounted() {

    let today = new Date().toISOString().slice(0, 10);
    this.getDayTasks(today)

    this.getTodayInfo()
  },

};
</script>

<style scoped>
.days {
  border-radius: 10px;
  border: none;
  background: #f8f8ff;
  padding: 9px;
  border-radius: 13px;
}

.days.inactive-dark {
  background: rgba(0, 0, 0, 0.25);
}

input[type=radio]:checked ~ * {
  background: #0f123f;
  color: #fff;
  box-shadow: 0px 20px 55px rgba(15, 18, 63, 0.25);
}

.days > p {
  margin: 0;
  font-size: 14px;
}

.days > p:first-child {
  font-size: 17px;
}

#calendar {
  border: none;
  min-width: 100% !important;
  border-radius: 10px;
}

.v-divider {
  border: 1px solid #ededff;
}

.event-card {
  padding: 10px;
  color: #fff;
  border-radius: 10px;
}

.event-card.\31{
  background-color: #36A5DD !important;
}

.event-card.\32{
  background-color: #00a10b !important;
}

.event-card.\33{
  background-color: #c9a202 !important;
}

.event-card.\34{
  background-color: #0F123F !important;
}
.column-day {
  width: 20%;
}
</style>