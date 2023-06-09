import axios from 'axios'

const apiUrl = 'https://smakoowaapi.azurewebsites.net'

class authService {
  async login(username, password) {
    var data = JSON.stringify({
      username: username,
      password: password
    })

    return await axios
      .post(apiUrl + '/api/Account/Login', data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.data.successStatus === true) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  async register(username, password, email) {
    return await axios.post(apiUrl + '/api/Account/Register', {
      username,
      password,
      email
    })
  }

  getCurrentUser() {
    while (localStorage.getItem('user') == null);
    return JSON.parse(localStorage.getItem('user'))
  }

  loggedIn() {
    if (localStorage.getItem('user') === null) {
      return false
    }
    return true
  }

  getToken() {
    const user = this.getCurrentUser()
    return user.content.token
  }
}

export default new authService()
