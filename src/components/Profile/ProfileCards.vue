<template>
  <v-row>
    <SnackBar :data="snackbar" ref="snackbar"></SnackBar>
    <v-col cols="12" xs="12" sm="12" md="6" lg="6">
      <v-card outlined class="profile-card">
        <div class="d-flex justify-center">
          <label>
            <v-avatar class="mt-10 mb-5" size="92">
              <v-img
                :src="$store.state.profileImage.img_path || require('@/assets/images/guest_profile_pic.png')"
                alt="asdasd"
              ></v-img>
            </v-avatar>
            <v-file-input type="file" name="image" accept="image/*" class="d-none" @change="profile_img"></v-file-input>
          </label>
        </div>
        <v-form>
          <v-col cols="12">
            <!-- <v-select filled rounded :label="translate('Role')"></v-select> -->
            <v-text-field
              filled
              rounded
              v-model="user.first_name"
              class="inp"
            >
            <template v-slot:label>
              <span :class="$vuetify.theme.dark ? 'label-dark' : 'label'">{{translate('First Name')}}</span>
            </template>
          </v-text-field>
            <v-text-field
              filled
              rounded
              v-model="user.last_name"
            >
            <template v-slot:label>
              <span :class="$vuetify.theme.dark ? 'label-dark' : 'label'">{{translate('Last Name')}}</span>
            </template>
          </v-text-field>

            <v-text-field
              filled
              rounded
              :label="translate('Email')"
              v-model="user.email"
            ></v-text-field>
            <v-text-field
                filled
                type="password"
                rounded
                v-model="user.password"
            >
            <template v-slot:label>
                <span :class="$vuetify.theme.dark ? 'label-dark' : 'label'">{{translate('Password')}}</span>
            </template>
          </v-text-field>
            <v-text-field filled rounded>
              <template v-slot:label>
              <span :class="$vuetify.theme.dark ? 'label-dark' : 'label'">{{translate('Phone Nr.')}}</span>
            </template>
            </v-text-field>
            <v-textarea filled rounded>
              <template v-slot:label>
              <span :class="$vuetify.theme.dark ? 'label-dark' : 'label'">{{translate('Short Bio')}}</span>
            </template>
            </v-textarea>
          </v-col>
        </v-form>
      </v-card>
    </v-col>

    <v-col cols="12" xs="12" sm="12" md="6" lg="6">
      <StatsCard />

      <v-row>
        <!-- <v-col
          cols="12"
          xs="12"
          sm="12"
          md="6"
          lg="6"
          class="d-flex justify-start mt-15"
        >
          <v-btn text color="primary">{{translate('Discard Changes')}}</v-btn>
        </v-col> -->
        <v-col
          cols="12"
          xs="12"
          sm="12"
          md="12"
          lg="12"
          class="d-flex justify-end mt-15"
        >
          <v-btn @click="updateUser" color="primary">{{translate('Update Profile')}}</v-btn>
        </v-col>
      </v-row>
      <v-row class="justify-end">
        <v-btn @click="exitApp" color="error" class="mr-3">{{ translate('Log out') }}</v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import * as LANGUAGE from '../../store/language.json';
import SnackBar from "../Snackbar/SnackBar.vue";
import StatsCard from "../Dashboard/StatsCard.vue";

export default {
  data() {
    return {
      user: [],
      default_values: {
        user: {}
      },
      image: null,
      stats: [
        {
          id: 1,
          title: this.translate("Points Earned"),
          counter: 12,
        },
        {
          id: 2,
          title: this.translate("Callbacks"),
          counter: 4,
        },
        {
          id: 3,
          title: this.translate("Pending Issues"),
          counter: 6,
        },  
        {
          id: 4,
          title: this.translate("Total Leads"),
          counter: 409,
        },
      ],

      menu: false,
      snackbar: {
        show: false,
        message: "",
        error: false
      },
    };
  },

  methods: {
    profile_img(img){
      this.image = img;
      this.profile_image_update(img);
    },
    profile_image_update(image = undefined){
      let new_image = this.image;

      if(image) {
        new_image = image;
      }

      return new Promise((resolve, reject) => {
        axios 
            .post("profile_img", { image: new_image }, { headers: {
              'Content-type': 'multipart/form-data'
            } })
            .then((response) => {
              if(image) {
                this.snackbar = {
                  message: "Data updated successfully",
                  error: false
                };

                this.$refs.snackbar.toggleSnackbar();
              }

              this.$store.dispatch('getImage');

              resolve(response.data.message);
            })
            .catch(err => {
              if(image) {
                const filteredErr = err.response.data.message.replace("2048 kilobytes", "2MB");

                this.snackbar = {
                  message: filteredErr,
                  error: true
                }

                this.$refs.snackbar.toggleSnackbar();
              }

              reject(err.response.data.message);
            });
      })
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

    exitApp() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/login");
    },

    async updateUser() {
      if(this.image) {
        let updated = true;

        try {
          await this.profile_image_update();

          this.$store.dispatch("getImage");
        } catch (err) {
              const filteredErr = err.replace("2048 kilobytes", "2MB");

              this.snackbar = {
                message: filteredErr,
                error: true
              }

              this.$refs.snackbar.toggleSnackbar();

              updated = false;
        }

        if(!updated) return;
      }

      // let userInfo = this.user;
      // if(val) {
      //   userInfo = val;
      // }

      // console.log("nah", this.user);

      axios
          .put("/user/update", this.user)
          .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            this.snackbar = {
              message: "Data updated successfully",
              error: false
            };

            this.$refs.snackbar.toggleSnackbar();
          })
          .catch((error) => {
            console.log(error);

            let err = error.response.data.message.replace("(and 2 more errors)", "")
                                                  .replace("(and 1 more error)", "")
                                                  .trim();

            this.snackbar = {
              message: err,
              error: true
            }

            this.$refs.snackbar.toggleSnackbar();
          });
    }
  },

  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      this.user = user;
    }
  },

  watch: {
    // user: {
    //   handler(newValue) {
    //     this.updateUser(newValue);
    //   },
    //   deep: true,
    // }
  },

  components: { SnackBar, StatsCard }
};
</script>

<style scoped>
.profile-card {
  padding: 20px;
  border-radius: 30px !important;
  border: none;
}

.profile-status {
  padding: 45px;
}

.profile-stats {
  border: solid 1px #36a5dd;
  border-radius: 8px;
}

.label {
  color: black;
  opacity: .4;
}

.label-dark {
  color: white;
  opacity: .5;
}

</style>