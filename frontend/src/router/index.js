import Vue from "vue";
import VueRouter from "vue-router";
import { isEmpty } from "lodash";
import routes from "./routes";

Vue.use(VueRouter);

const authGuard = store => (to, from, next) => {
  const authData = store.getters["user/authData"];
  // next-line: check if route ("to" object) needs authenticated
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    isEmpty(authData)
  ) {
    next("/signin");
  } else if (!isEmpty(authData)) {
    switch (to.name) {
      case "Signin":
        next({ path: "/" });
        break;
      case "Home":
        next({ path: "/my-page" });
        break;
      default:
        next();
        break;
    }
  } else next();
};

export default function({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });
  Router.beforeEach(authGuard(store));

  return Router;
}
