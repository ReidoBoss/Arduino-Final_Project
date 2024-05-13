import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [


    // {
    //   path: "/",
    //   name: "Arduino",
    //   component: () => import("../mainPages/Arduino.vue"),
    // },
    // {
    //   path: "/record",
    //   name: "record",
    //   component: () => import("../mainPages/Record.vue"),
    // },
    // {
    //   path: "/play",
    //   name: "play",
    //   component: () => import("../mainPages/PlayVideo.vue"),
    // },
    // {
    //   path: "/dashboard",
    //   name: "dashboard",
    //   component: () => import("../mainPages/Dashboard.vue"),
    // },
    {
      path: "/Server",
      name: "Server",
      component: () => import("../mainPages/Server.vue"),
    },
    {
      path: "/",
      name: "Welcome",
      component: () => import("../ui/Welcome.vue"),
    },
    {
      path: "/Dash",
      name: "Dash",
      component: () => import("../ui/Dashboard.vue"),
    },
    {
      path: "/History",
      name: "History",
      component: () => import("../ui/History.vue"),
    },
    {
      path: "/Video/:id",
      name: "Video",
      component: () => import("../ui/Video.vue"),
    },
    {
      path: "/Configure",
      name: "Configure",
      component: () => import("../ui/Configure.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../mainPages/Video.vue"),
    },

  ],
});

export default router;
