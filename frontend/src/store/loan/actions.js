import Vue from "vue";

export default {
  async getAll({ commit }) {
    const { data } = await Vue.axios.get("/loan/");
    commit("fetchData", { data });
  },
  async submit({ dispatch }, form) {
    await Vue.axios.post("/loan/submit", form);
    await dispatch("getAll");
  },
  async makePayment({ dispatch }, { id }) {
    await Vue.axios.post(`/loan/${id}/pay`);
    await dispatch("getAll");
  }
}
