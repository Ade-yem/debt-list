import axios from "axios"

export const loginUser = async (user: Object) => {
  const res = await axios.post("/user/login", user)
  if (res.status !== 200) {
    throw new Error(res.data);
  }
  const data = await res.data
  return data;
    
}

export const registerUser = async (user: Object) => {
  // console.log(user)
  const res = await axios.post("/user/register", user)
  if (res.status !== 201) {
    throw new Error(res.data);
  }
  const data = await res.data
  return data;
    
}

export const logoutUser = async () => {
  const res = await axios.post("/user/logout")
  if (res.status !== 201) {
    throw new Error(res.data);
  };
  const data = await res.data
  return data.message;
}
export const checkUserAuth = async () => {
  const res = await axios.get("/user/status")
  if (res.status !== 200) {
    throw new Error(res.data);
  };
  const data = await res.data
  console.log(data.message)
  return data.username;
}