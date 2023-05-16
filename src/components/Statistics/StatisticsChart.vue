<template>
  <v-row>
    <v-col cols="12" md="12" lg="12">
      <v-card outlined rounded class="chart-card stats">
        <v-subheader><h3>{{ translate("Leads status information") }}</h3></v-subheader>
        <div id="chart" class="d-flex justify-center">
          <ApexChart
            height="350"
            ref="realtimeChart"
            type="donut"
            width="590"
            :options="chartOptions"
            :series="series"
          />
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import * as LANGUAGE from '../../store/language.json';

export default {
  data: function () {
    return {
      series: [],
      chartOptions: {
        labels: [],
        dataLabels: {
          enabled: false,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                show: false,
              },
            },
          },
        ],
        legend: {
          position: "right",
          offsetY: 0,
          height: "100%",
          horizontalAlign: 'left'
        },
      },

      lang_list: [],
      canton_list: [],
      source_list: [],

      selected_lang: '',
      selected_canton: '',
      selected_source: ''
    };
  },
  methods: {
    // getPieChartData() {
    //   axios
    //     .get("/sale/statistic" , {
    //       params: {
    //         lang: this.selected_lang,
    //         canton_id: this.selected_canton,
    //         source: this.selected_source
    //       }
    //     })
    //     .then((response) => {
    //       for (
    //         let $i = 0;
    //         response.data.data.distribution_by_category.length > 0;
    //         $i++
    //       ) {
    //         this.chartOptions.labels.push(
    //           response.data.data.distribution_by_category[$i].status
    //         );
    //         this.series.push(
    //           parseInt(response.data.data.distribution_by_category[$i].total)
    //         );
    //       }

    //       this.$refs.realtimeChart.updateSeries([{
    //         data: this.series,
    //       }], false, true);

    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    getLangSelect() {
      axios
          .get("/languages")
          .then((response) => {

            for (const [key, value] of Object.entries(response.data)) {
              this.lang_list.push({
                text: value,
                value: key,
              });
            }

          })
          .catch((error) => {
            console.log(error);
          });
    },

    getSourceSelect() {
      axios
          .get("/sources")
          .then((response) => {

            for (let $i = 0; response.data.data.length > 0; $i++) {

              this.source_list.push({
                text: response.data.data[$i].name,
                value: response.data.data[$i].id,
              });

            }

          })
          .catch((error) => {
            console.log(error);
          });
    },

    getCantonSelect() {
      axios
          .get("/canton")
          .then((response) => {

            for (let $i = 0; response.data.length > 0; $i++) {

              this.canton_list.push({
                text: response.data[$i].name,
                value: response.data[$i].id,
              });

            }

          })
          .catch((error) => {
            console.log(error);
          });
    },

    getStatisticsByStatus(){
      axios
          .get('/leadstatistics')
          .then(response => {
            console.log(response.data);
            const statistics = response.data;

            // Finding the new lead index in array
            statistics.forEach((stat, index) => {
              if(stat.status != undefined && stat.status.id == 1) {
                const removeIndexs = [];

                statistics.forEach((undefinedStat, undefinedIndex) => {
                  if(undefinedStat.status == null) {
                    removeIndexs.push(undefinedIndex);
                    statistics[index].percentage += undefinedStat.percentage;
                    statistics[index].total = `${parseInt(statistics[index].total) + parseInt(undefinedStat.total)}`;
                  }
                });

                removeIndexs.forEach(ri => {
                  statistics.splice(ri, 1);
                })
                return;
              }
            });

            
            statistics.forEach(status => {
              this.series.push(parseInt(status.total));

              if(status.status) {
                this.chartOptions.labels.push(this.translate(status.status.en))
              } else {
                this.chartOptions.labels.push('Undefined')
              }

            });

          })
          .catch(err => console.log(err));
    },

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

  watch: {
    selected_lang: function (val) {
      console.log(val)
      this.getPieChartData()
    },

    selected_canton: function (val) {
      console.log(val)
      this.getPieChartData()
    },

    selected_source: function (val) {
      console.log(val)
      this.getPieChartData()
    },

  },

  mounted() {
    this.getLangSelect();
    this.getSourceSelect();
    this.getCantonSelect();
    // this.getPieChartData();
    this.getStatisticsByStatus();
  },
};
</script>

<style scoped>

.v-card.stats {
    border-radius: 15px !important;
    overflow: auto;
    border: none;
    padding: 20px;
  }
</style>