import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/token/:id",
    name: "Token",
    component: () => import("../views/Token.vue")
  },
  {
    path: "/:catchAll(.*)*",
    name: "Not Found",
    component: () => import("../views/NotFound.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
