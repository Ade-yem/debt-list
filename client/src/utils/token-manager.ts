export const storeToken = (token: string) => {
  window.localStorage.setItem("auth_token", token)
}
export const getToken = (key: string) => {
  return window.localStorage.getItem(key)
}
export const deleteToken = (key: string) => {
  window.localStorage.removeItem(key)
}