<template>
  <v-row style="flex-direction: column; padding: 0 25px;">
   <v-col cols="12">
    <v-row>
      <v-col cols="12" md="8" class="d-flex justify-start">
        <NavbarControl />
        <h2 style="display: flex; align-items: center;">{{ translate(title) }}</h2>
      </v-col>
      <v-col cols="12" md="4"><UserControl /></v-col>
    </v-row>
   </v-col>
    <!-- <template>
      <div>
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              style="margin: 10px 0 20px 0"
            >
              {{ translate("Add event") }}
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 lighten-2">
              {{ translate("Add event") }}
            </v-card-title>

            <v-card-text>
              <v-text-field
                :label="translate('Title')"
                v-model="newEvent.description"
              >
              </v-text-field>

              <template>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="formated_date"
                          :label="translate('From')"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </template>

              <template>
                <v-row>
                  <v-col
                    cols="12"
                    style="padding-top: 0"
                  >
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :return-value.sync="date2"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="formated_to_date"
                          :label="translate('To')"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date2"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="menu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu2.save(date2)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </template>

              <v-textarea
                :label="translate('Description')"
                v-model="newEvent.subject"
              >
              </v-textarea>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="createEvent"
              >
                {{ translate("Create") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template> -->

    <template>
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar
              flat
            >
              <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="setToday"
              >
                {{ translate('Today') }}
              </v-btn>
              <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="prev"
              >
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="next"
              >
                <v-icon small>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu
                bottom
                right
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="grey darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>
                      mdi-menu-down
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>{{ "Day" }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>{{ "Week" }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>{{ "Month" }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>{{ "4 days" }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="events"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card
                color="grey lighten-4"
                min-width="350px"
                flat
              >
                <v-toolbar
                  :color="selectedEvent.color"
                  dark
                >
                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details"></span>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    color="secondary"
                    @click="selectedOpen = false"
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </template>
  </v-row>
</template>

<script>
  import MGraph from './../../../services/mgraph';
  import NavbarControl from '../Navbar/NavbarControl.vue';
  import UserControl from '../Navbar/UserControl.vue';
  import * as LANGUAGE from '../../store/language.json';
import axios from 'axios';

  export default {
    name: 'CalendarView',
    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      dialog: false,
      
      newEvent: {
        subject: '',
        start: {},
        end: {},
        description: '',
      },
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'orange'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      title: 'Calendar'
    }),
    async mounted () {
      this.$refs.calendar.checkChange()
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
      async createEvent(){
        this.dialog = false;

        const params = {
          "subject": this.newEvent.subject,
          "start": {
            "dateTime": this.date,
            "timeZone": "UTC"
          },
          "end": {
            "dateTime": this.date2,
            "timeZone": "UTC"
          },
          "body": {
            "contentType": "HTML",
            "content": this.newEvent.description
          }
        }

        await MGraph.createEvent(params);

        this.updateRange();
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = '';
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      async updateRange () {
        const events = [];
        // const fetchedEvents = await MGraph.getAllEvents();

        const fetchedEvents = await axios.get('all_my_tasks');

        console.log(fetchedEvents);

        fetchedEvents.data.forEach(ev => {
          const allDay = false;
          const first = ev.date;
          const second = ev.date;
          const name = ev.name;

          events.push({
            name,
            start: first,
            end: second,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            timed: !allDay,
          })
        })

        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
    components: { NavbarControl, UserControl },
    computed: {
      formated_date() {
        if (!this.date) return null

        const [year, month, day] = this.date.split('-')
        return `${day}.${month}.${year}`
      },
      formated_to_date() {
        if (!this.date2) return null

        const [year, month, day] = this.date2.split('-')
        return `${day}.${month}.${year}`
      },
    }
  }
</script>