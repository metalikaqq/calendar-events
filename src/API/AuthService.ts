import $api from "../http";
import { IUser } from "../models/IUser";

class AuthService {
  static async getUsers() {
    const response = await $api.get(`/users`)
    return response
  }

  static async registration(user: IUser) {
    const response = await $api.post(`/users/registration`, user)

    return response
  }

  static async login(user: IUser) {
    const response = await $api.post(`/users/login`, user)

    return response
  }
}

export default AuthService;