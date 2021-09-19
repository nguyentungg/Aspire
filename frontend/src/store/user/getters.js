/*
export function someGetter (state) {
}
*/
export function authData(state) {
  return state.auth;
}
export function isAdmin(state) {
  return state.me.type === "User";
}
