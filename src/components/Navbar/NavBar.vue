<template>
  <v-app id="inspire">
    <div 
      v-if="
        !$route.path.includes('login') &&
        !$route.path.includes('register') &&
        !$route.path.includes('404') &&
        !$route.path.includes('resetpassword')
      "
    >
      <div v-if="isAdmin">
        <v-navigation-drawer :mini-variant-width="!isMobile ? '112' : '60'" stateless permanent :width="isMobile ? '80%' : '256'" :sticky="isMobile" :mini-variant="$store.state.navBar.variant" app class="navigation-admin" :class="{'main-nav-opened': !$store.state.navBar.variant && isMobile}">
          <NavBarItems />
        </v-navigation-drawer>
      </div>
      <div v-else>
        <v-navigation-drawer :mini-variant-width="!isMobile ? '112' : '60'" stateless permanent :width="isMobile ? '80%' : '256'" :sticky="isMobile" :mini-variant="$store.state.navBar.variant" app class="navigation-agent" :class="{'main-nav-opened': !$store.state.navBar.variant && isMobile}">        
          <NavBarItems />  
        </v-navigation-drawer>
      </div>

      <div v-if="isMobile && !$store.state.navBar.variant" @click="$store.dispatch('toggleVariant')" style="position: absolute; width: 20%; right: 0; z-index: 9999; height: 100%;">
          <v-icon style="font-size: 52px; position: absolute; right: 25px; top: 25px; z-index: 9998; cursor: pointer;">mdi-close</v-icon>
      </div>
    </div>

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>
    
    <!-- Second sidebar -->
    <div class="second-sidebar" v-if="$router.currentRoute.name == 'home'" :class="{ 'bg-anti-flash': !$vuetify.theme.dark }">
      <v-navigation-drawer v-if="!isMobile" stateless class="w-desktop" width="390" permanent static app right :mini-variant="false">
        <div class="second-sidebar-header" style="padding: 37px 40px; padding-bottom: 15px;">
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
            
          <!-- <div class="mode" :class="{active: $vuetify.theme.dark}" @click="$vuetify.theme.dark = !$vuetify.theme.dark" :title="translate('Switch light/dark mode')">
            
          </div> -->
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
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar size="35" v-on="on" v-bind="attrs"
                ><img class="pa-1" :src="$store.state.profileImage.img_path" v-if="$store.state.profileImage.img_path" style="object-fit: contain;"/>
        <v-img src="@/assets/images/guest_profile_pic.png" v-else></v-img></v-avatar>
            </template>
            <v-list class="p-0">
              <v-list-item class="p-0">
                <v-btn @click="goToProfile" style="background: transparent">
                  {{ translate('Profile') }}
                </v-btn>
              </v-list-item>
              <v-list-item class="p-0">
                <v-btn @click="exitApp" style="background: transparent">{{ translate('Log out') }}</v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
          
          </div>
        </div>
        <div style="padding: 40px 32px; padding-top: 0;">
          <CalendarWidget />
        </div>
      </v-navigation-drawer>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import NavBarItems from "./NavBarItems.vue";
import CalendarWidget from "../Dashboard/CalendarWidget.vue";
import * as LANGUAGE from '../../store/language.json';

export default {
  data() {
    return {
      user: [],
      variant: false,
      items: [],
      total_notifications: '',
      isAdmin: false,
      isMobile: window.innerWidth < 900
    };
  },
  components: { NavBarItems, CalendarWidget },
  computed: {
    showCalendarWidget() {
      return !this.isMobile ? this.$store.state.navBar.variant : this.$store.state.navBar.variant;
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
    goToProfile() {
      this.$router.push("/profile");
    },

    exitApp() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/login");
    },

    changeVariant() {
      this.variant = !this.variant;
      this.drawer = !this.drawer;
    },

    getNotifications() {
      axios
        .get("/notifications")
        .then((response) => {
          this.items = response.data.data;
          this.total_notifications = response.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    checkIsMobile() {
      window.innerWidth < 900
      ? this.isMobile = true
      : this.isMobile = false;
    }
  },

  mounted() {
    this.user = JSON.parse(this.$store.state.user);
    this.getNotifications();
    if (this.$helperPlugin.ifAdmin()) {
      this.isAdmin = true;
    }

    console.log(this.$router.currentRoute)
  },

  created: function() {
    window.addEventListener('resize', this.checkIsMobile);
  },

  destroyed: function() {
    window.removeEventListener('resize', this.checkIsMobile);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=PT+Sans&display=swap");

.theme--light.v-navigation-drawer,
.theme--dark.v-navigation-drawer {
  border: none;
  font-family: "PT Sans", sans-serif;
  font-weight: bolder;
}

.theme--light .navigation-agent {
  background: #ecf1f6;
}

.theme--light .navigation-admin {
  background: #1a1f3a;
}


.theme--dark .navigation {
  background: #272727;
}

nav.main-nav-opened:first-child {
  box-shadow: 5px 10px 18px #888888;
}

.v-navigation-drawer:not(.v-navigation-drawer--floating)
  .v-navigation-drawer__border {
  background-color: unset !important;
}

.v-avatar {
  cursor: pointer;
}

.fade-enter {
  opacity: 0;
  transform: translateX(2em);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

header.v-sheet.theme--light.v-toolbar.v-app-bar.v-app-bar--fixed {
  box-shadow: none !important;
  background: #ecf1f6 !important;
  border-bottom: none !important;
}

header.v-sheet.theme--dark.v-toolbar.v-app-bar.v-app-bar--fixed {
  box-shadow: none !important;
  border-bottom: none !important;
}

.theme--light.v-navigation-drawer,
.theme--dark.v-navigation-drawer {
  font-weight: normal !important;
}

.second-sidebar > nav {
  transition: all;
}

.bg-anti-flash > nav {
  background-color: #ecf1f6 !important;
}

.second-sidebar-header, .second-sidebar-header > div:nth-child(2) {
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  align-items: center;
  gap: 24px;
}

.second-sidebar .v-input--switch {
  margin: 0 !important;
}

.v-input__control .v-messages {
  display: none;
}

.v-input__control .v-input__slot {
  margin: 0;
}

.v-input__control .v-input--selection-controls__input {
  margin: 0;
}

.second-sidebar-header {
  padding: 12px;
}

.w-mobile {
  width: 80% !important;
}

.w-desktop {
  width: 350px;
}

.p-0 {
  padding: 0 !important;
}

.mode {
  position: relative;
  margin: auto;
  width: 50px;
  height: 30px;
  background: #e5eff5;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid #36a5dd;
}

.border-blue {
  border: 1px solid #36a5dd;
  border-radius: 20px;
}

.mode:after {
  content: '☀️';
  position: absolute;
  top: 0;
  left: 4px;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  transition: all .3s ease;
}

.mode.active {
  background: #1e1e1e;
}

.mode.active:after {
  content: '🌛';
  transform: translateX(20px);
}

.center {
  display: flex; 
  justify-content: center; 
  align-items: center;
  padding: 5px;
  gap: 5px;
}

</style>