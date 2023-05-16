<template>
  <v-app id="inspire">
    <transition name="fade" mode="in-out">
      <Preloader v-show="loading" />
    </transition>
    <NavBar class="navbar" />
  </v-app>
</template>

<script>
import NavBar from "./components/Navbar/NavBar.vue";
import Preloader from "./components/Preloader.vue";
export default {
  name: "App",
  data() {
    return {
      drawer: true,
      loading: true,
    };
  },
  mounted(){
    this.$store.dispatch('getImage');
  },
  components: { NavBar, Preloader },

  created() {
    setTimeout(() => (this.loading = false), 3000);
  },
};
</script>

<style>
.btn {
      padding: 10px 18px !important;
      min-width: 84px !important;
      min-height: 44px !important;
      border-radius: 8px;
  }

  .btn-cancel {
      border: 1px solid #D0D5DD;
      background: white;
  }

  .btn-dark {
    background: #121212 !important;
  }

  .btn-ok {
      background: #36A5DD;
      color: white;
      margin-left: 12px;
  }

  .btn-decline {
    background-color: #D92D20;
    color: white;
    margin-left: 12px;
  }
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #cfd4d8 #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: #ecf1f6;
}

*::-webkit-scrollbar-thumb {
  background-color: #cfd4d8;
  border-radius: 7px;
  border: 3px solid #ecf1f6;
}

.svg-icon {
  cursor: pointer !important;
}

.v-tab {
  font-weight: 600;
  font-family: "PT Sans", sans-serif;
}

.click {
  cursor: pointer !important;
}

.v-dialog .v-card.v-sheet.theme--light {
  background: linear-gradient(
      270deg,
      rgba(54, 165, 221, 0.066) -1.58%,
      rgba(54, 165, 221, 0.066) -1.57%,
      rgba(162, 213, 239, 0.052) 52.92%,
      rgba(255, 255, 255, 0.2) 100%
    ),
    #ffffff;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
}

.v-dialog .v-card.v-sheet.theme--dark {
  border-radius: 13px;
}

.v-image__image.v-image__image--cover {
  background-size: contain;
  object-fit: cover;
}

.v-snack__wrapper.v-sheet.theme--dark.success {
  width: 547px;
  height: 120px;
  background: linear-gradient(
      270deg,
      rgba(54, 165, 221, 0.066) -1.58%,
      rgba(54, 165, 221, 0.066) -1.57%,
      rgba(162, 213, 239, 0.052) 52.92%,
      rgba(255, 255, 255, 0.2) 100%
    ),
    #ffffff !important;

  box-shadow: 0px 10px 15px 10px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  margin-bottom: 20px;
}

.v-snack__content{
  color: #000 !important;
  font-weight: 600 !important;
  font-size: 20px !important;
  text-align: center !important;
}

.v-btn{
  text-transform: capitalize;
  font-family: "PT Sans", sans-serif;
  letter-spacing: .5px
}
</style>
