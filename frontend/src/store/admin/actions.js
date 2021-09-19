import Vue from "vue";
export async function getCustomerList({ commit }) {
  const { data } = await Vue.axios.get("/admin/customers");
  commit("fetchCustomerList", { data });
}
export async function addCustomer({ commit, dispatch }, form) {
  await Vue.axios.post("/admin/customers", form);
  await dispatch("getCustomerList");
}
export async function getLoans({ commit }) {
  const { data } = await Vue.axios.get("/admin/loans");
  commit("getLoans", { data });
}
export async function approveLoan({ dispatch }, loan) {
  await Vue.axios.put(`/admin/loan/${loan.id}/approve`);
  await dispatch("getLoans");
}

export async function rejectLoan({ dispatch }, loan) {
  await Vue.axios.put(`/admin/loan/${loan.id}/reject`);
  await dispatch("getLoans");
}
