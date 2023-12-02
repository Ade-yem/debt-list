import { reactive } from 'vue'
import { loginUser, registerUser, logoutUser, forgotPassword } from './auth-api'


export const store = reactive({
  loggedIn: false,
  user: "username",
  login: async (username:string, password: string) => {
    if (password.length < 8) throw new Error("Password must be at least eight characters")
    try {
      const data = await loginUser({username, password})
      return data
    } catch (err: any) {
        throw new Error(err);
    }    
  },
  signup: async (username:string, name: string, password: string, confirm_password: string) => {
    if (password.length < 8) throw new Error("Password must be at least eight characters")
    if (password !== confirm_password) throw new Error("Passwords do not match")
    try {
      const data = await registerUser({username, name, password})
      return data
    } catch (err: any) {
      throw new Error(err);
    }    
  },
	logout: async () => logoutUser(),
  forgot: async (username:string, password: string) => {
    try {
      const data = await forgotPassword({username, password});
      console.log(data.message)
    } catch (err: any) {
      throw new Error(err);
    }    
  }
})