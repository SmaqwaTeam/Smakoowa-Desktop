import axios from 'axios'
import authService from './auth-service.jsx'

const apiUrl = 'https://localhost:7188'

class recipeService {
  async getRecipeCard() {
    return await axios
      .get(apiUrl + '/api/Recipes/GetAll', {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + authService.getToken()
        }
      })
      .then((response) => {
        return response.data
      })
  }
}

export default new recipeService()
