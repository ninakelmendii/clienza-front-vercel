<template>
  <v-card class="abgeschlossen">
    <SnackBar :data="snackbar" ref="snackbar"></SnackBar>
    <v-form @submit.prevent="submitForm">
      <v-container>
          <v-col cols="12">
            <h2>{{translate('Persons')}}</h2>
          </v-col>
        <v-row v-for="(person, index) in persons" :key="index">
          <v-col cols="6">
            <v-text-field v-model="person.firstName" :label="translate('Name')"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="person.lastName" :label="translate('Last name')"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="person.unfalldeckung" :label="translate('Accident coverage')"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-menu
                close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
                >
                <template v-slot:activator="{ on }">
                    <v-text-field
                    v-model="person.date"
                    :label="translate('Date')"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="person.date"
                    no-title
                    scrollable
                    ref="datepicker[index]"
                    @input="openDatePicker(index)"
                ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="person.cost" :label="translate('Franchise')"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
                filled
                v-model="person.kvg"
                :items="insurances_list"
                label="KVG"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
                filled
                v-model="person.vvg"
                :items="insurances_list"
                label="VVG"
            ></v-select>
          </v-col>
        </v-row>
        <div class="buttons mt-4 mb-5">
            <v-btn color="primary" class="mr-2" @click="addNewPerson">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn color="primary" @click="removePerson(index)" v-if="persons.length > 1">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
        </div>
        <v-row>
          <v-col cols="12">
            <h2>KVG</h2>
          </v-col>
          <v-col cols="3">
            <v-select
                filled
                v-model="kvg.kvg"
                :items="insurances_list"
                label="KVG"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field 
              v-model="kvg.versicherungsmodell" 
              :label="translate('Insurance model')"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select
              filled
              v-model="kvg.franchise"
              :items="franchisesList"
              label="Franchise"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="kvg.unfalldeckung" :label="translate('Accident coverage')"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h2>VVG</h2>
          </v-col>
          <v-col cols="6">
            <v-select
                filled
                v-model="vvg.vvg"
                :items="insurances_list"
                label="VVG"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-file-input
              v-model="vvg.file"
              :label="translate('VVG Insurance file')"
              accept=".pdf,.doc,.docx,.txt"
              @change="onFileVvgSelected"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <h2>{{translate('Others')}}</h2>
          </v-col>
          <v-col cols="12">
            <v-file-input
              v-model="anderes"
              :label="translate('Others')"
              accept=".pdf,.doc,.docx,.txt"
              @change="onFileOtherSelected"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            {{ translate('Cancel') }}
          </v-btn>

          <v-btn
            type="submit"
            color="blue darken-1"
            text
          >
            {{translate("Create")}}
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios';
import * as LANGUAGE from '../../store/language.json';
import SnackBar from "../Snackbar/SnackBar.vue";

