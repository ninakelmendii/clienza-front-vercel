<template>
  <div class="d-flex">
    <v-row>
      <v-col cols="12" md="8" class="d-flex justify-start">
        <NavbarControl />
        <h2 style="display: flex; align-items: center;">{{ title }}</h2>
      </v-col>
      <v-col cols="12" md="4"><UserControl /></v-col>
    </v-row>
  </div>
</template>

<script>
import NavbarControl from '@/components/Navbar/NavbarControl.vue';
import UserControl from '@/components/Navbar/UserControl.vue';

export default {
  name: "TelefonpartyView",
  data(){
    return {
      title: 'Telefonparty'
    }
  },
  components: {
    NavbarControl,
    UserControl
  }
};
</script>
