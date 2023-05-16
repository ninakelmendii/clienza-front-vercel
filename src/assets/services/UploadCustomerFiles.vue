<template>
  <div>
      <div v-if="currentFile">
        <div>
          <v-progress-linear
            v-model="progress"
            intermediate
            :buffer-value="progress"
            color="primary"
          >
          </v-progress-linear>
        </div>
      </div>
      <v-row class="ml-4 flex-nowrap" :no-gutters="modified && !currentFile" justify="center" align="center">
        <div class="p-0" :class="{'custom-buttons': modified && !currentFile}">
          <label for="file-input" v-show="modified && !currentFile">
            <div class="custom-buttons">
              <svg style="transform: rotate(180deg);" width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5688 7.159L8.46605 9.42109V1H7.72982V9.4224L5.62623 7.15878L5.08684 7.66084L8.09712 10.8986L11.1081 7.66084L10.5688 7.159Z" fill="white" stroke="white" stroke-width="0.4"/>
                <path d="M15.1949 18.7483H1V4.5542H5.60822V5.29044H1.73606V18.0121H14.4586V5.29044H10.5869V4.5542H15.1947L15.1949 18.7483Z" fill="white" stroke="white" stroke-width="0.4"/>
              </svg>
            </div>
          </label>
          <v-file-input
            v-show="!modified || currentFile"
            id="file-input"
            show-size
            small-chips
            color="primary"
            :label="translate('Attachment')"
            @change="selectFile"
          ></v-file-input>
        </div>
        <v-col cols="4" v-if="currentFile">
          <v-btn color="success" dark small @click="uploadCustomerDocument">
            {{translate('Upload')}}
            <v-icon right dark>mdi-cloud-upload</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <SnackBar :data="snackbar" ref="snackbar"></SnackBar>
  </div>
</template>

<script>
// import FileUploadService from "./FileUploadService";e
import * as LANGUAGE from '../../store/language.json';
import SnackBar from "@/components/Snackbar/SnackBar.vue";
import axios from "axios";
export default {
    name: "UploadFiles",
    props: {
        modified: String,
        customer_id: Number,
        type: String
    },
    data() {
        return {
            currentFile: null,
            progress: 0,
            snackbar: {
                show: false,
                message: null,
                color: null,
                error: false
            },
            fileInfos: [],
            category_id: 1,
            folderName: ""
        };
    },
    methods: {
        translate(word) {
            let wordIndex = null;
            LANGUAGE.forEach((lng, index) => {
                if (lng.english.toLowerCase() == word.toLowerCase()) {
                    wordIndex = index;
                }
            });
            if (wordIndex === null) {
                return word;
            }
            if (this.$store.state.language == "german") {
                return LANGUAGE[wordIndex].german;
            }
            else {
                return LANGUAGE[wordIndex].english;
            }
        },
        selectFile(file) {
            this.progress = 0;
            console.log(file);
            this.currentFile = file;
        },
        async uploadCustomerDocument() {
            if (!this.currentFile) {
                this.snackbar = {
                    message: "Please select a file",
                    error: true
                };
                this.$refs.snackbar.toggleSnackbar(true);
                return;
            }
            
            axios
                .post('/internal_documents', {
                    document: this.currentFile,
                    file_name: this.currentFile,
                    category: this.type.toLowerCase(),
                    is_tab: true,
                    customer_id: this.customer_id,
                    type: this.type
                }, {
                    headers: {
                    'Content-type': "multipart/form-data"
                    }
                })
                .then(() => {
                    this.currentFile = null;
                }).catch(err => console.log(err));
        },
    },
    mounted() {
        // FileUploadService.getFiles(this.$router.currentRoute.params).then((response) => {
        //     this.fileInfos = response.data;
        // });
        // axios
        //     .get("/customer/" + this.customer_id)
        //     .then((response) => {
        //     const customer = response.data.data;
        //     this.folderName = `${customer.first_name} ${customer.last_name} - ${customer.id}`;
        // })
        //     .catch((error) => {
        //     console.log(error);
        // });
    },
    components: { SnackBar }
};
</script>

<style scoped>
.custom-buttons {
  background: #36a5dd;
  box-shadow: 0px 2px 6px rgba(54, 165, 221, 0.2);
  border-radius: 5px;
  cursor: pointer;
  height: 36px;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>