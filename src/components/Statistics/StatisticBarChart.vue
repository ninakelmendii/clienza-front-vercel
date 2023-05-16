<template>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12">
        <v-card class="stats pa-5" outlined>
          <v-subheader><h3>{{ translate('Perfomance of agents') }}</h3></v-subheader>
          <div id="chart">
            <apexChart
              height="350"
              ref="apexChart"
              type="bar"
              :options="options"
              :series="series"
            ></apexChart>
            <div class="toolbar">
              <v-select
                :items="orderItems"
                dense
                outlined
                v-model="orderValue"
              ></v-select>
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
    data: function () {
      return {
        orderItems: [
          { text: this.translate("Last week"), value: 'week' },
          { text: this.translate("Last month"), value: "month" },
          { text: this.translate("Last year"), value: "year" },
        ],
        orderValue: "month",
        options: {
          chart: {
            toolbar: {
              show: true,
              tools: {
                download: false,
              },
            },
            animations: {
              enabled: true,
              easing: "easeinout",
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150,
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350,
              },
            },
            fontFamily: "Lato, sans-serif",
          }, 
          legend: {
            markers: {
              fillColors: ['#1A1F3A', '#36A5DD', '#FE9210']
            }
          },
          theme: {
            mode: "light",
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            type: 'date',
            categories: ["Loading"]
          },
          grid: {
            strokeDashArray: 7,
            yaxis: {
              lines: {
                show: true,
              },
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '40%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
  
          fill: {
            opacity: 1,
            colors: ['#1A1F3A', '#36A5DD', '#FE9210']
          },
        },
        series: [{
          name: 'Completed leads',
          data: []
        }, {
          name: 'All leads',
          data: []
        }, {
          name: 'Not completed',
          data: []
        }],
        leads: [],
        user: []
      };
    },

    created(){
      this.getStatistics();
      this.getLeads();
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
      removeDuplicates(arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index);
      },

      getLeads(orderType = ""){
        // this.$refs.apexChart.updateOptions({
        //   xaxis: {
        //     categories: ["Loading"] //ie ["a","b","c","d"]
        //   }
        // });

        axios
          .get(`/get_all_leads?order=${orderType}`)
          .then(response => {
            const leads = response.data;

            const agents_id = [];

            leads.forEach(lead => {
              agents_id.push(lead.user_id);
            });

            let filtered_agents_id = this.removeDuplicates(agents_id);

            axios
                 .get("/get_all_users")
                 .then(response => {
                    const allUsers = response.data;

                    this.options.xaxis.categories.length = 0;

                    const new_completed = [];
                    const new_all_leads = [];
                    const new_not_completed = [];
                    
                    filtered_agents_id.forEach((fai, index) => {
                      let findAgent = allUsers.find(user => parseInt(user.id) == parseInt(fai));
                      if(findAgent == undefined) return;
                      let findLeads = leads.filter(lead => lead.user_id == findAgent.id);

                      if(findLeads.length != 0) {
                        console.count(findLeads.length)
                        findAgent.leads = findLeads;

                        filtered_agents_id[index] = findAgent;
                        this.options.xaxis.categories.push(findAgent.first_name.toString());

                        let completed = 0;
                        let not_completed = 0;


                        findLeads.forEach((lead) => {
                            if(lead.status_id == 15) {
                              completed++;
                            } else {
                              not_completed++;
                            }
                        });

                        new_completed.push(completed);
                        new_all_leads.push(findLeads.length);
                        new_not_completed.push(not_completed);
                      }
                    });

                    this.$refs.apexChart.updateSeries([
                        {name: this.translate('Completed'), data: new_completed},
                        {name: this.translate('All leads'), data: new_all_leads},
                        {name: this.translate('Not completed'), data: new_not_completed}
                      ], false, true);
                 })
          });
      },

      getStatistics(){
        // axios
        //     .get('/statistics')
        //     .then(response => console.log(response))
        //     .catch(err => console.log(err))
        // axios
        //     .get('/leadstatistics')
        //     .then(response => {
        //       let filtered_leads = []

        //       response.data.forEach(lead => {
        //           if(lead.status != null && lead.status.id == 15) {
        //             filtered_leads = lead;
        //           }
        //       });

        //       console.log(filtered_leads)
        //     })
        //     .catch(err => console.log(err))
      }
    },
    

    watch: {
      orderValue(newVal){
        this.getLeads(newVal);
      }
    }
  };
  </script>
  
  <style scoped>
  .v-card.stats {
    border-radius: 15px !important;
    overflow: auto;
    border: none;
    padding: 45px;
  }

  .toolbar {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  </style>