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
  const res = await axios.post("/user/register", user)
  if (res.status !== 201) {
    throw new Error(res.data);
  }
  const data = await res.data
  return data;
    
}