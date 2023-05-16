<template>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12">
        <v-card class="stats pa-5" outlined>
          <v-subheader><h3>{{ translate('Top month performers') }}</h3></v-subheader>
          <div id="chart">
            <apexChart
              width="100%"
              height="200"
              ref="apexChart"
              type="bar"
              :options="options"
              :series="series"
            ></apexChart>
          </div>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
    import axios from 'axios';
    import * as LANGUAGE from '../../store/language.json';

    export default {
        name: "StatisticsTopFive",
        props: ["mode"],
        data(){return {
          agents: [],
          current_agent: [],
          options: {
            
            chart: {
              type: 'bar',
              height: 350,
              toolbar: {
                show: false
              }
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              }
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories: [],
              labels: {
                style: {
                  colors: [this.$vuetify.theme.dark ? 'white': "black"]
                }
              }
            }
          },
          series: [{
            data: []
          }],
          leads: []
        }},
        watch: {
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
        },
        created() {
            axios
                .get('/get_filtered_billings')
                .then(res => {
                    const billings = res.data.billing;

                    // grouping people
                    const agents = [];

                    billings.forEach(bill => {
                        const exists = agents.find(a => a.id = bill.user_id);

                        if(!exists) {
                            let commission_sum = 0;

                            billings.forEach(b => {
                                if(b.user_id == bill.user_id) {
                                    commission_sum += parseInt(b.commission);
                                }
                            });

                            let info = {
                                commission_sum,
                                user: bill.user
                            };

                            agents.push(info)
                        }
                    });

                    const sum_data = [];

                    agents.forEach((ag) => {
                        this.options.xaxis.categories.push(`${ag.user.first_name} ${ag.user.last_name}`);
                        sum_data.push(ag.commission_sum);
                    });

                    this.$refs.apexChart.updateSeries([
                        {data: [...sum_data]},
                    ], false, true);

                    this.agents = agents;
                });
        }
    }
</script>

<style scoped>
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