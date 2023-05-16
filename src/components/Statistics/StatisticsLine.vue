<template>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12">
        <v-card class="stats pa-5" outlined>
          <v-subheader><h3>{{ translate(mode == 'single' ? 'My performance': 'Perfomance of agent') }}</h3></v-subheader>
          <div id="chart">
            <apexChart
              width="100%"
              :height="mode == 'single' ? 200 : 350"
              ref="apexChart"
              type="line"
              :options="options"
              :series="series"
            ></apexChart>
            <div class="toolbar" v-if="mode != 'single'">
              <v-row justify="end" items="end">
                <v-col cols="12" md="8">
                  <v-select
                    :items="agents"
                    outlined
                    v-model="current_agent"
                  ></v-select>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
import axios from 'axios';
import * as LANGUAGE from '../../store/language.json';

    export default {
        name: "StatisticsLine",
        props: ["mode"],
        data(){return {
          agents: [],
          current_agent: [],
          options:{
          chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: false
            }
            },
            colors: ['#36A5DD', '#545454'],
            dataLabels: {
                enabled: true,
            },
            stroke: {
                curve: 'smooth'
            },
            grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: [],
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            }
          },
          series: [
          ],
          leads: []
        }},
        watch: {
          current_agent(val) {
            if(this.mode == 'single') return;

            this.filterPerCurrentAgent(val);
          },
          "$vuetify.theme.dark": {
            handler(newVal){
              this.$refs.apexChart.updateOptions({
                xaxis: {
                  labels: {
                    style: {
                      colors: [newVal ? 'white': "black"]
                    }
                  }
                },
              })
            },
            deep: true
          }
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
          getAllUsers() {
            axios
               .get("get_all_users")
               .then(response => {
                  const agents = response.data;

                  const agents_prepare = [];

                  agents.forEach(agent => {
                      const data = {
                        text: `${agent.first_name} ${agent.last_name}`,
                        value: agent.id
                      }

                      agents_prepare.push(data);
                  });

                  this.agents = agents_prepare;
                  this.current_agent = agents_prepare[0]
               }).catch(e => console.log(e));
          },
          getLeads() {
            axios 
                  .get('/get_all_leads')
                  .then(res => {
                    this.leads = res.data;

                    this.$nextTick(() => {
                      if(this.mode == 'single') {
                        const current_user_id = JSON.parse(localStorage.getItem('user')).id;
                        this.filterPerCurrentAgent(current_user_id);
                      }
                    })
                  })
                  .catch(err => console.log(err));
          },
          filterPerCurrentAgent(agent_id) {
            
            const agents_leads = this.leads.filter(lead => lead.user_id == agent_id);
            const completed_leads = agents_leads.filter(lead => lead.status_id == 13);
            const current_year = new Date().getFullYear();
            // let grouped_year = [];
            let grouped_month = [[],[],[],[],[],[],[],[],[],[],[],[]];
            grouped_month.length = 12;

            completed_leads.forEach(cl => {
              const created_at = new Date(cl.created_at);

              if(created_at.getFullYear() == current_year) {
                const month = created_at.getMonth();
                grouped_month[month] = [...grouped_month[month], cl];
              }
            });
            

            const current_month = new Date().getMonth();
            const length = [];
            for (let i = 0; i <= current_month; i++) {
              length.push(grouped_month[i].length);
            }

            this.$refs.apexChart.updateSeries([
              {name: this.translate('Completed leads'), data: [...length]},
            ], false, true);
          },
          getSpecificMonth(month){
            return this.translate(month).substring(0, 3);
          },
          getAllMonths() {
            const months = [
              this.getSpecificMonth('Janaury'),
              this.getSpecificMonth('February'),
              this.getSpecificMonth('March'),
              this.getSpecificMonth('April'),
              this.getSpecificMonth('May'),
              this.getSpecificMonth('June'),
              this.getSpecificMonth('July'),
              this.getSpecificMonth('August'),
              this.getSpecificMonth('September'),
              this.getSpecificMonth('October'),
              this.getSpecificMonth('November'),
              this.getSpecificMonth('December'),
            ]; 

            return months;
          },

          updateMonths() {
            const all_months = this.getAllMonths();
            
            const current_month = new Date().getMonth();
            for(let i = 0; i <= current_month; i++) {
              this.options.xaxis.categories.push(all_months[i]);
            }
          }
        },
        created() {
          this.updateMonths();
          this.getAllUsers();
          this.getLeads();
        }
    }
</script>

<style>
    .v-card.stats {
        border-radius: 15px !important;
        overflow: auto;
        border: none;
        padding: 20px;
    }
    .toolbar {
      position: absolute;
      top: 20px;
      right: 20px;
    }
</style>