import Vue from "vue";
import VueRouter from "vue-router";
import DashboardView from "../views/DashboardView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "notfound" */ "../views/404.vue"),
    meta: {
      needsAuth: false,
      title: "Not Found | Clienza",
    },
  },
  {
    path: "*",
    redirect: "/404",
    meta: {
      needsAuth: false,
      title: "Not Found | Clienza",
    },
  },
  {
    path: "/",
    name: "home",
    component: DashboardView,
    meta: {
      needsAuth: true,
      title: "Dashboard | Clienza",
    },
  },
  {
    path: "/customers",
    name: "customers",
    meta: {
      needsAuth: true,
      title: "Customers | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "customers" */ "../views/CustomersView.vue"),
  },
  {
    path: "/contracts",
    name: "contracts",
    meta: {
      needsAuth: true,
      title: "Contracts | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "contracts" */ "../views/ContractsView.vue"),
  },
  {
    path: "/applications/:client_id",
    name: "applications",
    meta: {
      needsAuth: true,
      title: "Applications | Clienza",
    },
    component: () =>
      import(
        /* webpackChunkName: "contracts" */ "../views/ApplicationsView.vue"
      ),
  },
  {
    path: "/offers",
    name: "offers",
    meta: {
      needsAuth: true,
      title: "Offers | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "offers" */ "../views/OffersView.vue"),
  },
  {
    path: "/request",
    name: "request",
    meta: {
      needsAuth: true,
      title: "New Request | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "request" */ "../views/RequestView.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    meta: {
      needsAuth: true,
      title: "Calendar | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../views/CalendarView.vue"),
  },
  {
    path: "/leads",
    name: "leads",
    meta: {
      needsAuth: true,
      title: "Leads | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "leads" */ "../views/LeadsView.vue"),
  },
  {
    path: "/leadsdetails/:id",
    name: "leadsdetails",
    meta: {
      needsAuth: true,
      title: "Leads Details | Clienza",
    },
    component: () =>
      import(
        /* webpackChunkName: "leaddeatils" */ "../views/LeadDetailsView.vue"
      ),
  },
  {
    path: "/steps/:id/:protocol_id",
    name: 'steps',
    meta: {
      needsAuth: true,
      title: "Consulation Protocol | Clienza"
    },
    component: () => 
      import(
        /* webpackChunkName: "leaddeatils" */ "../views/StepsProtocol.vue"
      )
    
  },
  {
    path: "/feedback",
    name: "feedback",
    meta: {
      needsAuth: true,
      title: "Feedback | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "feedback" */ "../views/FeedbackView.vue"),
  },
  {
    path: "/feedback/:id",
    name: "feedbackDetails",
    meta: {
      needsAuth: true,
      title: "Feedback Details | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "Feedback Details" */ "../views/FeedbackDetails.vue"),
  },
  {
    path: "/tasks",
    name: "tasks",
    meta: {
      needsAuth: true,
      title: "Tasks | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "tasks" */ "../views/TasksView.vue"),
  },
  {
    path: "/dokumente",
    name: "dokumente",
    meta: {
      needsAuth: true,
      title: "Dokumente | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "dokumente" */ "../views/DokumenteView.vue"),
  },
  {
    path: "/billing",
    name: "billing",
    meta: {
      needsAuth: true,
      title: "Billing | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "billing" */ "../views/BillingView.vue"),
  },
  {
    path: "/help",
    name: "help",
    meta: {
      needsAuth: true,
      title: "Help | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "help" */ "../views/HelpView.vue"),
  },
  {
    path: "/phone",
    name: "phone",
    meta: {
      needsAuth: true,
      title: "Phone | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "phone" */ "../views/PhoneView.vue"),
  },
  {
    path: "/statistics",
    name: "statistics",
    meta: {
      needsAuth: true,
      title: "Statistics | Clienza",
    },
    component: () =>
      import(
        /* webpackChunkName: "statistics" */ "../views/StatisticsView.vue"
      ),
  },
  {
    path: "/agent-management",
    name: "agent-management",
    meta: {
      needsAuth: true,
      // needsAdmin: true,
      title: "Agent Management | Clienza",
    },
    component: () =>
      import(
        /* webpackChunkName: "user-management" */ "../views/UserManagementView.vue"
      ),
  },
  {
    path: "/waitinglist",
    name: "waitinglist",
    meta: {
      needsAuth: true,
      // needsAdmin: true,
      title: "Waiting List | Clienza",
    },
    component: () =>
      import(
        /* webpackChunkName: "user-management" */ "../views/WaitingListView.vue"
      ),
  },
  {
    path: "/mandate",
    name: "mandate",
    meta: {
      needsAuth: true,
      title: "Mandate | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "mandate" */ "../views/MandateView.vue"),
  },
  {
    path: "/telefonparty",
    name: "telefonparty",
    meta: {
      needsAuth: true,
      title: "Telefonparty | Clienza",
    },
    component: () =>
      import(
        /* webpackChunkName: "telefonparty" */ "../views/TelefonpartyView.vue"
      ),
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      needsAuth: true,
      title: "Profile | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/ProfileView.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      needsAuth: false,
      title: "Login | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      needsAuth: false,
      title: "Register | Clienza",
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
  },
  {
    path: "/resetpassword",
    name: "resetpassword",
    meta: {
      needsAuth: false,
      title: "Reset Password | Clienza",
    },
    component: () =>
      import(
        /* webpackChunkName: "ResetPassword" */ "../views/ResetPasswordView.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {

  const loggedIn = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role");

  if (to.matched.some((record) => record.meta.needsAuth)) {
    if (!loggedIn) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }

  if (to.matched.some((record) => record.meta.needsAdmin)) {
    if (isAdmin !== 'admin') {
      next("/dashboard");
    } else {
      next();
    }
  } else {
    next();
  }

});

router.beforeEach((toRoute, fromRoute, next) => {
  window.document.title =
    toRoute.meta && toRoute.meta.title ? toRoute.meta.title : "Home";

  next();
});

export default router;
