<template>
  <v-row>
    <v-snackbar :color="snackbar.color" timeout="2000" v-model="snackbar.show">
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
    <v-col cols="12" md="3" lg="3" class="mt-5">
      <!-- <v-select
        :items="items"
        rounded
        filled
        :label="translate('Search')"
        background-color="white"
        prepend-inner-icon="mdi-magnify"
      ></v-select> -->
      <v-text-field
        :label="translate('Search')"
        background-color="white"
        prepend-inner-icon="mdi-magnify"
        rounded
        filled
      >

      </v-text-field>
    </v-col>

    <v-dialog v-model="deleteModalValue" max-width="550px">
              <v-card>
              <v-row no-gutters no-wrap style="padding: 24px;">
                  <img src="@/assets/gifs/trash.gif" style="width: 56px; height: 56px;" />
                  <div style="margin-left: 16px;">
                      <v-card-title class="text-h5 p-0">{{translate('Delete')}}</v-card-title>
                      <v-card-text class="p-0" style="margin-top: 4px;">{{ translate('Are you sure you want to delete this item?') }}</v-card-text>
                  </div>
              </v-row>
              <v-card-actions class="justify-end">
                  <button @click="deleteModalValue = false" class="btn btn-cancel" :class="{ 'btn-dark': $vuetify.theme.dark }"
                      >{{ translate('Cancel') }}</button
                  >
                  <button
                      color="blue darken-1"
                      text
                      @click="deleteItem"
                      class="btn btn-decline"
                      >{{translate('Confirm')}}</button
                  >
              </v-card-actions>
              </v-card>
          </v-dialog>

    <v-col cols="12" md="3" lg="3" class="mt-5">
      <v-select
        :items="items"
        rounded
        filled
        :no-data-text="translate('No data available')"
        :label="translate('Category')"
        background-color="white"
        prepend-inner-icon="mdi-filter-variant"
      ></v-select>
    </v-col>

    <v-col cols="12" md="6" lg="6" class="mt-5" align="end" v-if="isAdmin">
      <v-btn color="primary" @click="openFileUploader"
        ><v-icon>mdi-plus</v-icon>{{ translate('Add PDF file') }}</v-btn
      >
    </v-col>

    <v-dialog v-model="uploadFile" max-width="500px" v-if="isAdmin">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ translate('Import file') }}:</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  outlined
                  v-model="file_title"
                  :label="translate('Title')"
                ></v-text-field>
              </v-col>
              <div
                style="width: 100%; margin-right: 12px"
              >
                <v-file-input
                  color="primary accent-4"
                  counter
                  :label="translate('File input')"
                  v-model="files"
                  placeholder="Select your PDF file"
                  prepend-icon="mdi-paperclip"
                  outlined
                  :show-size="1000"
                >
                </v-file-input>
              </div>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="close"> {{translate('Cancel')}} </v-btn>

          <v-btn v-show="isCreateMode" color="primary" @click="uploadCSV">
            {{translate('Import')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-col cols="12" md="12" lg="12">
      <v-row justify="center" v-if="videos.length == 0 && !loading">
        <h3>{{ translate('No Data') }}</h3>
      </v-row>
      <v-row>
        <v-col cols="12" md="3" lg="3" v-for="video in videos" :key="video.id">
          <v-card outlined class="card-offers">
            <div class="overlay d-flex justify-center align-center">
              <!-- <v-btn @click="visitUrl(video.url)" class="mr-4" icon><svg width="35" height="35" viewBox="0 0 38 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33.1599 51H4.69255C2.65659 51 1 49.3435 1 47.3074V11.4109L12.1052 1H33.1593C35.1952 1 36.8518 2.65647 36.8518 4.69255V47.3066C36.8523 49.343 35.1957 51 33.1598 51H33.1599ZM2.37253 12.0056V47.3081C2.37253 48.588 3.41372 49.6287 4.69316 49.6287H33.1605C34.4399 49.6287 35.4811 48.5875 35.4811 47.3081V4.69402C35.4811 3.41409 34.4399 2.37339 33.1605 2.37339H12.6491L2.37253 12.0056Z" fill="#FCFCFC" stroke="#FFFBFB" stroke-width="0.3"/>
                <path d="M10.3191 13.0808H1.68616C1.30671 13.0808 1 12.7736 1 12.3946C1 12.0162 1.30671 11.7085 1.68616 11.7085H10.3191C11.0756 11.7085 11.6909 11.0931 11.6909 10.3367V2.37268C11.6909 1.9942 11.9976 1.68652 12.377 1.68652C12.7565 1.68652 13.0632 1.99371 13.0632 2.37268V10.3367C13.0627 11.8497 11.8325 13.0808 10.3191 13.0808L10.3191 13.0808Z" fill="#FCFCFC" stroke="#FFFBFB" stroke-width="0.3"/>
                <path d="M16.7006 33.7733C12.3195 33.7733 8.75537 30.209 8.75537 25.8281C8.75537 21.447 12.3197 17.8828 16.7006 17.8828C21.0826 17.8828 24.6469 21.4471 24.6469 25.8281C24.6469 30.2091 21.0826 33.7733 16.7006 33.7733ZM16.7006 19.2542C13.0761 19.2542 10.1272 22.2031 10.1272 25.8277C10.1272 29.4523 13.0761 32.4012 16.7006 32.4012C20.3252 32.4012 23.2751 29.4523 23.2751 25.8277C23.2751 22.2031 20.3252 19.2542 16.7006 19.2542Z" fill="#FCFCFC" stroke="#FFFBFB" stroke-width="0.3"/>
                <path d="M29.3063 41.8906C29.0996 41.8906 28.8953 41.7978 28.7608 41.6212L21.0739 31.574C20.8433 31.2735 20.9012 30.8429 21.2022 30.6122C21.5027 30.383 21.9333 30.44 22.163 30.7405L29.8504 40.7882C30.081 41.0887 30.0231 41.5193 29.7221 41.75C29.5987 41.8447 29.4518 41.8906 29.3063 41.8906L29.3063 41.8906Z" fill="#FCFCFC" stroke="#FFFBFB" stroke-width="0.3"/>
                </svg>
              </v-btn> -->

              <div v-if="isAdmin">
              <v-btn @click="deleteModal(video.id)" class="ml-4" icon><svg width="35" height="35" viewBox="0 0 38 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M31.0716 3.92163H25.6072C25.3587 2.81493 24.7008 1.82063 23.7445 1.10635C22.7881 0.392056 21.5917 0.00142858 20.3571 0H17.1431C15.9085 0.0013951 14.712 0.39202 13.7557 1.10635C12.7993 1.82063 12.1415 2.81502 11.8929 3.92163H6.42859C4.72401 3.92337 3.08998 4.54385 1.8848 5.64664C0.67992 6.74914 0.00185397 8.24433 0 9.80398C0 10.0638 0.112819 10.3132 0.313691 10.497C0.514564 10.6811 0.787099 10.7844 1.07144 10.7844H2.17074L2.19971 45.0881C2.19895 45.0913 2.19895 45.0948 2.19971 45.0979V45.1087V46.1331V46.1812C2.25613 47.2115 2.74287 48.1825 3.55975 48.8933C4.37696 49.6041 5.46094 50.0003 6.58845 50H30.9096C32.0363 49.9997 33.1199 49.6034 33.9365 48.8927C34.7529 48.1819 35.2396 47.2112 35.2961 46.1813V46.1332V45.1099C35.2965 45.106 35.2965 45.1019 35.2961 45.098C35.2965 45.0945 35.2965 45.0907 35.2961 45.0872L35.3293 10.7844H36.4286C36.7129 10.7844 36.9854 10.6811 37.1863 10.497C37.3872 10.3132 37.5 10.0638 37.5 9.80394C37.4981 8.2442 36.82 6.74902 35.6152 5.6466C34.4099 4.54374 32.7759 3.92329 31.0714 3.92159L31.0716 3.92163ZM17.1434 1.96081H20.3577H20.3573C21.022 1.96081 21.6704 2.1495 22.2132 2.50072C22.7556 2.85193 23.1661 3.34824 23.3875 3.92162H14.1131C14.3346 3.34823 14.7451 2.85197 15.2875 2.50072C15.8302 2.1495 16.4786 1.96081 17.1434 1.96081H17.1434ZM6.42937 5.88244H31.0725C32.0224 5.88349 32.9451 6.17297 33.6961 6.7052C34.447 7.23742 34.9836 7.98244 35.2223 8.82369H2.28019C2.51879 7.98244 3.05547 7.23743 3.8064 6.7052C4.55728 6.17297 5.48004 5.88349 6.42996 5.88244H6.42937ZM33.1597 44.1175H4.33829L4.31351 14.7057H33.1847L33.1597 44.1175ZM30.9097 48.0391H6.58852C6.01449 48.0401 5.4618 47.8403 5.04368 47.4807C4.62554 47.1211 4.37321 46.629 4.33852 46.1048V46.0783H33.159V46.1048C33.1243 46.6283 32.8727 47.1201 32.4553 47.4794C32.038 47.839 31.4864 48.0392 30.9131 48.0392L30.9097 48.0391ZM33.1822 12.7452H4.31682V10.7843H33.188L33.1822 12.7452Z" fill="#FBFBFB"/>
                  <path d="M8.39265 42.1573C8.677 42.1573 8.94952 42.0541 9.1504 41.8703C9.35127 41.6865 9.46409 41.4371 9.46409 41.1769V17.6474C9.46409 17.1057 8.98458 16.667 8.39269 16.667C7.80113 16.667 7.32129 17.1058 7.32129 17.6474V41.1769C7.32129 41.4371 7.43411 41.6865 7.63537 41.8703C7.83624 42.0541 8.10878 42.1573 8.39274 42.1573H8.39265Z" fill="#FBFBFB"/>
                  <path d="M13.5728 42.1573C13.8568 42.1573 14.1293 42.0541 14.3302 41.8703C14.5311 41.6865 14.6443 41.4371 14.6443 41.1769V17.6474C14.6443 17.1057 14.1644 16.667 13.5729 16.667C12.9809 16.667 12.5015 17.1058 12.5015 17.6474V41.1769C12.5015 41.7186 12.981 42.1573 13.5729 42.1573L13.5728 42.1573Z" fill="#FBFBFB"/>
                  <path d="M18.7501 42.1573C19.0344 42.1573 19.3069 42.0541 19.5078 41.8703C19.7087 41.6865 19.8215 41.4371 19.8215 41.1769V17.6474C19.8215 17.1057 19.3416 16.667 18.7501 16.667C18.1586 16.667 17.6787 17.1058 17.6787 17.6474V41.1769C17.6787 41.4371 17.7915 41.6865 17.9924 41.8703C18.1933 42.0541 18.4658 42.1573 18.7501 42.1573H18.7501Z" fill="#FBFBFB"/>
                  <path d="M23.9288 42.1573C24.2131 42.1573 24.4857 42.0541 24.6865 41.8703C24.8874 41.6865 25.0002 41.4371 25.0002 41.1769V17.6474C25.0002 17.1057 24.5207 16.667 23.9288 16.667C23.3373 16.667 22.8574 17.1058 22.8574 17.6474V41.1769C22.8574 41.4371 22.9706 41.6865 23.1715 41.8703C23.3724 42.0541 23.6449 42.1573 23.9289 42.1573H23.9288Z" fill="#FBFBFB"/>
                  <path d="M29.108 42.1573C29.3919 42.1573 29.6645 42.0541 29.8653 41.8703C30.0666 41.6865 30.1794 41.4371 30.1794 41.1769V17.6474C30.1794 17.1057 29.6995 16.667 29.108 16.667C28.5161 16.667 28.0366 17.1058 28.0366 17.6474V41.1769C28.0366 41.4371 28.1494 41.6865 28.3503 41.8703C28.5512 42.0541 28.8237 42.1573 29.1081 42.1573H29.108Z" fill="#FBFBFB"/>
                </svg>
              </v-btn>

              <v-btn icon @click="downloadFile(video)" class="ml-4" >
                <svg width="35" height="35" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.9392 8.32844L10.0959 11.3873V0H9.10032V11.3891L6.25577 8.32814L5.52638 9.00704L9.59701 13.3853L13.6686 9.00704L12.9392 8.32844Z" fill="#FBFBFB"/>
                  <path d="M19.1949 23.9999H0V4.80615H6.23141V5.80172H0.995331V23.0045H18.1993V5.80172H12.9638V4.80615H19.1946L19.1949 23.9999Z" fill="#FBFBFB"/>
                </svg>
              </v-btn>
              </div>
            </div>
            <div class="pa-6">
              <v-img
                class="card-image"
                :src="require('@/assets/images/thumbnails/hilfe.jpg')"
              ></v-img>

              <v-card-title class="font-weight-bold" style="font-size: 1rem; text-align: center; display: block;">{{
                getSingleFileName(video.filename)
              }}</v-card-title>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import * as LANGUAGE from '../../store/language.json';

export default {
  data() {
    return {
      isCreateMode: true,
      uploadFile: false,
      deleteItemId: null,
      deleteModalValue: false,
      file_name: "",
      file_title: "",
      files: null,

      isAdmin: false,

      snackbar: {
        show: false,
        message: null,
        color: null,
      },

      videos: [
        // {
        //   id: 1,
        //   title: "BrokercalLch Einfuhrung",
        //   description:
        //     "BrokercaLch Einfuhrung lorem ippsum dolor sit amet color sit amet.",
        // },
        // {
        //   id: 2,
        //   title: "BrokercalLch Einfuhrung",
        //   description:
        //     "BrokercaLch Einfuhrung lorem ippsum dolor sit amet color sit amet.",
        // },
        // {
        //   id: 3,
        //   title: "BrokercalLch Einfuhrung",
        //   description:
        //     "BrokercaLch Einfuhrung lorem ippsum dolor sit amet color sit amet.",
        // },
        // {
        //   id: 4,
        //   title: "BrokercalLch Einfuhrung",
        //   description:
        //     "BrokercaLch Einfuhrung lorem ippsum dolor sit amet color sit amet.",
        // },
        // {
        //   id: 5,
        //   title: "BrokercalLch Einfuhrung",
        //   description:
        //     "BrokercaLch Einfuhrung lorem ippsum dolor sit amet color sit amet.",
        // },
        // {
        //   id: 6,
        //   title: "BrokercalLch Einfuhrung",
        //   description:
        //     "BrokercaLch Einfuhrung lorem ippsum dolor sit amet color sit amet.",
        // },
        // {
        //   id: 7,
        //   title: "BrokercalLch Einfuhrung",
        //   description:
        //     "BrokercaLch Einfuhrung lorem ippsum dolor sit amet color sit amet.",
        // },
        // {
        //   id: 8,
        //   title: "BrokercalLch Einfuhrung",
        //   description:
        //     "BrokercaLch Einfuhrung lorem ippsum dolor sit amet color sit amet.",
        // },
      ],
    };
  },

  methods: {
    getSingleFileName(file_path){
      const splitPath = file_path.split('/');

      return splitPath[splitPath.length - 1];
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
    openFileUploader() {
      this.uploadFile = true;
    },

    close() {
      this.uploadFile = false;
    },

    visitUrl(url) {
      window.open(url, '_blank');
    },

    deleteModal(id) {
      this.deleteItemId = id;
      this.deleteModalValue = !this.deleteModalValue;
    },

    async deleteItem() {
      try {
        await axios.delete('/internal_documents/' + this.deleteItemId);
        this.deleteModalValue = false;
        this.refreshHelp();
      } catch (error) {
        console.log(error)
      }
    },

    async uploadCSV() {
      this.loading = true;

      axios
          .post('/internal_documents', {
            document: this.files,
            file_name: this.files,
            category: 'help'
          }, {
            headers: {
              'Content-type': "multipart/form-data"
            }
          })
          .then(() => {
            this.refreshHelp();
          }).catch(err => console.log(err));
      
      this.uploadFile = false;
      this.file_title = '',
      this.files = null;

      this.refreshHelp();
    },

    async refreshHelp() { 
      axios
          .get("/internal_documents?term=" + this.search_string + "&category=help")
          .then(response => {
            console.log(response.data);
            this.videos = response.data.data;
          })
          .catch(err => console.log(err))
          .finally(() => this.loading = false);
    },

    downloadFile(file_info) {
      axios
          .get('download_internal?id=' + file_info.id, { responseType: 'blob' })
          .then(res =>  {
              const file = window.URL.createObjectURL(res.data);
              let documentUrl = document.createElement('a');

              documentUrl.href = file;
              documentUrl.download = this.getSingleFileName(file_info.filename);
              document.body.appendChild(documentUrl);
              documentUrl.click();

              documentUrl.remove();
              window.URL.revokeObjectURL(file);
          })
          .catch(err => console.log(err));
    }
  },

  async mounted() {
    if (this.$helperPlugin.ifAdmin()) {
      this.isAdmin = true;
    }

    this.refreshHelp();
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
.theme--light .v-card__subtitle.subtitle.mt-1 {
  padding: 0 0 10px 0;
  color: rgba(0, 0, 0, 0.56);
  font-size: 16px;
}

.theme--dark .v-card__subtitle.subtitle.mt-1 {
  padding: 0 0 10px 0;
  color: rgba(255, 255, 255, 0.56);
  font-size: 16px;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  z-index: 1;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.7);
}

.v-card:hover .overlay {
  opacity: 1;
}

</style>