/*
export function someMutation (state) {
}
*/
export function login(state, { auth }) {
  state.auth = auth;
}
export function me(state, { data }) {
  state.me = data;
}
export function logout(state) {
  state.auth = {};
  state.me = {};
}
