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
    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input
          show-size
          small-chips
          color="primary"
          :label="translate('Attachment')"
          @change="selectFile"
        ></v-file-input>
      </v-col>
      <v-col cols="4">
        <v-btn color="primary" dark small @click="uploadTaskAttachment">
          {{ translate("Upload") }}
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <SnackBar :data="snackbar" ref="snackbar"></SnackBar>
  </div>
</template>
  
  <script>
import FileUploadService from "./FileUploadService";
import * as LANGUAGE from '../../store/language.json';
import SnackBar from "@/components/Snackbar/SnackBar.vue";
export default {
  name: "UploadFiles",
  data() {
    return {
      currentFile: undefined,
      progress: 0,
      snackbar: {
        show: false,
        message: null,
        color: null,
      },
      fileInfos: [],
      category_id: 1,
      customer_id: 1,
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
    selectFile(file) {
      this.progress = 0;
      this.currentFile = file;
    },

    uploadTaskAttachment() {
      if (!this.currentFile) {
        this.snackbar = {
          message: "Please select a file",
          error: true
        };

        this.$refs.snackbar.toggleSnackbar(true);
        return;
      }

      this.snackbar = {
        message: "",
        color: "",
        show: false,
        error: false,
      };

      this.$refs.snackbar.toggleSnackbar(false);

      FileUploadService.uploadTaskAttachment(this.currentFile, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.snackbar = {
            message: response.data.message,
            error: true
          };

          this.$refs.snackbar.toggleSnackbar(true);
          return FileUploadService.getFiles(this.$router.currentRoute.params);
        })
        .then((files) => {
          this.fileInfos = files.data;
        })
        .catch((error) => {
          this.progress = 0;
          console.log(error)
          this.currentFile = null;
        });
    },
  },

  mounted() {
    FileUploadService.getFiles(this.$router.currentRoute.params).then((response) => {
      this.fileInfos = response.data;
    });
  },

  components: {SnackBar}
};
</script>
  
  <style>
</style>