import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

// import example from './module-example'
import user from "./user";
import admin from "./admin";
import loan from "./loan";

import axios from "axios";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  modules: ["user"]
});

function interceptWithAxios(store) {
  const instance = axios.create({
    baseURL: "http://localhost:8081/rest/"
  });
  instance.interceptors.request.use(config => {
    const token = store.getters["user/authData"]?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  Vue.axios = Vue.prototype.$axios = instance;
}
export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
      user,
      admin,
      loan
    },

    strict: process.env.DEBUGGING,
    plugins: [vuexLocal.plugin]
  });
  interceptWithAxios(Store);

  return Store;
}