export default {
  props: ['close', 'item'],
  data() {
    return {
      snackbar: {
        show: false,
        message: "",
        color: null,
      },
      persons: [
        {
          firstName: '',
          lastName: '',
          unfalldeckung: '',
          date: '',
          cost: '',
          kvg: '',
          vvg: ''
        },
      ],
      kvg: {
        kvg: '',
        versicherungsmodell: '',
        franchise: '',
        unfalldeckung: '',
      },
      vvg: {
        vvg: '',
        file: ''
      },
      anderes: '',
      insurances_list: [],
      franchisesList: [],
    };
  },
  methods: {
    openDatePicker(index) {
      this.$refs["datepicker"][index].isActive = true;
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
    getInsurances() {
      axios
          .get("/insurances")
          .then((response) => {
            for (let $i = 0; response.data.data.length > 0; $i++) {
              this.insurances_list.push({
                text: response.data.data[$i].name,
                value: response.data.data[$i].name,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    setSelectedItemByLabel(label) {
      const item = this.items.find(item => item.label === label)
      this.selectedItem = item.value
    },
    getFranchises() {
      axios
        .get("franchises")
        .then((response) => {
          for (let $i = 0; response.data.data.length > 0; $i++) {
            this.franchisesList.push({
              text: response.data.data[$i].label,
              value: response.data.data[$i].label,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onFileVvgSelected(event) {
      this.vvg.file = event;
    },
    onFileOtherSelected(event) {
      this.anderes = event;
    },
    addNewPerson() {
      this.persons.push({
        firstName: '',
        lastName: '',
        unfalldeckung: '',
        date: '',
        cost: '',
        kvg: '',
        vvg: ''
      });
    },
    removePerson(personIndex) {
      this.persons.splice(personIndex, 1);
    },
    showSnackBar(text,error) {
      this.snackbar = {
          message: text,
          color: error,
          error: error ? true : false,
        };
        this.$refs.snackbar.toggleSnackbar(true);
    },
    submitForm() {
      if(this.persons.firstName === '') {
        this.showSnackBar(this.translate('Please fill in the first name field'), true)
        return false;
      }
      if(this.persons.lastName === '') {
        this.showSnackBar(this.translate('Please fill in the last name field'), true)
        return false;
      }
      if(this.persons.date === '') {
        this.showSnackBar(this.translate('Please fill in the date field'), true)
        return false;
      }
      if(this.persons.cost === '') {
        this.showSnackBar(this.translate('Please fill in the franchise field'), true)
        return false;
      }
      if(this.persons.unfalldeckung === '') {
        this.showSnackBar(this.translate('Please fill in the unfalldeckung field'), true)
        return false;
      }
      if(this.persons.kvg === '') {
        this.showSnackBar(this.translate('Please fill in the kvg field'), true)
        return false;
      }
      if(this.persons.vvg === '') {
        this.showSnackBar(this.translate('Please fill in the vvg field'), true)
        return false;
      }
      if(this.kvg.kvg === '') {
        this.showSnackBar(this.translate('Please fill in the kvg field'), true)
        return false;
      }
      if(this.kvg.versicherungsmodell === '') {
        this.showSnackBar(this.translate('Please fill in the insurance model field'), true)
        return false;
      }
      if(this.kvg.franchise === '') {
        this.showSnackBar(this.translate('Please fill in the franchise field'), true)
        return false;
      }
      if(this.kvg.unfalldeckung === '') {
        this.showSnackBar(this.translate('Please fill in the unfalldeckung field'), true)
        return false;
      }
      if(this.vvg.vvg === '') {
        this.showSnackBar(this.translate('Please fill in the vvg field'), true)
        return false;
      }
      if(this.vvg.file === '') {
        this.showSnackBar(this.translate('Please chose vvg file'), true)
        return false;
      }
      const formData = new FormData();
      this.persons.forEach((person, index) => {
        formData.append(`persons[${index}][firstName]`, person.firstName);
        formData.append(`persons[${index}][lastName]`, person.lastName);
        formData.append(`persons[${index}][date]`, person.date);
        formData.append(`persons[${index}][cost]`, person.cost);
        formData.append(`persons[${index}][kvg]`, person.kvg);
        formData.append(`persons[${index}][vvg]`, person.vvg);
        formData.append(`persons[${index}][unfalldeckung]`, person.unfalldeckung);
      });
      formData.append('vvgInsurance', this.vvg.vvg);
      formData.append('vvgContract', this.vvg.file);
      formData.append('kvgAbgschlossen', this.kvg.kvg);
      formData.append('modelInsurance', this.kvg.versicherungsmodell);
      formData.append('franchise', this.kvg.franchise);
      formData.append('accidentCoverage', this.kvg.unfalldeckung);
      formData.append('other', this.anderes);
      axios
        .post(`/feedback/completed-details/${this.$route.params.id}`, formData)
        .then((response) => {
          if(response.data) {
            this.close();
          }
        })
        .catch((error) => {
          this.showSnackBar(error.response.data.message, true)
        });
    },
    getItem() {
      if(this.item.persons) {
        this.persons = this.item.persons;
        this.kvg.kvg = this.item.kvgAbgschlossen;
        this.kvg.versicherungsmodell = this.item.modelInsurance;
        this.kvg.franchise = this.item.franchise;
        this.kvg.unfalldeckung = this.item.accidentCoverage
        this.vvg.file = this.item.vvgContract;
        this.vvg.vvg = this.item.vvgInsurance;
        this.anderes = this.item.other;
      }
    }
  },
  components: {
    SnackBar
  },
  mounted() {
    this.getInsurances();
    this.getFranchises();
    this.getItem()
  },
};
</script>
<style>
  .v-dialog {
    overflow-x: hidden;
  }
  h2 {
    font-family: "PT Sans", sans-serif;
    text-align: center;
  }
  .buttons button:only-child {
    width: 100%;
  }
  .buttons :not(button:only-child) {
    width: calc(50% - 4px);
  }
  .abgeschlossen .v-input__control {
    height: 50px;
  }
  .abgeschlossen .v-text-field--filled > .v-input__control > .v-input__slot {
    background: transparent;
    padding: 0!important;
    min-height: 43px!important;
    height: auto!important;
  } 
  .abgeschlossen .v-input__slot:hover{
    background: transparent !important;;
  }
</style>