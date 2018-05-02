import axios from 'axios';
import jwtDecode from 'jwt-decode';

class AuthClient {
  constructor(){
    this.request = axios.create({
      baseURL: 'http://localhost:3001/api/users',
      headers: {
        common: {
          token: this.getToken()
        }
      }
    })
  }

  signUp(userInfo) {
    console.log("sign");
    return this.request({method: 'POST', url: '/signup', data: userInfo})
      .then((response) => response.data.success)
  }

  signIn(credentials) {
    return this.request({method: 'POST', url: '/authenticate', data: credentials})
      .then(response => {
        if(response.data.success) {
          const token = response.data.token
          this.setToken(token)
          return jwtDecode(token)
        } else {
          return false
        }
      })
  }

  editProfile(userInfo){
    return this.request({method: "PATCH", url: `/users/${this.getCurrentUser()._id}`, data: userInfo})
      .then(response => {
        if(response.data.success) {
          const token = response.data.token
          localStorage.setItem('token', token)
          this.request.defaults.headers.common.token = token
          return jwtDecode(token)
        } else {
          return false
        }
      })
  }

  getCurrentUser() {
    const token = this.getToken()
    return token ? jwtDecode(token) : null
  }

  getToken() {
    return localStorage.getItem('token')
  }

  setToken(token) {
    localStorage.setItem('token', token)
    this.request.defaults.headers.common.token = token
    return token
  }

  clearToken() {
    localStorage.removeItem('token')
    delete this.request.defaults.headers.common.token
  }

}



export default new AuthClient()
