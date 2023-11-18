import { reactive } from 'vue'
import { loginUser, registerUser, logoutUser } from './auth-api'

export const store = reactive({
  loggedIn: false,
  user: {},
  login: async (username:string, password: string) => {
    try {
      const data = await loginUser({username, password})
      return data
    } catch (err: any) {
        throw new Error(err.error);
    }    
  },
  signup: async (username:string, name: string, password: string) => {
    try {
      const data = await registerUser({username, name, password})
      return data
    } catch (err: any) {
      throw new Error(err.error);
    }    
  },
	logout: async () => logoutUser(),
})