<template>
  <v-col cols="12" md="12" lg="12">
    <div class="second-sidebar-header" style="padding: 0">
      <v-icon v-show="isMobile" @click="$store.dispatch('toggleSecondVariant')">mdi-arrow-collapse-right</v-icon>
      <div>
      <button class="border-blue" @click="$store.dispatch('toggleLanguage')" style=" overflow: hidden; cursor: pointer; ">
        <div v-if="$store.state.language == 'german'" class="center">
          <img src="@/assets/images/flags/swiss.webp" alt="german language" style="width: 24px; height: 24px; object-fit: cover; border-radius: 999px;" />
          CH
        </div>
        <div v-else class="center">
          <img src="@/assets/images/flags/uk.png" alt="german language" style="width: 24px; height: 24px; border-radius: 999px; object-fit: cover; border-radius: 999px;" />
          EN
        </div>
      </button>
  <!-- <div class="mode" :class="{active: $vuetify.theme.dark}" @click="$vuetify.theme.dark = !$vuetify.theme.dark" :title="translate('Switch light/dark mode')"></div> -->
  <!-- <v-badge color="error" overlap :content="total_notifications">
    <v-menu
      bottom
      offset-y
      origin="center center"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon color="black" v-bind="attrs" v-on="on">mdi-bell</v-icon>
      </template>
      <v-card class="mx-auto" max-width="300" tile>
        <v-list shaped>
          <v-subheader>{{ translate('NOTIFICATIONS') }}</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-menu>
  </v-badge> -->
  <v-menu offset-y left bottom transition="slide-x-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-avatar size="35" v-on="on" v-bind="attrs">
        <img class="pa-1" :src="$store.state.profileImage.img_path" v-if="$store.state.profileImage.img_path" style="object-fit: contain;"/>
        <v-img src="@/assets/images/guest_profile_pic.png" v-else></v-img>
      </v-avatar>
    </template>
    <v-list class="p-0">
      <v-list-item class="p-0">
        <v-btn @click="goToProfile" style="background: transparent">
          {{translate('Profile')}}
        </v-btn>
      </v-list-item>
      <v-list-item class="p-0">
        <v-btn @click="exitApp" style="background: transparent">{{ translate('Log out') }}</v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
  </div>
  </div>
</v-col>
</template>

<script>
  import * as LANGUAGE from '../../store/language.json';

    export default {
        name: 'UserControl',
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
          goToProfile() {
            this.$router.push('/profile')
          },
          exitApp() {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$router.push("/login");
          },
        }
    }
</script>