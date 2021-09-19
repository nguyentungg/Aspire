import Vue from "vue";

export async function login({ commit, dispatch }, loginFormData) {
  const { data: auth } = await Vue.axios.post("/auth/login", loginFormData);
  commit("login", { auth });
  const { data } = await Vue.axios.get("/auth/me");
  commit("me", { data });
}
