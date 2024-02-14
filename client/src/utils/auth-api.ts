import axios from "axios"
import { store } from "./store";
import { deleteToken, storeToken } from "./token-manager";

export const loginUser = async (user: Object) => {
  const res = await axios.post("/user/login", user)
  if (res.status !== 200) {
    if (res.status === 422) {
      throw new Error(res.data.errors[0].message);
    } else {
      throw new Error(res.data.error);
    }
  }
  const data = await res.data
  storeToken(data.token)
  return data;
    
}

export const registerUser = async (user: Object) => {
  // console.log(user)
  const res = await axios.post("/user/register", user)
  if (res.status !== 201) {
    if (res.status === 422) {
      throw new Error(res.data.errors[0].message);
    } else {
      throw new Error(res.data.error);
    }
  }
  const data = await res.data
  storeToken(data.token)
  return data;   
}

export const logoutUser = async () => {
  const res = await axios.post("/user/logout")
  if (res.status === 201) {
    deleteToken("auth_token")
    store.user = ''
  } else throw new Error(res.data.error);
}

export const checkUserAuth = async () => {
  const res = await axios.get("/user/status")
  if (res.status !== 200) {
    throw new Error(res.data.error);
  };
  const data = await res.data
  return data.username;
}

export const forgotPassword = async (user: Object) => {
  const res = await axios.post("/user/forgot", user)
  if (res.status !== 200) {
    if (res.status === 422) {
      throw new Error(res.data.errors[0].message);
    } else {
      throw new Error(res.data.error);
    }
  };
  const data = await res.data
  return data.message;
}