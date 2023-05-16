<template>
  <div>
    <v-list-item :class="$store.state.navBar.variant ? 'navbar-closed' : 'navbar-opened'" style="margin-top: 25px;">
      <v-list-item-content>
        <div class="d-flex justify-center align-center" v-if="$store.state.navBar.variant == true">
          <img v-if="!this.$helperPlugin.ifAdmin()" height="36" width="26" src="@/assets/images/logo.png"/>
          <img v-else height="36" width="26" src="@/assets/images/logo-white.png"/>
        </div>
        <div class="d-flex justify-space-between align-center" v-else>
          <img v-if="!this.$helperPlugin.ifAdmin()" style="width: 1px; max-width: 200px;" class="flex-grow-1" src="@/assets/images/clienza-logo.png" alt="clienza full logo with text" title="Clienza Logo"/>
          <img v-else style="width: 1px; max-width: 200px;" class="flex-grow-1" src="@/assets/images/clienza-logo-white.png" alt="clienza full logo with text" title="Clienza Logo"/>
        </div>
      </v-list-item-content>
    </v-list-item>

    <template v-if="this.$helperPlugin.ifAdmin()">
      <v-list>

        <v-list-item
            v-for="item in admin_menu"
            :key="item.title"
            :color="item.color"
            :to="item.to"
            link
            dark
            class=""
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ translate(item.title) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>

    <template v-else>
      <v-list>
        <v-list-item
            v-for="item in agent_menu"
            :key="item.title"
            :color="item.color"
            :to="item.to"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ translate(item.title) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>

  </div>
</template>

<script>
import * as LANGUAGE from '../../store/language.json';

export default {
  data() {
    return {
      agent_menu: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard-outline",
          color: "primary",
          to: "/",
        },
        {
          title: "Customers",
          icon: "mdi-account-outline",
          color: "primary",
          to: "/customers",
        },
        {
          title: "Contracts",
          icon: "mdi-file-document-outline",
          color: "primary",
          to: "/contracts",
        },
        {
          title: "Offers",
          icon: "mdi-list-box-outline",
          color: "primary",
          to: "/offers",
        },
        // {
        //   title: "Calendar",
        //   icon: "mdi-calendar-outline",
        //   color: "primary",
        //   to: "/calendar",
        // },
        {
          title: "Leads",
          icon: "mdi-bullhorn-outline",
          color: "primary",
          to: "/leads",
        },
        {
          title: "Feedback",
          icon: "mdi-comment-quote-outline",
          color: "primary",
          to: "/feedback",
        },
        {
          title: "Tasks",
          icon: "mdi-checkbox-marked-circle-plus-outline",
          color: "primary",
          to: "/tasks",
        },
        {
          title: "Statistics",
          icon: "mdi-chart-box-outline",
          color: "primary",
          to: "/statistics",
        },
        {
          title: "Help",
          icon: "mdi-comment-question-outline",
          color: "primary",
          to: "/help",
        },
        {
          title: "Phone",
          icon: "mdi-phone-outline",
          color: "primary",
          to: "/phone",
        },
        {
          title: "Calendar",
          icon: "mdi-calendar-outline",
          color: "primary",
          to: "/calendar",
        },
        {
          title: "Dokumente",
          icon: "mdi-folder-outline",
          color: "primary",
          to: "/dokumente",
        },
        {
          title: "Mandate",
          icon: "mdi-badge-account-outline",
          color: "primary",
          to: "/mandate",
        },
        {
          title: "Telefonparty",
          icon: "mdi-cellphone",
          color: "primary",
          to: "/telefonparty",
        },
      ],
      admin_menu: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard-outline",
          color: "primary",
          to: "/",
        },
        {
          title: "Customers",
          icon: "mdi-account-outline",
          color: "primary",
          to: "/customers",
        },
        {
          title: "Agent Management",
          icon: "mdi-account-multiple-outline",
          color: "primary",
          to: "/agent-management",
        },
        {
          title: "Waiting List",
          icon: "mdi-account-clock-outline",
          color: "primary",
          to: "/waitinglist",
        },
        {
          title: "Contracts",
          icon: "mdi-file-document-outline",
          color: "primary",
          to: "/contracts",
        },
        // {
        //   title: "Offers",
        //   icon: "mdi-list-box-outline",
        //   color: "primary",
        //   to: "/offers",
        // },
        // {
        //   title: "Calendar",
        //   icon: "mdi-calendar-outline",
        //   color: "primary",
        //   to: "/calendar",
        // },
        {
          title: "Leads",
          icon: "mdi-bullhorn-outline",
          color: "primary",
          to: "/leads",
        },
        {
          title: "Feedback",
          icon: "mdi-comment-quote-outline",
          color: "primary",
          to: "/feedback",
        },
        {
          title: "Task Management",
          icon: "mdi-checkbox-marked-circle-plus-outline",
          color: "primary",
          to: "/tasks",
        },
        {
          title: "Billing",
          icon: "mdi-receipt-text-check-outline",
          color: "primary",
          to: "/billing",
        },
        {
          title: "Statistics",
          icon: "mdi-chart-box-outline",
          color: "primary",
          to: "/statistics",
        },
        {
          title: "Help",
          icon: "mdi-comment-question-outline",
          color: "primary",
          to: "/help",
        },
        {
          title: "Phone",
          icon: "mdi-phone-outline",
          color: "primary",
          to: "/phone",
        },
        {
          title: "Calendar",
          icon: "mdi-calendar-outline",
          color: "primary",
          to: "/calendar",
        },
        {
          title: "Dokumente",
          icon: "mdi-folder-outline",
          color: "primary",
          to: "/dokumente",
        },
        {
          title: "Mandate",
          icon: "mdi-badge-account-outline",
          color: "primary",
          to: "/mandate",
        },
        {
          title: "Telefonparty",
          icon: "mdi-cellphone",
          color: "primary",
          to: "/telefonparty",
        },
      ],
      right: null,
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
  }
};
</script>

<style>
  .v-list-item {
    align-items: center;
    justify-content: center;
  }

  .navbar-closed {
    padding: 0;
  }

  .v-navigation-drawer__content .v-list-item__content:nth-child(1) {
    padding-top: 0px;
  }

  .navbar-closed > *:first-child {
    justify-content: center;
  }
</style>