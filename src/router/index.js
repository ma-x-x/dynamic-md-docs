import Vue from "vue";
import VueRouter from "vue-router";
import DocView from "@/views/doc.vue";
import MainView from "@/views/main.vue";

const routes = [
  { path: "/", redirect: "/view" },
  { path: "/view/:naviId?/:docId?", component: DocView },
  { path: "/edit/:naviId?/:docId?", component: MainView },
];

Vue.use(VueRouter);

export default new VueRouter({
  routes,
});
